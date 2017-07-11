const express = require('express')
const request = require('request')
const fs      = require('fs')
const jsdom   = require('jsdom')
const {JSDOM} = jsdom
const router  = express.Router()

function parse_schedule_html(html) {
    const dom = new JSDOM(html)
    const days = [[], [], [], [], [], [], [], [], [], [], [], []]
    const rows = Array.from(dom.window.document.body.getElementsByTagName('tr')).slice(2)
    for (let i = 0; i < rows.length; ++i) {
        const cols = Array.from(rows[i].getElementsByTagName('td'))
        if (i % 7 === 0) {
            days[(i / 7) >> 0].push(cols[2].textContent)
        } else {
            days[(i / 7) >> 0].push(cols[1].textContent)
        }
    }
    return {'weeks': [days.slice(0, 6), days.slice(6)]}
}

function parse_groups_html(html) {
    const URL_PATTERN = new RegExp('https://www.vyatsu.ru/reports/schedule/Group/([0-9]+)_[12].html')
    const dom = new JSDOM(html)

    let groups_ids = {}

    const tags = dom.window.document.body.getElementsByTagName('a')

    for (let i = 0; i < tags.length; ++i) {
        if (tags[i].getAttribute('href').search(URL_PATTERN) !== -1) {
            const content = tags[i].textContent
            const group_name = content.slice(0, content.indexOf('(')).trim()
            groups_ids[group_name] = URL_PATTERN.exec(tags[i].getAttribute('href'))[1]
        }
    }

    return groups_ids
}

router.get('/', (route_req, route_res) => {
    route_res.redirect('https://bitbucket.org/AliRzaev/vyatsu_schedule_server_rest_api')
})

router.get('/calls', (route_req, route_res) => {
    console.log('/vyatsu/calls')

    fs.readFile('resources/calls.json', {'encoding': 'utf-8'}, (error, data) => route_res.type('json').send(data))
})

router.get('/groups.json', (route_req, route_res) => {
    console.log('/vyatsu/groups.json')

    fs.readFile('resources/groups.json', {'encoding': 'utf-8'}, (error, data) => route_res.type('json').send(data))
})

router.get('/groups.xml', (route_req, route_res) => {
    console.log('/vyatsu/groups.xml')

    fs.readFile('resources/groups.xml', {'encoding': 'utf-8'}, (error, data) => route_res.type('xml').send(data))
})

router.get('/groups/by_faculty.json', (route_req, route_res) => {
    {
        console.log('/groups/by_faculty.json')

        fs.readFile('resources/faculties.json', {'encoding': 'utf-8'}, (error, data) => route_res.type('json').send(data))
    }
})

router.get('/schedule/:group_id/:season', (route_req, route_res) => {
    console.log(`/vyatsu/schedule/${route_req.params.group_id}/${route_req.params.season}`)

    if (['autumn', 'spring'].indexOf(route_req.params.season) === -1) {
        route_res.status(422).json({error: "Invalid param 'season'"})
        return
    } else if (!route_req.params.group_id) {
        route_res.status(422).json({error: 'Invalid group id'})
        return
    }

    const season = (route_req.params.season === 'autumn' ? 1 : 2)
    const id = route_req.params.group_id
    const url = `https://www.vyatsu.ru/reports/schedule/Group/${id}_${season}.html`

    request.get(url, (req_err, req_res, req_body) => {
        if (req_err) {
            route_res.status(503).json({error: `Service unavailable: ${req_err.message}`})
            return
        }
        if (req_res.statusCode !== 200) {
            route_res.status(424).json({error: `vyatsu.ru error: ${req_res.statusCode}`})
            return
        }
        try {
            route_res.json(parse_schedule_html(req_body))
        } catch (e) {
            route_res.status(500).json({error: 'Error while parsing html file'})
        }
    })
})

router.post('/parse_schedule', (route_req, route_res) => {
    console.log('/vyatsu/parse_schedule')

    try {
        route_res.json(parse_schedule_html(route_req.body.html_schedule))
    } catch (e) {
        route_res.status(500).json({error: 'Error while parsing html file'})
    }
})

module.exports = router

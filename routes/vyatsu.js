const express = require('express')
const request = require('request')
const fs = require('fs')
const jsdom = require('jsdom')
const { JSDOM } = jsdom
const router = express.Router()

function parse_schedule_html(html) {
	const dom = new JSDOM(html)
	const days = []
	for (let i = 0; i < 12; ++i) {
		days.push([])
	}
	const rows = Array.from(dom.window.document.body.getElementsByTagName('tr')).slice(2)
	for (let i = 0; i < rows.length; ++i) {
		const cols = Array.from(rows[i].getElementsByTagName('td'))
		if (i % 7 == 0) {
			days[(i / 7) >> 0].push(cols[2].textContent)
		} else {
			days[(i / 7) >> 0].push(cols[1].textContent)
		}
	}
	return { 'weeks': [days.slice(0, 6), days.slice(6)] }
}

function parse_groups_html(html) {
	const URL_PATTERN = new RegExp('https://www.vyatsu.ru/reports/schedule/Group/([0-9]+)_[12].html')
	const dom = new JSDOM(html)

	let groups_ids = {}

	const tags = dom.window.document.body.getElementsByTagName('a')

	for (let i = 0; i < tags.length; ++i) {
		if (tags[i].getAttribute('href').search(URL_PATTERN) != -1) {
			const content = tags[i].textContent
			const group_name = content.slice(0, content.indexOf('(')).trim()
			const group_id = URL_PATTERN.exec(tags[i].getAttribute('href'))[1]
			groups_ids[group_name] = group_id
		}
	}

	return groups_ids
}

router.get('/', (req, res) => {
	res.redirect('https://bitbucket.org/AliRzaev/vyatsu_schedule_server_rest_api')
})

router.get('/bells', (req, res) => {
	console.log('/vyatsu/bells')

	fs.readFile('resources/bells.json', { 'encoding': 'utf-8' }, (error, data) => res.type('json').send(data))
})

router.get('/groups.json', (req, res) => {
	console.log('/vyatsu/groups.json')

	fs.readFile('resources/groups.json', { 'encoding': 'utf-8' }, (error, data) => res.type('json').send(data))
})

router.get('/groups.xml', (req, res) => {
	console.log('/vyatsu/groups.xml')

	fs.readFile('resources/groups.xml', { 'encoding': 'utf-8' }, (error, data) => res.type('xml').send(data))
})

router.get('/schedule/:group_id/:season', (req, res) => {
	console.log(`/vyatsu/schedule/${req.params.group_id}/${req.params.season}`)

	if (['autumn', 'spring'].indexOf(req.params.season) == -1) {
		res.status(422).json({ error: "Invalid param 'season'" })
		return
	} else if (!req.params.group_id) {
		res.status(422).json({ error: 'Invalid group id' })
		return
	}

	const season = (req.params.season == 'autumn' ? 1 : 2)
	const id = req.params.group_id
	const url = `https://www.vyatsu.ru/reports/schedule/Group/${id}_${season}.html`

	request.get(url, (error, response, body) => {
		if (error) {
			res.status(503).json({ error: `Service unavailable: ${error.message}` })
			return
		}
		if (response.statusCode != 200) {
			res.status(424).json({ error: `vyatsu.ru error: ${response.statusCode}` })
			return
		}
		try {
			res.json(parse_schedule_html(body))
		} catch (e) {
			res.status(500).json({ error: 'Error while parsing html file' })
		}
	})
})

router.post('/parse_schedule', (req, res) => {
	console.log('/vyatsu/parse_schedule')
	try {
		res.json(parse_schedule_html(req.body.html_schedule))
	} catch (e) {
		res.status(500).json({ error: 'Error while parsing html file' })
	}
})

module.exports = router

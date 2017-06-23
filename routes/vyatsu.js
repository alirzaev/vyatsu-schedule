const express = require('express')
const request = require('request')
const fs = require('fs')
const jsdom = require('jsdom')
const { JSDOM } = jsdom
const router = express.Router()

const INFO = {
	bells: JSON.parse(fs.readFileSync('files/bells.json', { 'encoding': 'utf-8' }))
}

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
	res.send(fs.readFileSync('files/index.html', { 'encoding': 'utf-8' }))
})

router.get('/bells', (req, res) => {
	console.log('/vyatsu/bells')

	res.json(INFO.bells)
})

router.get('/groups.json', (req, res) => {
	console.log('/vyatsu/groups.json')

	request.get('https://www.vyatsu.ru/studentu-1/spravochnaya-informatsiya/raspisanie-zanyatiy-dlya-studentov.html', (error, response, body) => {
		if (error) {
			res.status(503).json({ error: `Service unavailable: ${error.message}` })
			return
		}
		if (res.statusCode != 200) {
			res.status(424).json({ error: `vyatsu.ru error: ${res.statusCode}` })
		} else {
			res.json(parse_groups_html(body))
		}
	})
})

router.get('/groups.xml', (req, res) => {
	console.log('/vyatsu/groups.xml')

	fs.readFile('files/groups.xml', { 'encoding': 'utf-8' }, (error, data) => res.type('xml').send(data))
})

router.get('/schedule', (req, res) => {
	console.log('/vyatsu/schedule')

	if (['autumn', 'spring'].indexOf(req.query.season) == -1) {
		res.status(422).json({ error: "Invalid param 'season'" })
		return
	} else if (!req.query.group_id) {
		res.status(422).json({ error: 'Invalid group id' })
		return
	}

	const season = (req.query.season == 'autumn' ? 1 : 2)
	const id = req.query.group_id
	const url = `https://www.vyatsu.ru/reports/schedule/Group/${id}_${season}.html`

	request.get(url, (error, response, body) => {
		if (error) {
			res.status(503).json({ error: `Service unavailable ${error.message}` })
			return
		}
		if (res.statusCode != 200) {
			res.status(424).json({ error: `vyatsu.ru error: ${res.statusCode}` })
		} else {
			res.json(parse_schedule_html(body))
		}
	})
})

router.post('/parse_schedule', (req, res) => {
	console.log('/vyatsu/parse_schedule')
	
	res.json(parse_schedule_html(req.body.html_schedule))
})

module.exports = router

const express = require('express')
const request = require('request')
const fs = require('fs')
const jsdom = require('jsdom')
const { JSDOM } = jsdom
const router = express.Router()

const groups_schedule_links = JSON.parse(fs.readFileSync('files/groups.json', { 'encoding': 'utf-8' }))

function parse_html(html) {
	const dom = new JSDOM(html)
	const days = []
	for (var i = 0; i < 12; ++i) {
		days.push([])
	}
	const rows = Array.from(dom.window.document.body.getElementsByTagName('tr')).slice(2)
	for (var i = 0; i < rows.length; ++i) {
		const cols = Array.from(rows[i].getElementsByTagName('td'))
		if (i % 7 == 0) {
			days[(i / 7) >> 0].push(cols[2].textContent)
		} else {
			days[(i / 7) >> 0].push(cols[1].textContent)
		}
	}
	return { 'weeks': [days.slice(0, 6), days.slice(6)] }
}

router.get('/', (req, res) => {
  res.send('VyatSU schedule app')
})

router.get('/bells', (req, res) => {
	console.log('/bells')

	res.set('Content-Type', 'application/json')
	res.send(fs.readFileSync('files/bells.json', { 'encoding': 'utf-8' }))
})

router.get('/groups.json', (req, res) => {
	console.log('/groups.json')

    res.set('Content-Type', 'application/json')
    res.send(fs.readFileSync('files/groups.json', {'encoding': 'utf-8'}))
})

router.get('/groups.xml', (req, res) => {
	console.log('/groups.xml')

    res.set('Content-Type', 'application/xml')
    res.send(fs.readFileSync('files/groups.xml', {'encoding': 'utf-8'}))
})

router.get('/schedule.json', (req, res) => {
	console.log('/schedule.json')

	const group = req.query.group_name
	const url = groups_schedule_links[group]

	request.get(url, (error, response, body) => {
		const schedule = parse_html(body)
		res.set('Content-Type', 'application/json')
		res.send(JSON.stringify(schedule))
	})
})

router.post('/schedule.json', (req, res) => {
	console.log('/schedule.json')

	const schedule = parse_html(req.body.html_schedule)
	res.set('Content-Type', 'application/json')
	res.send(JSON.stringify(schedule))
})

router.get('/test', (req, res) => {
    request.get('https://www.vyatsu.ru/reports/schedule/Group/5741_2.html', (error, response, body) => {
        res.send(body)
    })
})

module.exports = router

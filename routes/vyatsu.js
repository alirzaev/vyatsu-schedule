const express = require('express')
const request = require('request')
const fs = require('fs')
const jsdom = require('jsdom')
const { JSDOM } = jsdom
const router = express.Router()

const groups_ids = JSON.parse(fs.readFileSync('files/groups.json', { 'encoding': 'utf-8' }))

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
	console.log('/vyatsu/bells')

	res.set('Content-Type', 'application/json')
	res.send(fs.readFileSync('files/bells.json', { 'encoding': 'utf-8' }))
})

router.get('/groups.json', (req, res) => {
	console.log('/vyatsu/groups.json')

    res.set('Content-Type', 'application/json')
    res.send(fs.readFileSync('files/groups.json', {'encoding': 'utf-8'}))
})

router.get('/groups.xml', (req, res) => {
	console.log('/vyatsu/groups.xml')

    res.set('Content-Type', 'application/xml')
    res.send(fs.readFileSync('files/groups.xml', {'encoding': 'utf-8'}))
})

router.get('/schedule', (req, res) => {
	console.log('/vyatsu/schedule')

	var season
	if (req.query.season == 'autumn') {
		season = 1
	} else {
		season = 2
	}
	const id = groups_ids[req.query.group_name]
	const url = `https://www.vyatsu.ru/reports/schedule/Group/${id}_${season}.html`

	request.get(url, (error, response, body) => {
		const schedule = parse_html(body)
		res.set('Content-Type', 'application/json')
		res.send(JSON.stringify(schedule))
	})
})

router.post('/parse_schedule', (req, res) => {
	console.log('/vyatsu/parse_schedule')

	const schedule = parse_html(req.body.html_schedule)
	res.set('Content-Type', 'application/json')
	res.send(JSON.stringify(schedule))
})

module.exports = router

const express = require('express')
const request = require('request')
const fs = require('fs')
const router = express.Router()

const groups_schedule_links = JSON.parse(fs.readFileSync('files/groups.json', {'encoding': 'utf-8'}))

router.get('/', function (req, res) {
  res.send('VyatSU schedule app')
})

router.get('/groups.json', function(req, res) {
    res.set('Content-Type', 'application/json')
    res.send(fs.readFileSync('files/groups.json', {'encoding': 'utf-8'}))
})

router.get('/groups.xml', function(req, res) {
    res.set('Content-Type', 'application/xml')
    res.send(fs.readFileSync('files/groups.xml', {'encoding': 'utf-8'}))
})

router.post('/schedule.json', function(req, res) {
    html_schedule = req.body.html_schedule
    options = {
        'url': 'http://rzaevali.pythonanywhere.com/vyatsu/schedule.json',
        'method': 'POST',
        'form': { 'html_schedule': html_schedule}
    }
    request.post(options, (error, response, body) => {
        res.send(body)
    })
})

router.get('/test', function(req, res) {
    request.get('https://www.vyatsu.ru/reports/schedule/Group/5741_2.html', (error, response, body) => {
        res.send(body)
    })
})

module.exports = router

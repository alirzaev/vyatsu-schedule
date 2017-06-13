const express = require('express')
const https = require('https')
const fs = require('fs')
const router = express.Router()

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

router.get('/test', function(req, res) {
    https.get('https://www.vyatsu.ru/reports/schedule/Group/5741_2.html', load_res => {
        data = ""
        load_res.setEncoding('utf-8')
        load_res.on('data', chunk => {
            data += chunk
        }).on('end', () => {
            res.send(data)
        })
    })
})

module.exports = router

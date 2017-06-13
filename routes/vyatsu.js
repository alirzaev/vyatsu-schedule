const express = require('express')
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

module.exports = router

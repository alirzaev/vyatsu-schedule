const express = require('express')
const fs      = require('fs')
const request = require('request')
const router  = express.Router()

const DEBUG = process.env.NODE_ENV !== 'production'
const BASE_URL = DEBUG ? 'http://localhost:8080/' : 'https://vyatsuschedule.herokuapp.com/'

router.get('/', (route_req, route_res) => {
    route_res.redirect('/mobile')
})

router.get('/mobile', (route_req, route_res) => {
    console.log('/mobile')

    route_res.render('index')
})

router.get('/mobile/:group_id/:season', (route_req, route_res) => {
    console.log(`/mobile/${route_req.params.group_id}/${route_req.params.season}`)

    const opts = {'encoding': 'utf-8'}
    const url = `${BASE_URL}vyatsu/schedule/${route_req.params.group_id}/${route_req.params.season}`

    request.get(url, (req_err, req_res, weeks_data) => {
        if (req_res.statusCode != 200) {
            const error = JSON.parse(req_res.body)['error']
            route_res.render('error', {error: error})
            return
        }
        fs.readFile('resources/calls.json', opts, (_, bells_data) => {
            const bells = JSON.parse(bells_data)
            const weeks = JSON.parse(weeks_data)['weeks']
            route_res.render('schedule', {weeks: weeks, bells: bells})
        })
    })
})

module.exports = router
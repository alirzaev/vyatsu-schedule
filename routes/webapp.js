const express = require('express')
const fs      = require('fs')
const request = require('request')
const router  = express.Router()

const DEBUG = process.env.NODE_ENV !== 'production'
const BASE_URL = DEBUG ? 'http://localhost:8080' : 'https://vyatsuscheduleapi.herokuapp.com'

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
    const url = `${BASE_URL}/vyatsu/schedule/${route_req.params.group_id}/${route_req.params.season}`

    request.get(url, (req_err, req_res, weeks_data) => {
        if (req_res.statusCode !== 200) {
            const error = JSON.parse(req_res.body)['error']
            route_res.render('error', {error: req_res.statusCode})
            return
        }
        request.get(`${BASE_URL}/vyatsu/calls`, (req_err, req_res, calls_data) => {
            const calls = JSON.parse(calls_data)
            const {weeks, group} = JSON.parse(weeks_data)
            route_res.render('schedule', {weeks: weeks, bells: calls, group: group})
        })
    })
})

module.exports = router
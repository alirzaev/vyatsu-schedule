const express = require('express')
const request = require('request')
const router  = express.Router()

const DEBUG = process.env.NODE_ENV !== 'production'
const BASE_URL = DEBUG ? 'http://localhost:8080' : 'https://vyatsuscheduleapi.herokuapp.com'

router.get('/', (route_req, route_res) => {
    route_res.redirect('https://bitbucket.org/AliRzaev/vyatsu_schedule_server_rest_api')
})

router.get('/calls', (route_req, route_res) => {
    console.log('/vyatsu/calls')

    request.get(
        `${BASE_URL}/vyatsu/calls`, 
        (req_err, req_res, req_data) => route_res.type('json').send(req_data)
    )
})

router.get('/groups/by_faculty.json', (route_req, route_res) => {
    console.log('/vyatsu/groups/by_faculty.json')

    request.get(
        `${BASE_URL}/vyatsu/groups/by_faculty.json`, 
        (req_err, req_res, req_data) => route_res.type('json').send(req_data)
    )
})

module.exports = router

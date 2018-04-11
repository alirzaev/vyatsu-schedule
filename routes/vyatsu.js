const express = require('express')
const request = require('request')
const log4js  = require('log4js')
const router  = express.Router()

const DEBUG = process.env.NODE_ENV !== 'production'
const BASE_URL = DEBUG ? 'http://localhost:8080' : 'https://vyatsuscheduleapi.herokuapp.com'

const logger = log4js.getLogger('vyatsu')

router.get('/', (route_req, route_res) => {
    route_res.redirect('https://bitbucket.org/AliRzaev/vyatsu_schedule_server_rest_api')
})

router.get('/calls', (route_req, route_res) => {
    logger.info('/vyatsu/calls')

    request.get(
        `${BASE_URL}/vyatsu/calls`, 
        (req_err, req_res, req_data) => route_res.type('json').send(req_data)
    )
})

router.get('/v2/groups/by_faculty.json', (route_req, route_res) => {
    logger.info('/vyatsu/v2/groups/by_faculty.json')

    request.get(
        `${BASE_URL}/vyatsu/v2/groups/by_faculty.json`, 
        (req_err, req_res, req_data) => route_res.type('json').send(req_data)
    )
})

module.exports = router

const express = require('express')
const request = require('request')
const router  = express.Router()

const DEBUG = process.env.NODE_ENV !== 'production'
const BASE_URL = DEBUG ? 'http://localhost:8080' : 'https://vyatsuscheduleapi.herokuapp.com'

function parseDate(date) {
    let day = Number.parseInt(date.slice(0, 2))
    let month = Number.parseInt(date.slice(2, 4))
    let year = Number.parseInt(date.slice(4))

    return [day, month, year]
}

function getCurrentDay(firstDate, secondDate) {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const OFFSET_MSK = 10800000
    const MODULO = 1209600000
    const DAY_IN_MILLISEC = 24 * 3600 * 1000

    const [fDay, fMonth, fYear] = parseDate(firstDate)
    const [sDay, sMonth, sYear] = parseDate(secondDate)

    firstDate = Date.parse(`${fDay} ${monthNames[fMonth - 1]} ${fYear} 00:00:00 +0300`)
    secondDate = Date.parse(`${sDay} ${monthNames[sMonth - 1]} ${sYear} 00:00:00 +0300`)

    const currentDate = Date.now() + OFFSET_MSK

    const difference = ((currentDate - firstDate + MODULO) % MODULO) / DAY_IN_MILLISEC >> 0
    const cWeek = (difference / 7) >> 0
    const cDay = difference % 7

    if (cWeek < 0 || cWeek > 1 || cDay > 5 || cDay < 0) {
        return [-1, -1]
    } else {
        return [cWeek, cDay]
    }
}

router.get('/', (route_req, route_res) => {
    route_res.redirect('/mobile')
})

router.get('/mobile', (route_req, route_res) => {
    console.log('/mobile')

    route_res.render('index')
})

router.get('/mobile/:group_id/:season', (route_req, route_res) => {
    console.log(`/mobile/${route_req.params.group_id}/${route_req.params.season}`)

    const url = `${BASE_URL}/vyatsu/schedule/${route_req.params.group_id}/${route_req.params.season}`

    request.get(url, (req_err, req_res, weeks_data) => {
        if (req_res.statusCode !== 200) {
            const error = JSON.parse(req_res.body)['error']
            if (error === undefined) {
                route_res.render('error', {error: req_res.statusCode})
            } else {
                route_res.render('error', {error: error})
            }
            return
        }
        request.get(`${BASE_URL}/vyatsu/calls`, (req_err, req_res, calls_data) => {
            const calls = JSON.parse(calls_data)
            const {weeks, group, date_range} = JSON.parse(weeks_data)
            route_res.render(
                'schedule',
                {
                    weeks: weeks,
                    calls: calls,
                    group: group,
                    today: getCurrentDay(date_range[0], date_range[1])
                }
            )
        })
    })
})

module.exports = router
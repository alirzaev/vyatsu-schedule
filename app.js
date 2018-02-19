const express       = require('express')
const body_parser   = require('body-parser')
const log4js        = require('log4js')
const api_router    = require('./routes/vyatsu')
const webapp_router = require('./routes/webapp')
const app           = express()

log4js.configure({
	appenders: {
  		console: {
  			type: 'console',
  			layout: {
  				type: 'pattern',
  				pattern: '%d{hh:mm:ss.SSS} [%z] %.5p %.36c - %m'
  			}
  		}
  	},
  	categories: {
  		default: {
  			appenders: [ 'console' ],
  			level: 'info'
  		}
  	}
})

const port = process.env.PORT || 8081,
      ip = process.env.IP || '0.0.0.0';

const logger = log4js.getLogger('app')

app.use(express.static('webapp/dist'))
app.use(body_parser.urlencoded({extended: true}))

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
});

app.use('/', webapp_router)
app.use('/vyatsu', api_router)

app.use((err, req, res, next) => {
    logger.error(err.stack)
    res.status(500).render('error', {error: 'Something bad happened!'})
});

app.set('views', './resources/views')
app.set('view engine', 'pug')

app.listen(port, ip)
logger.info(`Server is running on ${ip}:${port}`)

module.exports = app

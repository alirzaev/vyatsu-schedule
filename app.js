const express       = require('express')
const body_parser   = require('body-parser');
const api_router    = require('./routes/vyatsu')
const webapp_router = require('./routes/webapp')
const app           = express()

const port = process.env.PORT || 8081,
      ip = process.env.IP || '0.0.0.0';

app.use(express.static('webapp/dist'))
app.use(body_parser.urlencoded({extended: true}))

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/', webapp_router)
app.use('/vyatsu', api_router)

// error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('error', {error: 'Something bad happened!'})
});

app.set('views', './resources/views')
app.set('view engine', 'pug')

app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);

module.exports = app;

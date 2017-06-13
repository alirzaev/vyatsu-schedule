const express = require('express')
const body_parser = require('body-parser');
const vyatsu_router = require('./routes/vyatsu')
const index_router = require('./routes/index')
const app = express()

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

app.use(express.static('files'))
app.use(body_parser.urlencoded({ extended: true }))

app.use('/', index_router)
app.use('/vyatsu', vyatsu_router)

// error handling
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).send('Something bad happened!');
});

app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);

module.exports = app ;

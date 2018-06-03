const express = require('express');
const app = express();

const port = process.env.PORT || 8081,
    ip = process.env.IP || '0.0.0.0';

app.use(express.static('dist'));
app.listen(port, ip);
console.log(`Server is running on ${ip}:${port}`);

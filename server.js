const express = require('express');
const app = express();

const port = process.env.PORT || 8081,
    ip = process.env.IP || '0.0.0.0';

app.use(express.static('dist'));

// Backward compatibility
app.get('/mobile', (req, res) => res.redirect('/'))
app.get(
    '/mobile/:groupId/:season',
    (req, res) => res.redirect(`/#/schedule/${req.params.groupId}/${req.params.season}`))

app.listen(port, ip);
console.log(`Server is running on ${ip}:${port}`);

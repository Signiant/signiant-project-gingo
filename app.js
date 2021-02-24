const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const port = process.env.PORT || 3000;
const routes = require('./api/v1/controllers/index');

app.use(cors())
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/',
    (req, res, next) => {
        console.log(`${req.method} ${req.originalUrl}`)
        console.log(`req: ${req}`)
        next()
    }, routes);
app.use(express.static(path.join(__dirname, 'public')));
app.listen(port, () => {
    console.log('App listening on ' + port + ' @ ' + (new Date()).toLocaleString());
});



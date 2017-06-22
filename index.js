"use strict";

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

app.get("/", function(req, res) {
    res.sendFile("/index.html",  {root: __dirname + '/public/'});
});

// TODO: Noch anschauen
// app.use(require('./routes/noteRoutes.js'));
const hostname = '127.0.0.1';
const port = 3000;
app.listen(port, hostname, () => {  console.log(`Server running at http://${hostname}:${port}/`); });
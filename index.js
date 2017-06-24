const express = require('express');
// hbs
//const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public/html'));

// hbs
//app.engine('.hbs', exphbs({extname: '.hbs'}));
//app.set('view engine', '.hbs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", function(req, res) {
    res.sendFile("/html/index.html",  {root: __dirname + '/public/'});
});

// TODO: Ceres
//app.get("/notes/:id", function(req, res) {
//    res.sendFile("/html/detailNote.html",  {root: __dirname + '/public/'});
//});

// hbs
//app.get('/notes/:id', function (req, res) {
//    res.render('detailNote');
//})

app.use("/", require('./routes/noteRoutes.js'));
app.use("/notes", require('./routes/noteRoutes.js'));
app.use("/notes/:id", require('./routes/noteRoutes.js'));
app.use("/checkNotes", require('./routes/noteRoutes.js'));

const hostname = '127.0.0.1';
const port = 3001;
app.listen(port, hostname, () => {  console.log(`Server running at http://${hostname}:${port}/`); });
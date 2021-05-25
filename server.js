const express = require('express');
const app = express();
const longpoll = require("express-longpoll")(app)
const bodyParser = require("body-parser")
const port = 8080;

app.use(express.static('static'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

longpoll.create('/subscribe');

app.post('/publish', function (req, res) {
    longpoll.publish('/subscribe', req.body.message);
})

app.listen(port, function () {
    console.log('Server running on port ' + port)
})
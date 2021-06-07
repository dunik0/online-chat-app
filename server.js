const express = require('express');
// const bodyParser = require("body-parser")
const app = express();
const longpoll = require("express-longpoll")(app, { DEBUG: true })
const port = 8080;

app.use(express.static('static'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

longpoll.create('/subscribe');

app.post('/publish', function (req, res) {
    longpoll.publish('/subscribe', JSON.stringify({
        nick: req.body.nick,
        color: req.body.color,
        message: req.body.message
    }));
    res.send('Message sent');
})

app.listen(port, function () {
    console.log('Server running on port ' + port)
})
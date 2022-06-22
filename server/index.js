const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');
const pool = require('./db').pool;
var ensureToken = require('./middleware')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.post('/login/redirect', ensureToken, (req, res) => {
    res.redirect(200, '/timeline')
    console.dir({ status: 200, redirect: '/timeline' })
})
app.post('/login/authentication', ensureToken, (req, res) => {
    res.status(200).json({
        message: 'Authentication Successful!',
        auth: true
    })
})

app.post('/login', (req, res) => {
    var loggedIn = false
    var event = new Date(Date.now());
    const password = req.body.password;
    pool.setMaxListeners(0)
    pool.getConnection(function (err, connection) {
        if (err) throw err; // not connected!
        console.log("Pooled connection established.");
        // connection.query("SELECT  tsh.Login(?,?) as result", ['Anes', password], (error, result, fields) => {
            connection.query("SELECT EXISTS(SELECT * from AppLogin where( User=? and Pass=?)) as result ", ['Anes', password], (error, result, fields) => {
            if (error) throw error;
            if (result[0].result) {
                console.log(" Login Success . {" + event.toLocaleTimeString('en-US') + "}")
                loggedIn = true
            } else {
                console.error("Wrong Password !   {" + event.toLocaleTimeString('en-US') + "}")
            }
            connection.release()
        })
    });
    pool.on(
        "enqueue",
        function hanldeEvent() {
            console.log("Waiting for connection slot.");
        }
    );
    pool.on('release', function (connection) {
        console.log('Connection %d released', connection.threadId);
    });
    pool.on('acquire', function (connection) {
        console.log('Connection %d acquired', connection.threadId);
    });
    setTimeout(() => {
        if (loggedIn) {
            let token_payload = {
                password: password
            };
            let token = jwt.sign(
                token_payload,
                "jwt_secret_password",
                { expiresIn: '1h' }
            );
            return res.status(200).json({
                message: 'Token Created, Authentication Successful!',
                token: token,
                expiresIn: Date.now() + 60 * 60 * 1000
            })
        } else return res.status(404).json("Authentication failed. admin not found.");
    }, 100)
});

const port = process.env.PORT || 3001
app.listen(port, () => {
    console.log(`Server Start listening On  port ${port} `);
});
app.use(cors({
    origin: ['*'],
    methods: ['GET', 'POST'],
    credentials: true,
}));

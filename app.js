const express = require('express')
const app = express()
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const db = require('./db')

dotenv.config()

// Configuring the app to use a bodyParser for getting data from requests
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


// ROUTES
// ====================================================
app.get('/', (req, res) => {
    res.send('Hello World')
})


// STARTING THE SERVER
// =====================================================
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`)
})
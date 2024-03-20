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
app.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM tasks');
        res.json(result.rows);
      } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
})


// STARTING THE SERVER
// =====================================================
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`)
})
const express = require('express')
const app = express()
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const cors = require('cors')
const apiRouter = express.Router()

const db = require('./db')

app.use(cors())

dotenv.config()

// Configuring the app to use a bodyParser for getting data from requests
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


// ROUTES
// ====================================================
apiRouter.get('/tasks', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM tasks');
        res.json(result.rows);
      } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
})

apiRouter.post('/tasks', async (req, res) => {
    try {
        const result = await db.query(
            'INSERT INTO tasks (task, added, completed) VALUES ($1, current_date, current_date) RETURNING *',
            [ req.body.text ]
        )
        res.json(result.rows[0])
    } catch(err) {
        console.error(err)
        res.status(500).send('Internal Server Error')
    }
})

app.use('/api', apiRouter)

// STARTING THE SERVER
// =====================================================
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`)
})
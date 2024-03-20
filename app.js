const express = require('express')
const app = express()
const dotenv = require('dotenv').config()

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`)
})
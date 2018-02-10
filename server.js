const express = require('express')
const app = express()
const router = express.Router()
const port = 8080
const request = require ('request')
const fs = require('fs')
const routes = require('./routes')
const logger = require('./middleware/logger.js')
app.use(logger)
app.set('view engine', 'ejs')
app.use('/', routes)
app.use(express.static('public'))

app.listen(port, () => {
    console.log(`Now listening on port: ${port}`)
})




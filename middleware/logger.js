const express = require('express')
const router = express.Router()

const logger = (req, res, next) => {
    console.log(`Request received on: ${new Date()}`)
    console.log('Request type:', req.method)
    next()
}

module.exports = logger 
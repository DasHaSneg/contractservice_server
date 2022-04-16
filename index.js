'use strict'

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()

app.use(cors())
app.use(bodyParser.json({ limit: '50mb' }))
app.disable('x-powered-by')
// app.use('/', require('./routes')) // dev fix для postman
// app.use('/api', require('./routes'))
// app.use('/api/public', express.static('public'))

module.exports = app
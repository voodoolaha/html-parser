const express = require('express')
const config = require('config') // lib for import config files from './config/'

const app = express() // Define express application

const scrapRoute = require('./routes/scrap.routes') //path to scrap route file //path to scrap route file

/**
 * Register api route
 */
app.use('/api', scrapRoute)

const PORT = config.get('port') || 7000 // port fetched from config or default 7000

/**
 * Send application to port
 */
app.listen(PORT, () => {
  console.log(`App started on port ${PORT}`)
})

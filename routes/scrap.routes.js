const { Router } = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const config = require('config')
const url = config.get('targetUrl')

const router = Router()

/**
 * Create route for document
 */
router.get('/document', (request, response) => {
  axios(url) //request document via URL
    .then((res) => {
      const html = res.data //get HTML document as response
      const $ = cheerio.load(html) //use cheerio to easy picking HTML selectors of document
      const section = $('div')
      const textApi = [] // variable for JSON

      /* Generator for HTML document what fill JSON with text content and tag info */
      section.each(function (i) {
        const text = $(this).html()
        const table = $(this).find('table').html()
        const tag = $(this).prop('tagName') // TODO: need to implement tag info recognizing
        if (text !== '' && !text.match('<ix:header>')) {
          textApi.push({
            id: i,
            tag,
            text,
          })
        }
      })

      response.json(textApi) // send JSON to route
    })
    .catch((e) => console.error(e)) // catch errors if something went wrong
})

module.exports = router

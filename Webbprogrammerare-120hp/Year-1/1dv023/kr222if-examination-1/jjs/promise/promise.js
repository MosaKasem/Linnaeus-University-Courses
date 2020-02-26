/**
 * @module jjs/promise/promise.js
 * @author Mosa Kasem Rasol
 * @version 1.0.4
 */
var request = require('request')
const JSDOM = require('jsdom').JSDOM

/**
 * @function fetch This function promises to return a body of an URL, if it doesn't, run like the forest.
 * @param {any} url
 * @returns The entire document of an url i.e the html, and in app.js or makerequest.js i filter out what i need.
 */
function fetch (url) {
  return new Promise(function (resolve, reject) {
    request(url, function (err, resp, body) {
      if (err) {
        return reject(err)
      } if (resp.statusCode !== 200) {
        return reject(new Error('error code' + ' ' + err))
      }
      resolve(body)
    })
  })
}

module.exports.fetch = fetch

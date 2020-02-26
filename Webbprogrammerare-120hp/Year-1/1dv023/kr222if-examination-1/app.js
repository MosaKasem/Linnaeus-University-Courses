/**
 * @module app.js
 * @author Mosa Kasem Rasol
 * @version 1.0.4
 */

const makerequest = require('./jjs/makerequest') // All of my functions are inside makerequest
const fetch = require('./jjs/promise/promise') // i use fetch to whenever I needed to grab something from body/document

let url = process.argv[2] || ' http://labcloudftk46.lnu.se:8080'
// let url = 'http://vhost3.lnu.se:20080/weekend'
// http://labcloudftk46.lnu.se:8080
let link = []
let links = []
let availableDays = []
let cinemaLinksStorage = []
let cinemaAvailability = []
let resturang = []
async function start (url) {
  let data = await fetch.fetch(url)
  return data
}
/**
 * @param  {url} DefaultLink - or an optional one
 * @function (start) scrape first url, get the 3 links, starts from top and finish at the bottom.
 */
let data = start(url)
data.then(async function (html) {
  let links = await makerequest.extractLinks(html)
  link = links.map(alinks => alinks.href) // filtering the "links"
  makerequest.checkingAllLinks(link) // check if there are more links.
  console.log('Detected system 32... OK')
  return link
}).then(async function (html) {
  links = html // weekends links is now global
  let firstL = link[0] // calender link
  await fetch.fetch(firstL).then(function (html) { // make request to first link in the index, get the body
    let links = makerequest.extractLinks(html) // extracting the <a></a> elements

    link = links.map(alinks => alinks.href) // filtering the "links"
    makerequest.checkingAllLinks(link)
    return link
  }).then(async function (flink) {
    let promises = [] // this is holder for 3 persons calender.

    for (let i = 0; i < link.length; i++) {
      promises.push(fetch.fetch(firstL + link[i]))
    }
    Promise.all(promises).then(async function (tr) {
      let stringifiedTr = tr.toString()

      let theAvailableDays = await makerequest.getTable(stringifiedTr) // find all the ok's in options.
      availableDays = theAvailableDays // making it global, otherwise unreachable.
      console.log('Deleting system 32... OK')

      return availableDays
    }).then(async function (alink) {
      let cinemaLink = links[1]
      let allTheMovies = ['01', '02', '03']
      for (let p = 0; p < allTheMovies.length; p++) {
        for (let x = 0; x < alink.length; x++) {
          cinemaLinksStorage.push(await makerequest.getMovies(cinemaLink + '/check?day=' + alink[x] + '&movie=' + allTheMovies[p]))
        }
      }
      Promise.all(cinemaLinksStorage).then(async function (data) {
        await data.map(cinema => {
          cinemaAvailability.push(cinema)
        })
        return cinemaAvailability
      })
      console.log('Deleting 50% complete... OK')
    }).then(async function () {
      let resturangLink = links[2]
      for (let o = 0; availableDays.length > o; o++) {
        resturang.push(await makerequest.settingAcookie(resturangLink, availableDays[o]))
      }
      console.log('100% Deletion Complete Success ---- rebooting in 3...2...')
      return resturang
    }).then(function (resturang) {
      let findingTable = makerequest.presentation(resturang, cinemaAvailability)
      return findingTable
    })
  })
}).catch(error => console.log(error.stack)) // stack leads back to the original global scope call.

start('http://labcloudftk46.lnu.se:8080')

/**
 * @module jss/makerequest.js
 * @author Mosa Kasem Rasol
 * @version 1.0.5
 */
const request = require('request')
const JSDOM = require('jsdom').JSDOM
const cheerio = require('cheerio')
const rp = require('request-promise')
let availableDay = []

/**
 * @function (body) - find all the ok's, filter the days, and return the available day.
 * @param {any} body
 * @returns
 */
function getTable (body) {
  return new Promise(function (resolve, reject) {
    if (!body) {
      reject(body)
    }
    let $ = cheerio.load(body)
    let allTR = $('tr').toString().toLowerCase()
    let theOkDays = []
    $(allTR).each(function (allTR) {
      $(this).find('td').each(function () {
        theOkDays.push($(this).text())
      })
    })
    if (theOkDays[0] && theOkDays[3] && theOkDays[6] === 'ok') {
      availableDay.push('05')
    } else if (theOkDays[1] && theOkDays[4] && theOkDays[7] === 'ok') {
      availableDay.push('06')
    } if (theOkDays[2] && theOkDays[5] && theOkDays[8] === 'ok') {
      availableDay.push('07')
    } else {
      console.log('Disaster, no ok days are matched!!')
    }
    resolve(availableDay)
  })
}
/**
 * @param {any} html
 * @returns a element, filter href in app.
 */
function extractLinks (html) {
  const dom = new JSDOM(html)
  return Array.from(dom.window.document.querySelectorAll('a'))
}
/**
 * get the movie list
 * @param {any} html
 * @returns select ID movie and element option, manage the rest in app.
 */
function cinemaOption (html) {
  const dom = new JSDOM(html)
  return Array.from(dom.window.document.querySelectorAll('#movie option'))
}
/**
 * Checks if there are more links.
 * @param {any} links
 */
function checkingAllLinks (links) {
  if (links.length < 1) {
    throw new Error('Cannot find anymore links')
  }
}
/**
 * @function - in app, make request for all movies, for that available day, and filter out only the available movies.
 * @param {any} url
 * @returns - array of movie objects that are available.
 */
function getMovies (url) {
  return new Promise(function (resolve, reject) {
    let status1 = []
    var options = {
      method: 'GET',
      uri: url,
      headers: {
        'User-Agent': 'Request-Promise'
      },
      json: true // Automatically parses the JSON string in the response
    }
    let rescylebin = []
    rp(options).then(function (data) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].status === 1) {
          status1.push(data[i])
        } else if (data[i].status === 0) {
          rescylebin.push(data[i])
        }
      }
      status1.map(movies => {
        if (movies.movie === '01') {
          movies.movie = 'the flying decues'
        } else if (movies.movie === '02') {
          movies.movie = 'keep your seats please'
        } else if (movies.movie === '03') {
          movies.movie = 'a day at the races'
        }
      })
      status1.map(movies => {
        movies.day = movies.day === '05' ? 'friday' : movies.day
        movies.day = movies.day === '06' ? 'saturday' : movies.day
        movies.day = movies.day === '07' ? 'sunday' : movies.day
      })
      resolve(status1)
    })
      .catch(function (err) {
        console.log('GetMovies Error : ' + err)
      })
  })
}

/**
 * @param {any} dinnerUrl
 * @returns all the available tables, e.g. friday between 14-16 will be [fri1416]
 */
function settingAcookie (dinnerUrl, thisDay) {
  return new Promise(function (resolve, reject) {
    request({
      method: 'POST',  // post the request
      url: dinnerUrl + '/login',
      followRedirect: true,
      jar: true,
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      form: { username: 'zeke', password: 'coys' }
    },
      function (error, response) {
        if (error) {
          reject(error)
        } else {
          request({   // request for booking site
            method: 'GET',
            url: dinnerUrl + '/' + response.headers.location,
            jar: true,
            headers: {
              secure: 'HttpOnly'
            },
            form: { username: 'zeke', password: 'coys' }
          },
            function (error, response, html) {
              if (error) {
                reject(error)
              }
              let availableTable = []

              let $ = cheerio.load(html)
              $('input').each(function () {
                availableTable.push($(this).attr('value'))
              })
              let freeday = parseInt(thisDay)
              availableTable.pop()

              // filter out the days that are only available for the three persons.
              if (freeday === 5) {
                availableTable = availableTable.filter((x) => x.startsWith('fri'))
              } else if (freeday === 6) {
                availableTable = availableTable.filter((x) => x.startsWith('sat'))
              } else if (freeday === 7) {
                availableTable = availableTable.filter((x) => x.startsWith('sun'))
              }
              resolve(availableTable)
            })
        }
        if (error) {
          reject(error)
        }
      })
  })
}
/**
 * @param {any} resturang the available tables
 * @param {any} movie the available movies
 * @param {any} calender the available day
 */
async function presentation (resturang, movie) {
  let result = await movie.filter(e => e.length)
// the issue took 3-4 hours to find, had to go through code step by step.
// my previous concat had empty arrays, removed the empty arrays and rewrote the for loop entirely for it to work with the filter.
  for (let t = 0; t < result.length; t++) {
    for (let tt = 0; tt < result[t].length; tt++) {
      let movieTimer = await parseInt(result[t][tt].time.substring(0, 2), 10) + 2

      for (let s = 0; s < resturang.length; s++) {
        for (let o = 0; o < resturang[s].length; o++) {
          let restaurantTIme = await parseInt(resturang[s][o].substring(3, 5), 10)

          if (movieTimer === restaurantTIme) {
            result[t][tt].actualTime = restaurantTIme
          }
        }
      }
    }
  }
  // this only looped once for some unknown cause, despite the length of the object being (2).
  // fixed with a forEach inside another forEach.
  result.forEach(async function (result) {
    let movieProper = await result.filter(movie => (movie.actualTime && movie.time))

    movieProper.forEach(async function (movie) {
      movie.endTime = await addTwoHours(movie.actualTime)
      await console.log(`You can watch the movie ${movie.movie} at ${movie.time} o'clock and there's a table at ${movie.actualTime}:00 in ${movie.day}`)
    })
  })
}

async function addTwoHours (hours) {
  let result = (+hours + 2) % 24
  return await result.length === 1 ? '0' + result : '' + result
}

module.exports.presentation = presentation
module.exports.settingAcookie = settingAcookie
module.exports.getMovies = getMovies
module.exports.cinemaOption = cinemaOption
module.exports.getTable = getTable
module.exports.checkingAllLinks = checkingAllLinks
module.exports.extractLinks = extractLinks

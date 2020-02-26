/**
 * Source from http://www.w3schools.com/js/js_cookies.asp
 * @param cName - Name of cookie.
 * @param cVal - Value of cookie.
 * @param exDays - No of days cookie expires.
 */
/* eslint-disable */
function setCookie (cName, cVal, exDays) {

  let d = new Date()
  d.setTime(d.getTime() + (exDays * 24 * 60 * 60 * 1000))
  let expires = 'expires=' + d.toUTCString()
  document.cookie = cName + '=' + cVal + ';' + expires + ';path=/'
}

/**
 * Source from http://www.w3schools.com/js/js_cookies.asp
 * @param cName - Name of cookie.
 * @returns {*}
 */
function getCookie (cName) {
  let name = cName + '='
  let decodedCookie = decodeURIComponent(document.cookie)
  let ca = decodedCookie.split(';')
  for (let i = 0; i < ca.length; i += 1) {
    let c = ca[i]
    while (c.charAt(0) === ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ''
}

/* function saveClick (event) {
  let newEvent = window.localStorage.setItem('clicks', JSON.stringify(event))
}

function getClicks () {
  const clicksJson = window.localStorage.getItem('clicks')

  try {
    return clicksJson ? JSON.parse(clicksJson) : []
  } catch (error) {
    return []
  }
}

module.exports.saveClick = saveClick
module.exports.getClicks = getClicks */
module.exports.setCookie = setCookie
module.exports.getCookie = getCookie

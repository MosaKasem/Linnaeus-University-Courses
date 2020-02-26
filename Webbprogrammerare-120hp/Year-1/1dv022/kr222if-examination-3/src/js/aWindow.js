/**
 * handles manipulation of zIndex
 * gives a unique ID for each window
 * @param {any} containerID
 * @returns a container that is moveable inside the window/body
 */
/* eslint-disable */
let px = 15
let py = 15

function aWindow (containerID) {
  let idName = 'window-'

  /**
   * This is to reset the boxes when they start sticking out of monitor
   */
  let body = document.body,
    html = document.documentElement

  var height = Math.max(body.scrollHeight, body.offsetHeight,
    html.clientHeight, html.scrollHeight, html.offsetHeight)

  let id = document.querySelectorAll('.draggable').length + 1
  let templateDiv = document.getElementById(containerID).content.firstElementChild

  let container = document.importNode(templateDiv, true)
  container.setAttribute('id', idName + id)

  container.querySelector('.close').addEventListener('click', close)
  let max = 0
  container.style.transform = `translate(${px}px, ${py}px)`

  px += 25
  py += 25

  container.addEventListener('mousedown', function (e) {
    document.querySelectorAll('.draggable').forEach(x => {
      if (x.style.zIndex > max) {
        max = x.style.zIndex

        max = ++x.style.zIndex
      }
    })
    this.style.zIndex = ++max
  })
  function close () {
    this.parentNode.parentNode.parentNode
    .removeChild(this.parentNode.parentNode)
  }
  return document.getElementById('background').appendChild(container)
}

(async() => {
  try {
    var today = new Date()
    var dd = today.getDate()
    var mm = today.getMonth() + 1 // January is 0!
    var yyyy = today.getFullYear()
    if (dd < 10) {
      dd = '0' + dd
    }

    if (mm < 10) {
      mm = '0' + mm
    }

    today = mm + '/' + dd + '/' + yyyy
    document.querySelector('#date-part').innerHTML = today
    var myVar = setInterval(function () {
      myTimer()
    }, 1000)

    function myTimer () {
      var d = new Date()
      document.querySelector('#time-part').innerHTML = d.toLocaleTimeString()
    }
  } catch (error) {
    console.log('error: ', error)
  }
})()

module.exports = aWindow

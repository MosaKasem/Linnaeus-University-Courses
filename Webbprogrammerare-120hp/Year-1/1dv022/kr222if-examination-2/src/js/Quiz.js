/**
 * Quiz.
 *
 * @author Mosa Kasem Rasol
 * @version 1.1.1
 */

/**
 * @function countdown -counts to 20.
 */

let timerId = 1
function countdown () {
  if (timerId > 1) {
    clearInterval(timerId) // om det redan finns en, cleara först
  }
  var seconds = 20
  timerId = setInterval(function () {
    seconds--
    if (seconds === 0) {
      gameOver()
      // document.getElementById('seconds').innerHTML = '0'
    } else {
      document.getElementById('seconds').textContent = seconds
      // console.log(seconds)
    }
  }, 1000)
}

let nextUrl = 'http://vhost3.lnu.se:20080/question/1'

document.getElementById('button').addEventListener('click', event => getText(nextUrl))
document.getElementById('button').addEventListener('click', event => countdown())
document.getElementById('addPost').addEventListener('submit', addPost)

/**
 * @param {url} url -data request.
 */
function getText (url) {
  playerPlays()
  document.getElementById('addPost').style.visibility = 'visible'
  document.getElementById('userInfo').style.visibility = 'hidden'
  window.fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(function (resp) {
      return resp.json()
    })
    .then(function (data) {
      if (nextUrl === undefined) {
        gameOver()
        // window.location.reload()
      }
      let output = ''
      output += data.question
      document.getElementById('qu').innerHTML = output

      // let alter = document.createDocumentFragment()
      nextUrl = data.nextURL
      if (data.alternatives) {
        let ul = document.createElement('ul')

        for (let i in data.alternatives) {
          let li = document.createElement('li')
          li.innerText = 'write: ' + i + ' ,for option: ' + data.alternatives[i]
          ul.appendChild(li)
        }
        document.getElementById('qu2').appendChild(ul)
      }
    })
    .catch((err) => console.log(err))
}
/**
 * @param {any} elementID -To clean whatever the user writes in the text field after submitting.
 */
function clearBox (elementID) {
  document.getElementById('qu2').innerHTML = ''
  document.getElementById('title').value = ''
}
/**
 * @param {any} url -where answer is headed, probably to check wether the user answered correctly or not.
 * @param {any} answer -the answer text.
 */
function postAnswer (url, answer) {
  window.fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(answer)
  })
  .then(function (resp) {
    return resp.json()
  })
  .then(function (data) {
    if (data.message === 'Correct answer!') {
      clearInterval(timerId)
      countdown()
      console.log(data.message)
    } else {
      gameOver()
      window.location.reload()
      console.log(data.message)
    } if (nextUrl === undefined) {
      window.location.reload(true)
    }
    nextUrl = data.nextURL
    // console.log('NextURL: ' + nextUrl)
    getText(nextUrl)
  })
}
/**
 * @param {any} e -the text or response that we're sending.
 */
function addPost (e) {
  e.preventDefault()
  let answerText = document.getElementById('title').value
  let answer = {
    answer: answerText
  }
  postAnswer(nextUrl, answer)
  clearBox()
}
/**
 * @description just to let the user know, that it's over.
 */
function gameOver () {
  document.getElementById('seconds').innerHTML = 'game over'
  clearInterval(timerId)
  document.getElementById('title').style.display = 'none'
  document.getElementById('addPost').style.display = 'none'
  document.getElementById('userInfo').style.visibility = 'visible'
}
// let playersArray = undefined
let theCountedTime = 1
/**
 * @function (playerPlays) counting the point and when the game is over, we store in local store.
 */
function playerPlays () {
  let player = document.getElementById('theUserName').value
  let timer = 20 - parseInt(document.getElementById('seconds').innerHTML)

  let currentUser = JSON.parse(window.localStorage.getItem('game'))
  if (!isNaN(theCountedTime)) {
    timer += theCountedTime
  }

  let user = {
    'Player': player,
    'Timer': timer
  }

  theCountedTime = user.Timer

  if (isNaN(user.Timer)) {
    window.location.reload()
  } else if (nextUrl === undefined) {
    window.localStorage.setItem('game', JSON.stringify(user))
    let playersArray = JSON.parse(window.localStorage.getItem('LocalPlayers')) || []
    let players = playersArray.slice(0, 4)
    players.sort(function (a, b) {
      return a.Timer - b.Timer
    })
    players.push(user)
    // window.location.reload(true)
    window.localStorage.setItem('LocalPlayers', JSON.stringify(players))

    currentUser = JSON.parse(window.localStorage.getItem('game'))
    Object.keys(window.localStorage).forEach(function (key) {
      if (currentUser.Timer) {
        window.localStorage.removeItem('game')
      }
    })
    currentUser.Timer = ''
  }
  if (nextUrl === undefined) {
    RepresentPlayer()
  }
}
/**
 * @function (RepresentPlayer) sort from fastest to least fastest and then present the top 5.
 */
function RepresentPlayer () {
  let currentUser = JSON.parse(window.localStorage.getItem('LocalPlayers'))
  // let Players = currentUser.slice(0, 5)
  // if (Players !== null) {
  currentUser.sort(function (a, b) {
    return a.Timer - b.Timer
  })
  // window.localStorage.setItem('ArrayOfPlayers', JSON.stringify())
  if (nextUrl === undefined) {
    // let frag = document.createDocumentFragment()
    currentUser.forEach(function (user) {
      let li = document.createElement('li')
      let text = document.createTextNode(`(Player: ${user.Player} Score: ${user.Timer})`)
      li.appendChild(text)
      document.querySelector('#ulPlayer').appendChild(li)
    })
      // li.innerText = `Player ${i + 1}`
      // frag.appendChild(li)
  }
  console.log(currentUser)
}

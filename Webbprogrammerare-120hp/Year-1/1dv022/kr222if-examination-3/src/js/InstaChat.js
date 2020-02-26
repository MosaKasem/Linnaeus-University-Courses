let config = require('./config.json')
let cookie = require('./cookie')
/**
 * Constructor for Chat
 * @param {any} container
 */
/* eslint-disable */
function InstaChat (container) {
  let header
  let template = document.querySelector('#chat')
  let chatDiv = this.chatDiv = document.importNode(template.content.firstElementChild, true)
  let messageArea = this.chatDiv.querySelectorAll('.messageArea')[0]
  let messagesDiv = this.chatDiv.querySelector('.messages')
  let userNameInput = chatDiv.querySelector('#changeUsername')

  this.chatObject = {
    messageDiv: messagesDiv,
    container: container,
    username: cookie.getCookie('username'),
    chatDiv: chatDiv,
    messageArea: messageArea,
    socket: null
  }
  header = document.createElement('div')
  container.appendChild(this.chatObject.chatDiv)
  container.appendChild(header)

  this.username()
  userNameInput.addEventListener('click', function () {
    this.chatObject.username = ''
    this.changeUserName()
  }.bind(this))
}

InstaChat.prototype.receiveMessage = function (message) {
  let messageDiv
  let template
  let msgContainer
  let date
  let newDate = new Date()

  date = document.querySelector('#time-part').innerHTML = newDate.toLocaleTimeString()

  template = this.chatObject.chatDiv.querySelectorAll('template')[0]
  messageDiv = document.importNode(template.content.firstElementChild, true)

  msgContainer = this.chatObject.chatDiv.querySelectorAll('.messages')[0]

  messageDiv.querySelectorAll('.author')[0].textContent = message.username += ': '
  messageDiv.querySelectorAll('.text')[0].textContent = date + ' ' + message.data
  msgContainer.insertBefore(messageDiv, msgContainer.firstElementChild)
}

/**
 * Adding username
 */
InstaChat.prototype.username = function () {
  if (this.chatObject.username === null || this.chatObject.username === undefined || this.chatObject.username === '') {
    let username = this.chatObject.chatDiv.querySelectorAll('input')[0]
    let userSavButt = this.chatObject.chatDiv.querySelectorAll('button')[0]

    this.chatObject.messageArea.disabled = true

    userSavButt.setAttribute('placeHolder', 'Pick username')
    username.setAttribute('class', 'usernameVisibility')
    userSavButt.setAttribute('class', 'usernameVisibility')

    this.chatObject.chatDiv.insertBefore(userSavButt, this.chatObject.messageArea)
    this.chatObject.chatDiv.insertBefore(username, this.chatObject.messageArea)

    userSavButt.addEventListener('click', function () {
      this.chatObject.username = username.value
      cookie.setCookie('username', username.value, 2)

      username.setAttribute('class', 'dontDisplay')
      userSavButt.setAttribute('class', 'dontDisplay')

      this.chatObject.messageArea.className = 'messageArea'
    }.bind(this))
    this.chatOn()
  } else {
    this.chatObject.messageArea.className = 'messageArea'
    this.chatOn()
  }
}
/**
 * Changing existing username
 */
InstaChat.prototype.changeUserName = function () {
  if (this.chatObject.username === null || this.chatObject.username === undefined || this.chatObject.username === '') {
    let username = this.chatDiv.querySelectorAll('input')[0]
    let userSavButt = this.chatObject.chatDiv.querySelectorAll('button')[0]

    username.setAttribute('class', 'usernameVisibility')
    userSavButt.setAttribute('class', 'usernameVisibility')
    this.chatObject.chatDiv.insertBefore(userSavButt, this.chatObject.messageArea)
    this.chatObject.chatDiv.insertBefore(username, this.chatObject.messageArea)

    userSavButt.addEventListener('click', function () {
      this.chatObject.username = username.value
      cookie.setCookie('username', username.value, 2)

      username.setAttribute('class', 'dontDisplay')
      userSavButt.setAttribute('class', 'dontDisplay')
    }.bind(this))
  }
}
/**
 * to send messages
 */
InstaChat.prototype.chatOn = function () {
  this.chatObject.messageArea.disabled = false
  this.chatObject.messageArea.setAttribute('placeHolder', 'Press enter to send message!')

  this.chatObject.messageArea.addEventListener('keypress', function (event) {
    if (event.keyCode === 13) {
      this.sendMessage(event.target.value, this.chatObject.username)
      event.target.value = ''
      event.preventDefault()
    }
  }.bind(this))
}
/**
 * Connects to a websocket
 */
InstaChat.prototype.connect = function () {
  return new Promise(function (resolve, reject) {
    if (this.chatObject.socket && this.chatObject.socket.readyState === 1) {
      resolve(this.chatObject.socket)
      return
    } /* else {
      this.chatObject.messageArea.disabled = true
      this.chatObject.chatDiv.innerHTML = "Can not establish connection to server, please try again later"
    } */

    this.chatObject.socket = new WebSocket(config.address)
    // this.chatObject.socket = new WebSocket('ws://bla')

    this.chatObject.socket.addEventListener('open', function () {
      resolve(this.chatObject.socket)
    }.bind(this))

    this.chatObject.socket.addEventListener('error', (error) => {
      const errorMsg = {
        channel: "Detta är inte nödvändigt",
        data: "Try again later",
        socket: null,
        type: "message",
        username: "Error: "
      } 
      this.receiveMessage(errorMsg)
      reject(new Error(`Can't establish connection`))
    })
    this.chatObject.socket.addEventListener('message', function (event) {
      let message = JSON.parse(event.data)
      if (message.type === 'message') {
        this.receiveMessage(message)
        console.log('message: ', message);
      }
    }.bind(this))
  }.bind(this))
}
/**
 * send message
 * @param {text} text contains the text
 * @param {username} username contains the username
 */
InstaChat.prototype.sendMessage = function (text, username) {
  let data
  data = {
    socket: this.chatObject.socket,
    type: 'message',
    data: text,
    username: username,
    channel: `Detta är inte nödvändigt`,
    key: config.key
  }
  this.connect().then(function (socket) {
    socket.send(JSON.stringify(data))
  })
}

/**
 * @param (message) the message, contains both the username and text message
 */
InstaChat.prototype.receiveMessage = function (message) {
  let messageDiv
  let template
  let msgContainer
  let date
  let newDate = new Date()

  date = document.querySelector('#time-part').innerHTML = newDate.toLocaleTimeString()

  template = this.chatObject.chatDiv.querySelectorAll('template')[0]
  messageDiv = document.importNode(template.content.firstElementChild, true)

  if (message.username === cookie.getCookie('username')) {
    messageDiv.classList.add('myMessageDiv')
  }
  
  msgContainer = this.chatObject.chatDiv.querySelectorAll('.messages')[0]

  messageDiv.querySelectorAll('.author')[0].textContent = message.username += ': '
  messageDiv.querySelectorAll('.text')[0].textContent = date + ' ' + message.data
  msgContainer.insertBefore(messageDiv, msgContainer.firstElementChild)
}

module.exports = InstaChat

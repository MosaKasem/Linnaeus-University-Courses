/**
 * @author Mosa Kasem Rasol
 * @version 1.0.2
*/

var socket = io.connect('http://localhost:3000')

socket.on('issue webhook', function (data) {
  createNotify(data) // The Issue Action
})

socket.on('issue body', function (data) {
  renderNotifyContent(data) // The Issue data.
})

socket.on('issue comment', function (data, body) {
  createNotify(data)
})
// basic 1dv022, select UL, create LI with the recieved content and append it to selected UL.
function renderNotifyContent (data) {
  let ul = document.querySelector('#notify')
  let li = document.createElement('ul')
  li.setAttribute('class', 'list-group-item alert alert-danger')
  li.innerHTML = `ID: ${data.id}<br />
  User: ${data.user}<br />
  Body: ${data.issueBody}<br />
  Comments: ${data.comments}<br />
  IssueUrl: ${data.issueUrl}<br />
  Created at: ${data.created_at}<br />
  Updated at: ${data.updated_at}`
  ul.appendChild(li)
}

function createNotify (data) {
  let body = { action: data.action, title: data.title, user: data.user }
  let ul = document.querySelector('#notify')
  let li = document.createElement('li')
  li.innerHTML = `Action: ${body.action}<br />
  Title: ${body.title}<br />
  User: ${body.user}
  `
  ul.appendChild(li)
}

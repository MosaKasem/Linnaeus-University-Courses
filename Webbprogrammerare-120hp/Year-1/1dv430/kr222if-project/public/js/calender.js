// let date
// let eventDescription
// let entryID
// let month
// let startDay

// const SHORT = 28
// const MEDIUM = 30
// const LONG = 31

// let FEB = SHORT
// let APR, JUN, SEP, NOV = MEDIUM
// let JAN, MAR, MAY, JUL, AUG, OCT, DEC = LONG

// class fuckthisShit {
//   constructor () {
//     this.month = month
//     this.startDay = startDay
//   }
//   initCalenderGrid (month, startDay) {
//     // this.month = month
//     // this.startDay = startDay

//     for (let i = 1; i < startDay; i++) {
//       let newDIV = document.createElement('div')
//       newDIV.setAttribute('class', 'blanks')

//       let newContent = document.createTextNode('-')
//       newDIV.appendChild(newContent)

//       let currentDiv = document.getElementById('populateGrid')
//       document.body.insertBefore(newDIV, currentDiv)
//     }
//     for (let i = 0; i < month; i++) {
//       let newDiv = document.createElement('div')
//       newDiv.setAttribute('id', i + 1)

//       newDiv.addEventListener('click', this.getDescription, false)
//       let newContent = document.createTextNode(i + 1)
//       newDiv.appendChild(newContent)

//       let currentDiv = document.getElementById('populateGrid')
//       document.body.insertBefore(newDiv, currentDiv)
//     }
//   }
//   getDate () {

//   }

//   displayDate (entryID) {

//   }

//   getDescription () {
//     eventDescription = document.getElementById('description').value
//     date = document.getElementById('dateSelect').value
//     date = +date(function () {
//       document.getElementById(date).innerHTML = eventDescription
//     })()
//   }
//   displayDescription (entryID) {

//   }
// }

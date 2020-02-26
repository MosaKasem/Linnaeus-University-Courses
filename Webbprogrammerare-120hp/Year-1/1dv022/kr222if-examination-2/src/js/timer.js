// /**
//  * @function countdown -counts to 20.
//  */

// let timerId = 1
// function countdown () {
//   if (timerId > 1) {
//     clearInterval(timerId) // om det redan finns en, cleara först
//   }
//   var seconds = 20
//   timerId = setInterval(function () {
//     seconds--
//     if (seconds === 0) {
//       gameOver()
//       // document.getElementById('seconds').innerHTML = '0'
//     } else {
//       document.getElementById('seconds').textContent = seconds
//       // console.log(seconds)
//     }
//   }, 1000)
// }
// module.exports = countdown

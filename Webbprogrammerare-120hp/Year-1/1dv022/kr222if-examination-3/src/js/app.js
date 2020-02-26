/**
 * @author Mosa Kasem Rasol
 * @version 1.0.0
 */

// Note: ./Window is unused but is required for the window to be moveable.
// Do not remove it or it wont work (Framework requirement)

// /* eslint-disable */
require('./Window')
const WindowController = require('./aWindow.js')
const Memory = require('./Memory')
const InstaChat = require('./InstaChat')
const KeyPad = require('./KeyPad')

/* // eventListener for chat
document.querySelector('#ChatButton').addEventListener('click', startChat)
function startChat () {
  try {
    let draggable = aWindow('draggableTemp')
    new InstaChat(draggable)
  } catch (error) {
    throw error
  }
}

// eventListener for memory
document.querySelector('#Memory').addEventListener('click', startMemory)
function startMemory () {
  try {
    let draggable = aWindow('draggableTemp')
    new Memory.playMemory(4, 4, draggable)
  } catch (error) {
    throw error
  }
}
// eventListener for drumkit
document.querySelector('#DrumKit').addEventListener('click', startPad)
function startPad () {
  try {
    let draggable = aWindow('draggableTemp')
    new KeyPad(draggable).makeIt()
  } catch (error) {
    throw error
  }
}
 */
let initiate = function () {
  let draggable = new WindowController('draggableTemp')
  switch (this.id) {
    case 'DrumKit':
      new KeyPad(draggable).makeIt()
      break
    case 'Memory':
      new Memory.PlayMemory(4, 4, draggable)
      break
    case 'ChatButton':
      new InstaChat(draggable)
      break
    default:
      break
  }
}
document.querySelector('#DrumKit').addEventListener('click', initiate)
document.querySelector('#Memory').addEventListener('click', initiate)
document.querySelector('#ChatButton').addEventListener('click', initiate)

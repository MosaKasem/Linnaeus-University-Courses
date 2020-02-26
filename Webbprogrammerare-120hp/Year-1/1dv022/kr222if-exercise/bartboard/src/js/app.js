
require('./bart-board')

let bb1 = document.createElement('bart-board')
bb1.setAttribute('text', 'STOP')
document.querySelector('#board').appendChild(bb1)
bb1.setAttribute('speed', 2)
bb1.addEventListener('filled', () => {
  bb1.wipeBoard()
})

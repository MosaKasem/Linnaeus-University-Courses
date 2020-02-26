// document.getElementById('Memory')

/* eslint-disable */
module.exports = {
  PlayMemory: PlayMemory
}
/**
 * constructor för Playmemory, tar emoot rows, cols och container som är vår fönster som man kan röra på dynamiskt
 * @param {any} rows
 * @param {any} cols
 * @param {any} container
 */
function PlayMemory (rows, cols, container) {
  var a
  var tiles = []
  var turn1
  var turn2
  var lastTile
  var pairs = 0
  var tries = 0
  tiles = getPictureArray(rows, cols)
  countDown()
  let templateDiv = document.querySelectorAll('template#memoryContainer')[0].content.firstElementChild
  let gameOverDiv = document.importNode(templateDiv, true)

  var template = document.importNode(templateDiv, false)

  tiles.forEach(function (tile, index) {
    a = document.importNode(templateDiv.firstElementChild, true)

    a.firstElementChild.setAttribute('data-bricknumber', index)

    template.appendChild(a)
    if ((index + 1) % cols === 0) {
      template.appendChild(document.createElement('br'))
    }
  })
  template.addEventListener('click', function (event) {
    event.preventDefault()
    var img
    if (event.target.nodeName === 'IMG') {
      img = event.target
    } else {
      img = event.target.firstElementChild
    }

    var index = parseInt(img.getAttribute('data-bricknumber'))

    turnBrick(tiles[index], index, img)
  })
  container.appendChild(template)

  function turnBrick (tile, index, img) {
    if (turn2) { return }
    img.src = 'image/' + tile + '.png'
    if (!turn1) {
      turn1 = img
      lastTile = tile
    } else {
      if (img === turn1) { return }
      tries += 1
      // second brick is clicked
      turn2 = img
      if (tile === lastTile) {
        // found a pair
        pairs += 1
        if (pairs === (cols * rows) / 2) {
          var div = document.createElement('div')
          div.appendChild(document.createTextNode('Well done! you clicked ' + tries + ' times'))

          div.setAttribute('class', 'centerDiv')
          let thisDiv = gameOverDiv.querySelector('.contentDiv').appendChild(div)
          // Måste referenceNode vara null? då menar jag thisDiv.firstElementChild som är null då.
          container.appendChild(thisDiv).insertBefore(template, thisDiv.firstElementChild)
          clearInterval(interval)
        }
        window.setTimeout(function () {
          turn1.parentNode.classList.add('removed')
          turn2.parentNode.classList.add('removed')
          turn1 = null
          turn2 = null
        }, 100)
      } else {
        window.setTimeout(function () {
          turn1.src = 'image/0.png'
          turn2.src = 'image/0.png'
          turn1 = null
          turn2 = null
        }, 500)
      }
    }
  }
  // countDown I followed my previous
  var timer = gameOverDiv.querySelectorAll('.timer')[0]
  var interval
  var totalTime = 0
  var div = document.createElement('div')
  div.appendChild(document.createTextNode('Game Over'))
  div.setAttribute('class', 'centeredDiv')
  container.appendChild(timer)

  function countDown () {
    var counter = 21
    interval = setInterval(function () {
      counter -= 1
      if (counter < 0) {
        clearInterval(interval)

        container.children[1].textContent = ''
        container.children[1].appendChild(div)

        timer.textContent = ''
      } else {
        timer.textContent = counter.toString() + ' seconds left.'
        totalTime += 1
      }
    }, 1000)
  }
}

function getPictureArray (rows, cols) {
  var i
  var arr = []
  for (i = 1; i <= (rows * cols) / 2; i += 1) {
    arr.push(i)
    arr.push(i)
  }
  // for (i = arr.length - 1; i > 0; i--) {
  //   var j = Math.floor(Math.random() * (i + 1))
  //   var temp = arr[i]
  //   arr[i] = arr[j]
  //   arr[j] = temp
  // }
  return arr
}
document.getElementById('Memory')
/* eslint-disable */


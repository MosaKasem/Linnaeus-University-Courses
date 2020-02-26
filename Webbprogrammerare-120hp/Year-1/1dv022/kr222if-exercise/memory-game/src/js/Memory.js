
module.exports = {
  playMemory: playMemory,
  shuffle: getPictureArray
}
function playMemory (rows, cols, container) {
  var a
  var tiles = []
  var turn1
  var turn2
  var lastTile
  var pairs = 0
  var tries = 0
  tiles = getPictureArray(rows, cols)
  container = document.getElementById(container)
  var templateDiv = document.querySelectorAll('#memoryContainer template')[0].content.firstElementChild
  var div = document.importNode(templateDiv, false)
  tiles.forEach(function (tile, index) {
    a = document.importNode(templateDiv.firstElementChild, true)
    a.firstElementChild.setAttribute('data-bricknumber', index)
    div.appendChild(a)
    if ((index + 1) % cols === 0) {
      div.appendChild(document.createElement('br'))
    }
  })
  div.addEventListener('click', function (event) {
    event.preventDefault()
    var img = event.target.nodeName === 'IMG' ? event.target : event.target.firstElementChild
    var index = parseInt(img.getAttribute('data-bricknumber'))
    turnBrick(tiles[index], index, img)
  })
  container.appendChild(div)
  function turnBrick (tile, index, img) {
    if (turn2) { return }
    img.src = 'image/' + tile + '.png'
    if (!turn1) {
      turn1 = img
      lastTile = tile
      return
      // first brick is clicked
    } else {
      if (img === turn1) { return }
      tries += 1
      // second brick is clicked
      turn2 = img
      if (tile === lastTile) {
        // found a pair
        pairs += 1
        if (pairs === (cols * rows) / 2) {
          console.log('You manage to finish the game after ' + tries + ' rounds')
        }
        setTimeout(function () {
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
}
function getPictureArray (rows, cols) {
  var i
  var arr = []
  for (i = 1; i <= (rows * cols) / 2; i += 1) {
    arr.push(i)
    arr.push(i)
  }
  for (i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1))
    var temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
  }
  return arr
}

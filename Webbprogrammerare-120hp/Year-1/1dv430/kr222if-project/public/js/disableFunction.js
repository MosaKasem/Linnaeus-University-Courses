let allButtons = document.querySelectorAll('button')
allButtons.forEach((a, i) => {
  a.addEventListener('click', event => {
    allButtons[i].style.display = 'none'
  })
})

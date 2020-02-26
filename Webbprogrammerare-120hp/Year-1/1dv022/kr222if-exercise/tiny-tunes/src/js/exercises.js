function ex01 () {
  let myText = document.createTextNode('Hello World')
  let pTag = document.querySelector('#step01_hello')
  pTag.appendChild(myText)
}
function ex02 () {
  let tag = document.querySelector('#step02')
  let h2 = document.createElement('h2')
  h2.innerText = 'This is a sub headline'
  tag.appendChild(h2)
}
function ex03 () {
  let h2 = document.querySelectorAll('h2')[4]
  let newH2 = document.createElement('h2')
  newH2.appendChild(document.createTextNode('This is a sub headline'))
  h2.parentElement.insertBefore(newH2, h2.nextElementSibling)
}
function ex04 () {
  let h2 = document.querySelectorAll('#step04 h2')[0]
  h2.classList.add('red')
}
function ex05 () {
  let greyboxA = document.querySelector('#step05 .greybox a')
  greyboxA.addEventListener('click', event => {
    event.preventDefault()
    let p = document.createElement('p')
    p.innerText = 'You Clicked!'
    document.querySelector('#step05').appendChild(p) // can be done in 2 ways - this is recommendet.
    // greyboxA.parentElement.parentElement.appendChild(p) // this creates more children elements.
  })
}
function ex06 () {
  let freg = document.createDocumentFragment()

  for (let i = 0; i < 10; i = i + 1) {
    let li = document.createElement('li')
    li.innerText = `SHOOOO HEY HEY! ${i + 1}`
    freg.appendChild(li)
  }
  document.querySelector('#list06').appendChild(freg)
}
function ex07 () {
  const templateNode = document.querySelector('#step07-template')
  let liTemp
  let list07 = document.querySelector('#list07')

  for (let i = 0; i < 5; i++) {
    liTemp = document.importNode(templateNode.content, true)
    let a = liTemp.querySelector('a')
    a.setAttribute('href', 'http://sunet.se')
    a.innerText = `This is the ${i + 1}`
    // document.querySelector('#list07').appendChild(liTemp) <- this 52 can be replaced with line 53, two ways to do this ->
    list07.appendChild(liTemp)
  }
}
function ex08 () {
  let button = document.querySelector('#todolistform button')
  button.addEventListener('click', event => {
    let value = button.previousElementSibling.value
    if (value.length === 0) {
      return
    }
    let li = document.createElement('li')
    li.innerText = value
    document.querySelector('#todolist ul').appendChild(li)
  })
}
function ex09 () {
  let username = document.querySelectorAll('#textboxes09 input')[0]
  let confirm = document.querySelectorAll('#textboxes09 input')[1]
  let validation = document.querySelector('#step09 .validation')

  document.querySelector('#textboxes09').addEventListener('blur', event => {
    if (username.value.length > 0 && confirm.value.length > 0) {
      if (username.value === confirm.value) {
        validation.innerText = 'The User is OK!'
      } else {
        validation.innerText = `${'The Users dont match'}`
      }
    } else {
      validation.innerText = ''
    }
  }, true)
}

module.exports = {
  ex01,
  ex02,
  ex03,
  ex04,
  ex05,
  ex06,
  ex07,
  ex08,
  ex09
}

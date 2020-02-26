/**
 * I followed the tutorial from 30daysJavascript by Wes Bos for the drumkit however!
 * The code and html are changed ofcoure in order to work with the single page app.
 * https://javascript30.com/
 */

/**
 * The constructor
 * @param {any} container
 */

 class KeyPad {
   constructor (container) {
     this.container = container
   }

   makeIt () {
     let amountOfDivs = document.querySelectorAll('.draggable')
     let templateDiv = document.querySelectorAll('template#KeyPadGame')[0].content.firstElementChild
     let template = document.importNode(templateDiv, false)

     let a = document.importNode(templateDiv, true)

     a.firstElementChild.setAttribute('data-keydrumNumber', amountOfDivs.length)

     let childNods = a.childNodes
     // To remove the CSS styling
     Array.from(childNods).forEach(v => {
       v.addEventListener('transitionend', this.removeTransition)
     })
     template.addEventListener('click', this.playIt)
     template.appendChild(a)
     this.container.appendChild(template)
   }
    // Plays the Audio and adds css style.
   playIt (e) {
     let audio = this.querySelectorAll(`audio[data-key="${e.target.dataset.key}"]`)[0]
     let key = this.querySelectorAll(`.key[data-key="${e.target.dataset.key}"]`)[0]

     if (!audio) return
     audio.currentTime = 0
     audio.play()
     key.classList.add('playing')
   }

    // Removes the css styling.
   removeTransition (e) {
     if (e.propertyName !== 'transform') return
     e.target.classList.remove('playing')
   }
}

 module.exports = KeyPad

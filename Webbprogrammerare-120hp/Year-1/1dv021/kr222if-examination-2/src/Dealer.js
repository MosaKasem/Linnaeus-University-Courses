'use strict'

// const Card = require('./Deck.js')

let Dealer = function () {
  this.hand = []
  this.sum = 0
  this.result = undefined
}
Dealer.prototype.shuffle = function (deckOfCards) {
  for (let i = 0; i < deckOfCards.length; i++) {
    let random = Math.floor(Math.random() * deckOfCards.length)
    let x = deckOfCards[i]
    deckOfCards[i] = deckOfCards[random]
    deckOfCards[random] = x
  }
  return deckOfCards
}
Dealer.prototype.receiveCard = function (deckOfCards) {
  return deckOfCards.pop()
}

Dealer.prototype.isNotSatisfied = function () {
  if (this.sum < 18) {
    return true
  } else {
    return false
  }
}
// alternative method to count the sum
// Dealer.prototype.count = function (hand, sum) {
//   let score = 0
//   for (let i = 0; this.hand.length; i++) {
//     score += this.hand[i].value
//   }
//   this.sum = score
// }

Dealer.prototype.givecard = function (deckOfCards) {
  let card = deckOfCards.pop()
  if (this.sum > 7 && card.value === 14) {
    card.value = 1
    this.hand.push(card)
  } else if (this.sum <= 7 && card.value === 1) {
    card.value = 14
    this.hand.push(card)
  } else {
    this.hand.push(card)
  }
  this.sum = this.hand.reduce(function (a, b) {
    return a + b.value // take value from b and start counting from index 0
  }, 0)
  this.result = this.sum
}
Dealer.prototype.toString = function () {
  return `${this.hand.join(' ')} -sum: ${this.sum}` // this.hand.forEach(card => console.log(card.suit, card.name))
}
Dealer.prototype.emptyHand = function () {
  this.hand = []
  this.sum = 0
}

module.exports = Dealer

'use strict'

const Player = {
/**
/* @param {Player}
/* @
*/
  RecieveNewCard: function (deckOfCards) {
    let card = deckOfCards.pop() // tar en kort från deck.

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
      return a + b.value // start from 0 index to last.
    }, 0)

    this.result = this.sum
  },

  PlayerNotSatisfied: function () {
    return this.sum < 17
  },

  toString: function () {
    return `${this.name} ${this.hand.join(' ')} -sum: ${this.sum}` // this.hand.forEach(card => console.log(card.suit, card.name))
  },

  emptyHand: function () {
    this.value = 0
    this.hand = []
  }
}
/**
 * @param {Object[Hand, Sum, Result]} - hand to hold cards - sum for value - result win or lose
 */
let playerCreate = function (name) {
  return Object.create(Player, {
    'name': {
      value: name,
      writable: true,
      enumerable: true,
      configurable: true
    },
    'hand': {
      value: [],
      writable: true,
      enumerable: true,
      configurable: true
    },
    'sum': {
      value: 0,
      writable: true,
      enumerable: true,
      configurable: true
    },
    'result': {
      value: undefined,
      writable: true,
      enumerable: true,
      configurable: true
    }
  })
}

module.exports = playerCreate

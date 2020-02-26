'use strict'

class Card {
  constructor (value, suit, name) {
    this.value = value
    this.name = name
    this.suit = suit
  }
  toString (value, suit) {
    return this.name + this.suit
  }
}
module.exports.Card = Card

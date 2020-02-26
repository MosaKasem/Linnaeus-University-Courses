'use strict'
/**
 * Module for lego part 5.
 *
 * @module src/kortspel
 * @author Mosa Kasem Rasol
 * @version 1.1.0
 */

const Getmybloodycards = require('./Card')

function Deck () {

}
Deck.prototype.card = function () {
  this.name = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
  this.suit = ['♠', '♡', '♢', '♣']
  var cards = []

  for (var s = 0; s < this.suit.length; s++) {
    for (var n = 0; n < this.name.length; n++) {
      cards.push(new Getmybloodycards.Card(n + 1, this.name[n], this.suit[s]))
    }
  }
  return cards
}

module.exports = Deck

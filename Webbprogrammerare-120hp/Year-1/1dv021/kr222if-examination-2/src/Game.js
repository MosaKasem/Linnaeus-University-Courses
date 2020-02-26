'use strict'
/**
 * @module src/kortspel
 * @author Mosa Kasem Rasol
 * @version 1.1.1
 */

const Dealer = require('./Dealer.js')
const PlayerClass = require('./Player.js')
const Deck = require('./Deck.js')

// created a shuffled deckofcards and toss it around.

let deck = new Deck()
let dealer = new Dealer()
let deckofKards = dealer.shuffle(deck.card())
/**
 * @class CardGame
 * @param {object[]} -all the used cards
 * @param {object[]} -all players
 * @param deck - contains 52 cards
 */
class CardGame {
  constructor () {
    this.players = []
    this.allTheUsedCards = []
    this.deck = deckofKards
  }
  /**
   * player play till satisfied and controls that there are enough cards.
   * @param {Object Player} player
   * @memberof CardGame
   */
  PlayerPlays (player) {
    if (this.deck.length <= 1) {
      this.deck.push(...this.allTheUsedCards)
      this.allTheUsedCards = []
      dealer.shuffle(this.deck)
    }
  }
  /**
   * @memberof CardGame
   * Dealer plays until satisfied
   * Dealer checks if deck's are empty.
   */
  DealerPlays () {
    while (dealer.isNotSatisfied()) {
      if (this.deck.length <= 1) {
        this.deck.push(...this.allTheUsedCards)
        this.allTheUsedCards = []
      }
      dealer.givecard(this.deck)
    }
    console.log(`Dealer ${dealer.toString()}`)
    this.collectCards(dealer.hand)
    dealer.emptyHand()
  }
  collectCards (hand) {
    this.allTheUsedCards.push(...hand)
  }
  playerCreater (playersAmount = 1) {
    for (let i = 0; i < playersAmount; i++) {
      let player = new PlayerClass(i)
      this.players.push(player)
    }
  }
  /**
   * @memberof CardGame
   */
  gameStart () {
    for (let i = 0; i < this.players.length; i++) {
      this.players[i].RecieveNewCard(this.deck)
      this.PlayerPlays()
      while (this.players[i].PlayerNotSatisfied()) {
        this.players[i].RecieveNewCard(this.deck)
        this.PlayerPlays()

        if (this.players[i].sum >= 22) {
          console.log(`player ${this.players[i]} Busted! \nDealer Wins!  \n`) // if dealer gets over 21, loses
        } else if (this.players[i].sum) {
          continue
        }
      }
      if (this.players[i].sum <= 21) {
        console.log(`player ${this.players[i].toString()}`)
      }
      if (this.players[i].sum === 21) {
        console.log('Player wins! \n') // if player gets 21, wins
      }
      if (this.players[i].sum < 21) {
        this.DealerPlays()
        if (dealer.result === 21) { // if dealer gets 21, wins
          console.log('Dealer Wins! \n')
        } else if (dealer.result > 21) { // if dealer over 21, player wins
          console.log('Player wins! \n')
        } else if (this.players[i].sum > dealer.result) { // if player gets higher than dealer, wins
          console.log('Player wins! \n')
        } else if (dealer.result > this.players[i].sum) { // if dealer gets higher than player, wins
          console.log('Dealer wins \n')
        } else if (this.players[i].sum > dealer.result) { // if player gets higher than dealer, wins
          console.log('Player wins! \n')
        } else if (this.players[i].sum === dealer.result) { // if dealer and player gets same result, dealer wins
          console.log(`Dealer wins! \n`)
        } else if (this.players[i].sum > dealer.result) { // if player gets higher than dealer, wins
          console.log('Player wins! \n')
        }
      }
      this.collectCards(this.players[i].hand)
      this.players[i].emptyHand()
    }
  }
}

module.exports = CardGame

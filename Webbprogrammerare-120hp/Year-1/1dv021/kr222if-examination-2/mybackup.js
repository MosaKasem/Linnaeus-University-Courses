calcScore: function () {
    let score = 0
    for (let i = 0; i < this.playerHand.length; i++) {
      score += this.playerHand[i].value
    }
    this.sum = score
  }
  /* //
const Dealer = require('./Dealer.js')
const Player = require('./Player.js')

let dealer = new Dealer()
let shuffled = dealer.shuffle(this.deckOfCards)
console.log(shuffled)

let player = Player.RecieveNewCard()
console.log(player.sum)
console.log(player.hand)
console.log(player.RecieveNewCard)
while (player.isNotSatisfied()) {
    let pushedCard = dealer.givecard()
    player.RecieveNewCard(card)
}
console.log(deckOfCards)
let shuffle = Dealer.shuffle()
console.log(shuffle)
*/
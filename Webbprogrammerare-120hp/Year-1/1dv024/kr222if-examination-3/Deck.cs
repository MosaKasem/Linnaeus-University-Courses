using System.Linq;
using System.Collections;
using System;
using System.Collections.Generic;

namespace kr222if_examination_3
{
    public class Deck
    {
        // Declare list
        private List<Card> cards;
        private List<Card> discard = new List<Card>();

        /// <summary>
        /// assigning values from 1 to 13 for each suit
        /// Implementation of Deck can be found here:
        /// https://stackoverflow.com/questions/33028678/creating-a-simple-deck-of-cards-c-sharp
        /// </summary>
        public Deck()
        {
            {
                cards =
                    new[] { "♠", "♥", "♣", "♦", }
                        .SelectMany(
                            suit => Enumerable.Range(1, 13),
                            (suit, rank) => new Card(rank, suit))
                        .ToList();
            }
            // Shuffle it
            Shuffle();
        }
        /// <summary>
        /// Shuffle the cards
        /// Shuffle was from a repo in github, I forgot to store the URL to that repo
        /// </summary>
        private void Shuffle()
        {
            Random rnd = new Random();

            for (int i = 0; i < 754; i++)
            {
                int index = rnd.Next() % cards.Count;
                Card c = cards.ElementAt(index);
                cards.RemoveAt(index);
                cards.Add(c);
            }
        }
        /// <summary>
        /// GiveCard gives card and but first checks if there are any cards left in the deck
        /// </summary>
        /// <param name="person"> the player thats going to receive the card </param>
        public void GiveCard(Hand person)
        {
            if (cards.Count() == 1)
            {
                System.Console.WriteLine("\nRefilling deck\n");
                cards = Refill(cards);
            }
            person.ReceiveCard(cards.Last());

            cards.RemoveAt(cards.Count() - 1);
        }
   

        public void DiscardedCards(Hand player, Hand dealer)
        {
            discard.AddRange(player.Cards);
            discard.AddRange(dealer.Cards);
        }


        public List<Card> Refill(List<Card> cards)
        {
            cards.AddRange(discard);
            discard.Clear();
            Shuffle();
            return cards;
        }
    }
}
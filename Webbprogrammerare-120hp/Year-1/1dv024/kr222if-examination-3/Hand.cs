using System;
using System.IO;
using System.Linq;
using System.Collections;
using System.Collections.Generic;

namespace kr222if_examination_3
{
    public class Hand
    {
        /// <summary>
        /// _cards holds all the cards
        /// </summary>
        private readonly List<Card> _cards;
        /// <summary>
        /// Hand constructor
        /// </summary>
        public Hand() 
        {
            _cards = new List<Card>();
        }
        /// <summary>
        /// gets the cards the player/dealer is holding in hand
        /// </summary>
        public List<Card> Cards { get { return _cards; }}

        /// <summary>
        /// takes the received card and adds it to the list _cards
        /// </summary>
        /// <param name="card"> the card that is received from deck </param>
        public void ReceiveCard(Card card) 
        {
            _cards.Add(card);
        }
        /// <summary>
        /// Empty the hands
        /// </summary>
        public void Clean() 
        {
            _cards.Clear();
        }
        /// <summary>
        /// counts all the cards but also check for aces
        /// </summary>
        /// <returns> Point </returns>
        public int CountScore()
        {
            var point = _cards.Select(x => x.Point()).Sum();
            if (point + 13 > 21) return point;
            if (HasAce()) point += 13;
            return point;
        }

        public bool IsBust() => CountScore() > 21;
        private bool HasAce() => _cards.Any(x => x.IsAce());
        /// <summary>
        /// The current cards that player/dealer holds is joined in a string
        /// </summary>
        /// <returns> string join the cards </returns>
        public string ShowCards()
        {
            return string.Join(" ", _cards.Select(x => x.ToString()));
        }

    }
}
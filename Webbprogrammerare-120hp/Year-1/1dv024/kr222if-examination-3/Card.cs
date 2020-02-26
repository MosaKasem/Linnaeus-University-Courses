using System;

namespace kr222if_examination_3
{
    public class Card
    {
        private int rank;
        private string suit;
        /// <summary>
        /// Constructor, create the cards
        /// </summary>
        /// <param name="rank"> sets the rank for the card </param>
        /// <param name="suit"> sets the suit for the card</param>
        public Card(int rank, string suit)
        : base()
        {
            this.rank = rank;
            this.suit = suit;
        }
        /// <summary>
        /// to access the rank of the card
        /// </summary>
        /// <returns> the rank </returns>
        public int Point() => this.rank;
        /// <summary>
        /// ace is equals 1
        /// </summary>
        /// <returns> </returns>
        public bool IsAce() => this.rank == 1;
        /// <summary>
        /// This is to show or reveal the cards
        /// </summary>
        /// <returns> the suit and the rank </returns>
        public override string ToString() => this.suit + this.rank;

    }

}
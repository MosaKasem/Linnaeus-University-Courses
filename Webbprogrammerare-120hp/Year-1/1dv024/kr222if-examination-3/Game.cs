using System;
using System.Collections;
using System.Collections.Generic;


/// <summary>
/// <author> Mosa Kasem Rasol </author>
/// <version> 1.0.3 </version>
/// </summary>

namespace kr222if_examination_3
{
    public class Game
    {
        /// <summary>
        /// Private players, deck and dealer
        /// These members are not visible outside the class
        /// </summary>
        private readonly List<Player> players;
        private readonly Deck deck;
        private readonly Dealer dealer;
        /// <summary>
        /// Game constructor, deck, player and dealer maker
        /// </summary>
        /// <param name="allPlayer">amount of players</param>
        public Game(int allPlayer)
        {
            dealer = new Dealer();
            deck = new Deck();
            players = new List<Player>();


            for (int i = 0; i < allPlayer; i++)
            {
                players.Add(new Player("player " + i));
            }

        }
        /// <summary>
        /// Game initiater
        /// </summary>
        public void LetsPlay()
        {
            BeginGame();
        }
        /// <summary>
        /// Game Logic
        /// </summary>
        private void BeginGame()
        {
            /// <summary> first eachplayer receives a card </summary>
            foreach (var player in players)
            {
                deck.GiveCard(player);
            }
            /// <summary> PlayerPlays until he is satisfied </summary>
            foreach (var player in players)
            {
                PlayerPlays(player);
                if (player.CountScore() >= 22)
                {
                    Console.WriteLine($"{player.ToString()} Busted \n{dealer.ToString()} Dealer Wins\n");
                    ClearHands(player, dealer);
                }
                else
                {
                    DealerPlays(player);
                    if (dealer.CountScore() > 21)
                    {
                        Console.WriteLine($"{player.ToString()} Wins \n{dealer.ToString()} BUSTED!\n");
                        ClearHands(player, dealer);
                    }  else if (dealer.CountScore() < player.CountScore()) {
                        Console.WriteLine($"{player.ToString()} Wins \n{dealer.ToString()} \n");
                        ClearHands(player, dealer);
                    }  else if (dealer.CountScore() == player.CountScore()) { 
                        Console.WriteLine($"{player.ToString()} \n{dealer.ToString()} Wins \n");
                        ClearHands(player, dealer);
                    }  else if (dealer.CountScore() > player.CountScore()) {
                        Console.WriteLine($"{player.ToString()} \n{dealer.ToString()} Wins\n");
                        ClearHands(player, dealer);
                    }
                }
            }
        }
        /// <summary>
        /// Player receives new card until he is satisfied
        /// </summary>
        /// <param name="player"></param>
        private void PlayerPlays(Player player)
        {
            while(!player.IsSatisfied())
            {
                deck.GiveCard(player);
            }
        }
        /// <summary>
        /// Dealer receives new card until he scores higher than player
        /// </summary>
        /// <param name="player"></param>
        private void DealerPlays(Player player)
        {
            while(!dealer.IsSatisfied() && dealer.CountScore() < player.CountScore())
            {
                deck.GiveCard(dealer);
            }
        }
        /// <summary>
        /// Clear hands of player and dealer
        /// </summary>
        /// <param name="player"> current player </param>
        /// <param name="dealer"> the dealer </param>
                private void ClearHands(Player player, Dealer dealer)
                {
                    deck.DiscardedCards(player, dealer);
                    dealer.Clean();
                    player.Clean();
                }
            }
        }
using System.Linq;
using System.Collections;
using System;
using System.Collections.Generic;

/// <summary>
/// <author> Mosa Kasem Rasol </author>
/// <version> 1.0.3 </version>
/// </summary>

namespace kr222if_examination_3
{
    class Program
    {
        private static readonly Random randomer = new Random();
        static void Main(string[] args)
        {
            int playersAmount = randomer.Next(5, 10);
            Game BlackJack = new Game(playersAmount);
            BlackJack.LetsPlay();
        }
    }
}

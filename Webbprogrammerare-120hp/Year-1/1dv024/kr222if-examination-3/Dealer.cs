using System;
using System.IO;
using System.Linq;
using System.Collections;
using System.Collections.Generic;
namespace kr222if_examination_3
{
    public class Dealer : PlayerBase
    {
        /// <summary>
        /// Constructor, creates a dealer type
        /// </summary>
        /// <param name="name"> the name of the dealer/house is Dealer </param>
        public Dealer(string name = "Dealer") 
        :base(name) 
        {

        }
    }
}
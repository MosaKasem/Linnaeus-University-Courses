using System;
using System.IO;
using System.Linq;
using System.Collections;
using System.Collections.Generic;

namespace kr222if_examination_3
{
    public class PlayerBase : Hand
    {

        protected string _pName;
        public PlayerBase(string name)
        {
            _pName = name;
        }
        /// <summary>
        /// players satisfaction level
        /// </summary>
        /// <returns> returns false if score lesser than 17 </returns>
        public bool IsSatisfied()
        {
            return (CountScore() > 17);
        }
        /// <summary>
        /// summary of the player
        /// </summary>
        /// <returns> the players name, cards and score </returns>
        public override string ToString() => $"{_pName} : {ShowCards()} ({CountScore()})";
    }

}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace myTestFolder
{
    class Die
    {
        private static readonly Random _randomSeed = new Random();
        private int _faceValue;
        private Random _random;


        public Die()
        {
            _random = new Random(_randomSeed.Next());
            Throw();
        }
        public int FaceValue
        {
            get { return _faceValue; }
            set
            {
                if (value < 1 || value > 1000)
                {
                    throw new ArgumentOutOfRangeException("Exceeded Limit");
                }
                _faceValue = value;
            }
        }
        public int Throw()
        {
            _faceValue = _random.Next(1, 6);
            return _faceValue;
        }
    }
}
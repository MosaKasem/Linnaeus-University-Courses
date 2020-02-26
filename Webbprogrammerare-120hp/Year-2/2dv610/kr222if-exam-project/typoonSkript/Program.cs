using System;
using System.Text;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using static System.Console;

namespace Domain
{
    class Program
    {
        static void Main(string[] args)
        {
            var w = new ConsoleWrapper();
            var v = new CalculatorView(w);
            var c = new Calculator(w , v);
            var i = new Input(w);
            App app = new App(c, v, i);
            try
            {
                while (app.application()) ;
            }
            catch (Exception Ex)
            {
                throw new Exception(Ex.Message);
            }
        }
    }
}

using System;
using System.Text;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
// using static System.Console;
namespace Domain
{
    public class App
    {
        private Calculator c;
        private CalculatorView v;
        private Input i;
        
        public App(Calculator c, CalculatorView v, Input i)
        {
            this.c = c;
            this.v = v;
            this.i = i;
        }
        Operation operation = Operation.Null;
        public bool application()
        {
            bool UserInput = false; // False
            while (!UserInput)
            {
                try
                {
                    // fråga hur testar man mock verify på calculatorview
                    var firstValue = this.v.ReturnValue("--Enter Value--");
                    var seconValue = this.v.ReturnValue("--Enter Second Value--");
                    Console.WriteLine("--Choose operator ( + )( - )( * )( / )");
                    Operation op  = this.v.GetInput();
                    this.c.SimpleCalculator(firstValue, seconValue, op);
                    UserInput = this.i.Exit();
                }
                catch (Exception Ex)
                {
                    Console.ForegroundColor = ConsoleColor.Red;
                    Console.WriteLine("----------------------------------------");
                    Console.WriteLine(Ex.Message);
                    Console.WriteLine("----------------------------------------");
                    Console.ResetColor();
                }
            }
            return false;
        }
    }

}

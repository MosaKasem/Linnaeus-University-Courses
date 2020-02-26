using System;
using System.Text;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace Domain
{
    public class CalculatorView : ConsoleWrapper
    {
        private IConsole _console;
        public CalculatorView(IConsole input)
        {
            this._console = input;
        }
        public Operation GetInput()
        {
            string x = this._console.ReadLine();
            switch (x.ToCharArray()[0])
            {
                case '+':
                    return Operation.plus;
                case '-':
                    return Operation.minus;
               case '*':
                    return Operation.multiply;
                case '/':
                    return Operation.divide;
                default:
                    return Operation.Null;
            } 
        }
        public virtual void PresentResult(double presentValue)
        {
            Console.WriteLine(presentValue);
        }
        public double ReturnValue(string Question)
        {
            this._console.WriteLine(Question);
            return UserInput(this._console.ReadLine());
        }

        public virtual double UserInput(string input)
        {
            if (!double.TryParse(input, out double convertedNumber)) throw new ArgumentException("Must be a numeric value");
            return convertedNumber;
        }
    }
}
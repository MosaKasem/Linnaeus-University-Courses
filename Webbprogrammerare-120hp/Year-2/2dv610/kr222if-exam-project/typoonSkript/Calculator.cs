using System;

namespace Domain
{
    /*     public interface IValue
        {
            bool IsEligable(Operation op);
        } */
    public class Calculator : ConsoleWrapper
    {
        CalculatorView cView;
        private IConsole _console;
        public Calculator(IConsole console, CalculatorView cView)
        {
            this._console = console;
            this.cView = cView;
        }
        public bool IsEligable(Operation op)
        {
            // TODO: 1 test left
            // Undecided whether I have use for this (yet)
            if (op == Operation.plus || op == Operation.minus || op == Operation.divide || op == Operation.multiply)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        public virtual void SimpleCalculator(double x, double y, Operation o)
        {
            // Gick inte att testa.
            double result;
            switch (o)
            {
                case Operation.plus:
                    result = Add(x, y);
                    this.cView.PresentResult(result);
                    break;
                case Operation.minus:
                    result = Subtract(x, y);
                    this.cView.PresentResult(result);
                    break;
                case Operation.multiply:
                    result = Multiply(x, y);
                    this.cView.PresentResult(result);
                    break;
                case Operation.divide:
                    result = Divide(x, y);
                    this.cView.PresentResult(result);
                    break;
                case Operation.Null:
                    throw new ArgumentException("Invalid Operation");    
            }
        }
        public virtual double Add(double x, double y)
        {
            return x + y;
        }
        public virtual double Subtract(double x, double y)
        {
            return x - y;
        }
        public virtual double Multiply(double x, double y)
        {
            return x * y;
        }
        public virtual double Divide(double x, double y)
        {
            if (y != 0)
            {
                return x / y;
            }
            else
            {
                return 0;
            }
        }
    }

}

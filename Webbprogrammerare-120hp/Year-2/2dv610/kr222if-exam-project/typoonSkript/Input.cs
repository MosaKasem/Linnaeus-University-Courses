using System;

namespace Domain
{
    public class Input : ConsoleWrapper
    {
        private IConsole input;
        public Input(IConsole msg)
        {
            this.input = msg;
        }
        public virtual bool Exit()
        {
            Console.WriteLine("---------------Q to Quit----------------");
            Console.WriteLine("---------------Else Enter---------------");
            string input = this.input.ReadLine();
            if (input == "Q") return true;
            return false;
        }
    }
}
using System;
using System.Text;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
namespace Domain
{

    public interface IConsole
    {
        string ReadLine();
        void WriteLine(string msg);
    }
    public class ConsoleWrapper : IConsole
    {
        public virtual string ReadLine()
        {
            return Console.ReadLine();
        }
        
        public virtual void WriteLine(string msg)
        {
            Console.WriteLine(msg);
        }
    }
}
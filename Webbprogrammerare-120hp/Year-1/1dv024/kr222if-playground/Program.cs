using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace myTestFolder
{
    class Program
    {
        static void Main(string[] args)
        {
            // int i = 1;
            // int j = 1;
            // for (i = 1; 1 <= 5; i++)
            // {
            //     if (i % 2 == 0)
            //     {
            //         j = i;
            //     }
            //     System.Console.WriteLine($"{j} and {i}");
            // }
            // int oi = 8;
            // // var ten = 10;
            // // ten += 10;
            // // ten = ++oi;

            // int okie = 25;
            // okie = ++oi;
            // next challenge

            // int k = 0;
            // int j = ++k;
            // int l = k++;
            // int result = (j + k);












            /// <keepThis> </keepThis>
            Die mydie = new Die();
            for (int i = 0; i < 100; i++)
            {
                int value = mydie.Throw();
            Console.WriteLine(value);
            }
            Console.WriteLine(mydie.FaceValue);
        }
    }
}

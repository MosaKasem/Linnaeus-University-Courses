using System;

namespace exercise_fundamental_one_dimentional_array
{
    class Program
    {
        static void Main(string[] args)
        {
            // make array
            int[] interger = {10, 23, 5, 1, 15};
            // loop through array
            foreach (int value in interger)
            {
                Console.WriteLine($"{value, 5} in the Array");
            }
            // choose index 2 in the array multiply it by 2
            interger[1] *= 2;
            interger[4] *= 2;
            for (int i = 0; i < interger.Length; i++)
            {
                Console.WriteLine($"{interger[i]}");
            }
        }
    }
}

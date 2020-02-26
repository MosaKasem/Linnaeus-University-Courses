using System;

namespace exercise_product_of_integers
{
    class Program
    {
        static void Main(string[] args)
        {
                int product = 1;

            for (int i = 1; i <= 20; i++)
            {
                product *= i;
            }

            // Display the result.
            Console.WriteLine($"Produkten av alla heltal mellan 1 och 20 är {product}.");
        }
    }
}

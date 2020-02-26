using System;

namespace exercise_cool_temperature_converter
{
    class Program
    {
        static void Main(string[] args)
        {
            ConvertToCelcius();
        }
        private static void ConvertToCelcius()
        {
            double fahrenheit;
            double celsius;
            Console.BackgroundColor =  ConsoleColor.Red;
            Console.ForegroundColor = ConsoleColor.White;
            Console.Write("What's the fahrenheit temperature you want to convert?: ");
            Console.ResetColor();
            fahrenheit = double.Parse(Console.ReadLine());

            celsius = (fahrenheit - 32) * 5 / 9;
            Console.WriteLine($"Temperature{fahrenheit} F is {celsius} C");
        }
    }
}

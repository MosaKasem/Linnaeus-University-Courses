using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;



namespace kr222if_examination_2
{
    class Program
    {
        static void Main(string[] args)
        {
            Three3Dor2D();
        }
        static Random randomer = new Random();
        private static void Three3Dor2D()
        {
            // Console.Clear();
            Console.BackgroundColor = ConsoleColor.DarkGreen;
            Console.ForegroundColor = ConsoleColor.White;
            Console.WriteLine("===============================================");
            Console.WriteLine("=                                             =");
            Console.WriteLine("=             Hur Många Figurer och           =");
            Console.WriteLine("=             2D eller 3D?                    =");
            Console.WriteLine("=                                             =");
            Console.WriteLine("===============================================");
            Console.BackgroundColor = ConsoleColor.Black;
            Console.WriteLine("\n=====================================");
            Console.Write("\n Hur Många figurer?");
            // int userInputHowMany = Convert.ToInt32(Console.ReadLine());
            Console.Write("\n 2D eller 3D?");
            // string theShapeType = Console.ReadLine().ToUpper();
            string theShapeType = "3D";
            int userInputHowMany = 5;
            if (theShapeType == "2D")
            {
                System.Console.WriteLine("COMRADE we're in 2D");
                createAllTheShapes(userInputHowMany, false);
            }
            if (theShapeType == "3D")
            {
                System.Console.WriteLine("COMRADE we're in 3D");
                createAllTheShapes(userInputHowMany, true);
            }
            Console.ResetColor();
        }

        static void createAllTheShapes(int howMany, bool is3D)
        {
            double Lenght = 4 * 5 * randomer.NextDouble();
            double Height = 2 * 4 * randomer.NextDouble();
            double Width = 2 * 6 * randomer.NextDouble();
            // if 3D use this array
            if (is3D == true)
            {
                Shape3D[] array3D = new Shape3D[] { new Cuboid(Lenght, Width, Height), new Sphere(Height), new Cylinder(Lenght, Width, Height) };
                // List<Shape3D> array3D = new List<Shape3D> { new Cuboid(Lenght, Width, Height), new Sphere(Height), new Cylinder(Lenght, Width, Height) };
                System.Console.WriteLine(array3D);
                for (int start = 0; start < howMany; start++)
                {
                    foreach (var item in array3D)
                    {
                        Console.WriteLine(item.ToString());
                        // for (int a = 0; a < 2; a++)
                        // {
                        //     System.Console.WriteLine(item);
                        // }
                    }
                }
            }
        }
    }
}

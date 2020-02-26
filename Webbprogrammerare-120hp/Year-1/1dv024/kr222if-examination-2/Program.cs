using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

/// <summary>
/// <author> Mosa Kasem Rasol </author>
/// <version> 1.0.2 </version>
/// </summary>

namespace kr222if_examination_2
{
    class Program
    {
        static void Main(string[] args)
        {
            // User Choice Menu
            Three3Dor2D();
        }
        /// <summary>
        /// instantiate/Declare Random Object
        /// </summary>
        private static readonly Random randomer = new Random();
        /// <summary>
        /// 
        /// </summary>
        private static void Three3Dor2D()
        {

            Console.BackgroundColor = ConsoleColor.DarkGreen;
            Console.ForegroundColor = ConsoleColor.White;
            Console.WriteLine("===============================================");
            Console.WriteLine("=                                             =");
            Console.WriteLine("=                                             =");
            Console.WriteLine("=             2D eller 3D?                    =");
            Console.WriteLine("=                                             =");
            Console.WriteLine("=            ctrl c to exit                   =");
            Console.WriteLine("===============================================");
            Console.BackgroundColor = ConsoleColor.Black;
            Console.WriteLine("\n=====================================");
            Console.Write("\n 2D eller 3D? ");
            string theShapeType;
            while (true)
            {
                theShapeType = Console.ReadLine().ToUpper();
                try
                {

                    if (theShapeType != "2D" && theShapeType != "3D")
                    {
                        throw new ApplicationException();
                    }
                    Console.WriteLine("You Picked:" + theShapeType);
                }
                catch (Exception)
                {
                    Console.BackgroundColor = ConsoleColor.Red;
                    Console.ForegroundColor = ConsoleColor.White;
                    Console.WriteLine("\nFEL! Only 3D or 2D.\n");
                    Console.ResetColor();
                }
                int numShapes = randomer.Next(3, 11);
                int numOfShapes = numShapes;
                // int numOfShapes = 12;
                if (theShapeType == "2D")
                {
                    createAllTheShapes(numOfShapes, false);
                    break;
                }
                if (theShapeType == "3D")
                {
                    createAllTheShapes(numOfShapes, true);
                    break;
                }
                Console.ResetColor();
            }
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="howMany">This generates how many shapes are going to be created in the process</param>
        /// <param name="is3D">False gives us 2D, True gives us 3D</param>
        static void createAllTheShapes(int howMany, bool is3D)
        {
            /// <If2D>Cuboid, Cylinder and Sphere by random choice</if2D>
            if (is3D == true)
            {
                List<Shape3D> shapes3D = new List<Shape3D>();
                Shape3D shape3D;
                for (int i = 0; i < howMany; i++)
                {
                    switch (randomer.Next(0, 3))
                    {
                        case 0:
                            shape3D = new Cuboid(randomer.Next(5, 100), randomer.Next(5, 100), randomer.Next(5, 100));
                            shapes3D.Add(shape3D);
                            break;
                        case 1:
                            shape3D = new Cylinder(randomer.Next(5, 100), randomer.Next(5, 100), randomer.Next(5, 100));
                            shapes3D.Add(shape3D);
                            break;
                        case 2:
                            shape3D = new Sphere(randomer.Next(5, 100));
                            shapes3D.Add(shape3D);
                            break;
                    }
                }
                /// <summary>
                /// For Array = Sort by shapetype in order
                /// For List = Sort by shapetype and volume
                /// </summary>
                /// For the Array
                ///<alternative!>GetType</alternative>
                /// shapes3D.OrderBy( x => x.GetType().Name).ThenByDescending(x => x.Volume).ToArray();
                ///<alternative!>CompareTo</alternative>
                // Array.Sort(shapes, (x, y) => x.shapeType.CompareTo(y.shapeType));
                ///<alternative!>another alternative</alternative>
                // shapes3D.OrderBy(o=>o.shapeType).ThenBy (o => o.Volume).ToList();

                List<Shape3D> Shape3DSorted = new List<Shape3D>(shapes3D.OrderBy(sz => sz.shapeType.ToString())
               .ThenBy(sx => sx.Volume)
               .ToArray());

                // Note To Self // Store Linq In Variable

                foreach (var shape in Shape3DSorted)
                {
                    Console.WriteLine(shape);
                }
            }
            /// <If2D> Ellipse and Rectangle by randomers choice </if2D>
            if (is3D == false)
            {
                Shape2D[] sortedShapes;
                Shape2D[] shape2D = new Shape2D[howMany];

                for (int i = 0; i < howMany; i++)
                {
                    switch (randomer.Next(0, 2))
                    {
                        case 0:
                            shape2D[i] = new Rectangle(randomer.Next(5, 100), randomer.Next(5, 100));
                            break;
                        case 1:
                            shape2D[i] = new Ellipse(randomer.Next(5, 100), randomer.Next(5, 100));
                            break;
                    }
                }
                /// <summary>
                /// Sort by name and then by area
                /// </summary>

                sortedShapes = shape2D.OrderBy(x => x.shapeType).ThenBy(y => y.Area).ToArray();

                /// <Extra> In Case Cast Is Required </Extra>
                // shape2D.Cast<Shape2D>().OrderBy(ls => ls.GetType().Name);

                foreach (var shape in sortedShapes)
                {
                    Console.WriteLine(shape);
                }
            }
        }
    }
}

using System;

namespace kr222if_examination_2
{
    class Ellipse : Shape2D
    {
         /// <summary>
        /// Constructor. Creates a new Ellipse shape.
        /// </summary>
        /// <param name="hDiameter"> area of a circle of radius R
        public Ellipse(double hDiameter, double vDiameter)
        : base(ShapeType.Ellipse, hDiameter, vDiameter)
        {
            // Empty
        }
        /// <summary>
        /// Overrides the Shape2D Perimeter
        /// Counts the perimeter of the ellipse
        /// </summary>
        public override double Parimeter
        {
            get
            {
                double a = Length;
                double b = Width;
                return Math.PI * (3 * (a + b) - Math.Sqrt((3 * a + b) * (a + 3 * b)));
            }
        }
        /// <summary>
        /// Overrides the Shape2D Area
        /// Counts the area of the ellipse
        /// </summary>
        public override double Area
        {
            get
            {
                double r1 = Length / 2;
                double r2 = Width / 2;
                return Math.PI * r1 * r2;
            }
        }
    }
}
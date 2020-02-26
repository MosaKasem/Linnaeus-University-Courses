using System;

namespace kr222if_examination_2
{
    class Rectangle : Shape2D
    {
        public Rectangle(double width, double length)
        : base(ShapeType.Rectangle, width, length)
        {
            // ToString();
        }
        /// <summary>
        /// Overrides the Shape2D Perimeter
        /// Counts the perimeter of the rectangle
        /// </summary>
        public override double Parimeter { get { return 2 * (Length + Width); } }
        /// <summary>
        /// Overrides the Shape2D Area
        /// Counts the area of the rectangle
        /// </summary>
        public override double Area { get { return Length * Width; } }
    }
}
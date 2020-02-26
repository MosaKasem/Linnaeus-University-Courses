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
        public override double Parimeter { get { return 2 * (Length + Width); } }
        public override double Area { get { return Length * Width; } }
        // public Rectangle(double length, double width)
        // :base(length, width)
        // {
        //     ToString(length * width);
        // }

        // private void ToString(double v)
        // {
        //     throw new NotImplementedException();
        // }
    }
}
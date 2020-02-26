using System;

namespace kr222if_examination_2
{
    class Ellipse : Shape2D
    {
        public Ellipse(double diameter)
        : base(ShapeType.Ellipse, diameter, diameter)
        {
            // Empty
        }
        public Ellipse(double hDiameter, double vDiameter)
        : base(ShapeType.Ellipse, hDiameter, vDiameter)
        {
            // Empty
        }
        public override double Parimeter
        {
            get
            {
                double a = Length;
                double b = Width;
                return Math.PI * (3 * (a + b) - Math.Sqrt((3 * a + b) * (a + 3 * b)));
            }
        }
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
namespace kr222if_examination_2
{
    class Cuboid : Shape3D
    {
        // public override double MantelArea
        // {
        //     get { return _baseShape.Parimeter * Height; }
        // }
        // public override double TotalSurfaceArea
        // {
        //     get
        //     {
        //         return MantelArea + 2 * _baseShape.Area;
        //     }
        // }
        public Cuboid(double length, double width, double height)
        : base(ShapeType.Cuboid, new Ellipse(length, width), height)
        {
            // Empty
        }
    }
}
namespace kr222if_examination_2
{
    class Cuboid : Shape3D
    {
        /// <summary>
        /// Constructor. Creates a new cuboid shape.
        /// </summary>
        /// <param name="length">Length of the cuboid</param>
        /// <param name="width">Width of the cuboid</param>
        /// <param name="height">Height of the cuboid</param>
        public Cuboid(double length, double width, double height)
        : base(ShapeType.Cuboid, new Rectangle(length, width), height)
        {
            // Empty
        }
    }
}
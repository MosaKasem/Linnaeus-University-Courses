namespace kr222if_examination_2
{
    class Cylinder : Shape3D
    {
        /// <summary>
        /// Constructor. Creates a new cylinder shape.
        /// </summary>
        /// <param name="hdiameter">The horizontal radius of the cylinder</param>
        /// <param name="vdiameter">The vertical radius of the cylinder</param>
        /// <param name="height">The height of the cylinder</param>
        public Cylinder(double hdiameter, double vdiamter, double height)
        :base(ShapeType.Cylinder, new Ellipse(hdiameter, vdiamter), height)
        {
            // Empty
        }
    }
}
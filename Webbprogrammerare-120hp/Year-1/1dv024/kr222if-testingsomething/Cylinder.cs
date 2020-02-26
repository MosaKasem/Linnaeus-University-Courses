namespace kr222if_examination_2
{
    class Cylinder : Shape3D
    {
        public Cylinder(double hdiameter, double vdiamter, double height)
        :base(ShapeType.Cylinder, new Rectangle(hdiameter, vdiamter), height)
        {
            // Empty
        }
    }
}
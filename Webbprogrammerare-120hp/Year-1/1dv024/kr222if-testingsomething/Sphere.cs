namespace kr222if_examination_2
{
    class Sphere : Shape3D
    {
        public double Diameter
        {
            get { return Length; }
            set { Length = Height = Width = value; }
        }
        public override double MantelArea
        {
            get
            {
                return this._baseShape.Area * 4;
            }
        }
        public override double TotalSurfaceArea
        {
            get
            {
                return this._baseShape.Area * 4;
            }
        }
        public override double Volume
        {
            get { return ((4 / 3) * this._baseShape.Area * 4); }
        }
        public Sphere(double diameter)
        : base(ShapeType.Sphere, new Ellipse(diameter), diameter)
        {

        }
    }
}
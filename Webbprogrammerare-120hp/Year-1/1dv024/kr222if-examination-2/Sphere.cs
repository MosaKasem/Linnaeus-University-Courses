namespace kr222if_examination_2
{
    class Sphere : Shape3D
    {
        /// <summary>
        /// Counts the diameter of the sphere.
        /// </summary>
        public double Diameter
        {
            get { return Length; }
            set { Length = Height = Width = value; }
        }
        /// <summary>
        /// Overrides the Shape3D MantelArea
        /// Counts the mantel area of the sphere
        /// </summary>
        public override double MantelArea
        {
            get
            {
                return this._baseShape.Area * 4;
            }
        }
        /// <summary>
        /// Overrides the Shape3D TotalSurfaceArea
        /// Counts the total surface area of the sphere
        /// </summary>
        public override double TotalSurfaceArea
        {
            get
            {
                return this._baseShape.Area * 4;
            }
        }
        /// <summary>
        /// Overrides the Shape3D Volume
        /// Counts the volume of the sphere
        /// </summary>
        public override double Volume
        {
            get { return ((4 / 3) * this._baseShape.Area * 4); }
        }

        /// <summary>
        /// Constructors to create sphere.
        /// </summary>
        /// <param name="diameter">radius of sphere</param>
        public Sphere(double diameter)
        : base(ShapeType.Sphere, baseShape: new Ellipse(diameter, diameter), height: diameter)
        {
            // Empty
        }
    }
}
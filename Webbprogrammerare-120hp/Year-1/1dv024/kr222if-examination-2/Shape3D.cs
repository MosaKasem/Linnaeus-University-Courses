using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace kr222if_examination_2
{
    abstract class Shape3D : Shape
    {
        protected Shape2D _baseShape;
        private double _heigth;
        /// <summary>
        /// Holds the height of the shape
        /// Get: Get the height of the shape
        /// Set: Set the height of the shape
        /// </summary>
        public double Height
        {
            get { return _heigth; }
            set
            {
                if (value < 0)
                {
                    throw new ArgumentOutOfRangeException(nameof(value));
                }
                _heigth = value;
            }
        }
        /// <summary>
        /// Counts the mantelarea of the shape
        /// virtual, is allowed to be override by other classes.
        /// </summary>
        public virtual double MantelArea { get { return this._baseShape.Parimeter * this.Height; } }
        /// <summary>
        /// Counts the total surface of the shape
        /// </summary>
        public virtual double TotalSurfaceArea { get { return this.MantelArea + 2 * this._baseShape.Area; } }

        public double Width
        {
            get { return _baseShape.Width; }
            set { _baseShape.Width = value; }
        }
        /// <summary>
        /// Counts the Volume of the shape
        /// virtual, is allowed to be override by other classes.
        /// </summary>
        public virtual double Volume { get { return this._baseShape.Area * this.Height; } }
        public double Length
        {
            get { return _baseShape.Length; }
            set { _baseShape.Length = value; }
        }
        /// <summary>
        /// Constructor. Creates 3D shapes.
        /// </summary>
        /// <param name="shapeType">Type of shape to be created</param>
        /// <param name="baseShape">The 2D shape to base the 3D shape on</param>
        /// <param name="height">The height of the shape</param>
        protected Shape3D(ShapeType shapeType, Shape2D baseShape, double height)
        : base(shapeType)
        {
            _baseShape = baseShape;
            Height = height;
        }
        public override string ToString()
        {
            return ToString("G");
        }
        public string ToString(string format)
        {
            if (format == "G" || format == null || format == "")
            {
                return $"Figur:{this.shapeType}:\n Length {_baseShape.Length:f1}\n  Width {_baseShape.Width:f1}\n   Parimeter {this.MantelArea:f1}\n    Volume {this.Volume:f1}\n     TotalSurfaceArea {this.TotalSurfaceArea:f1}\n";
            }
            else if (format == "R")
            {
                // return this.ToString();
                return ($"{shapeType} Result Length: {_baseShape.Length} Width: {_baseShape.Width} Parimeter: {MantelArea} Volume: {Volume}");
            }
            else
            {
                throw new FormatException();
            }
        }
    }
}
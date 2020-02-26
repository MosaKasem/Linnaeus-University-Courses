using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace kr222if_examination_2
{
    abstract class Shape2D : Shape
    {
        /// <summary> Private Values </summary>
        private double _length;
        private double _width;
        /// <summary>
        /// Holds the length of the shape
        /// Get: Read the length of the shape
        /// Set: Set the length of the shape, and also control the data
        /// </summary>
        public double Length
        {
            get { return _length; }
            set
            {
                if (value < 0)
                {
                    throw new ArgumentOutOfRangeException();
                }
                _length = value;
            }
        }
        /// <summary>
        /// Holds the width of the shape
        /// Get: Get the width of the shape
        /// Set: Set the width of the shape
        /// </summary>
        public double Width
        {
            get { return _width; }
            set
            {
                if (value < 0)
                {
                    throw new ArgumentOutOfRangeException();
                }
                _width = value;
            }
        }
        /// /// <summary>
        /// Counts the area of the shape
        /// Abstract, is meant to be overrided by other classes.
        /// </summary>
        public abstract double Area { get; }
        public abstract double Parimeter { get; }

        /// <summary>
        /// Constructor. Creates 2D shapes.
        /// </summary>
        /// <param name="shapeType">Type of shape to create</param>
        /// <param name="length">Length of the shape</param>
        /// <param name="width">Width of the shape</param>
        protected Shape2D(ShapeType ShapeType, double length, double width)
        : base(ShapeType)
        {
            Length = length;
            Width = width;
        }
        /// <summary>
        /// Returns a string of the shapes values.
        /// Overrides the ToString method in Shape.
        /// </summary>
        public string ToString(string format)
        {
            if (format == "G" || format == null || format == "")
            {
                return $"Figur:{this.shapeType}\n Length:{this.Length:f1}\n  Width:{this.Width:f1}\n   Parimeter:{this.Parimeter:f1}\n    Area:{this.Area:f1} \n";
            }
            else if (format == "R")
            {
                return ($"{shapeType} Result Length: {Length} Width: {Width} Parimeter: {Parimeter} Area: {Area}");
                // return this.ToString();
            }
            else
            {
                throw new FormatException();
            }
        }
        /// <summary>
        /// Overrides the default ToString method.
        /// </summary>
        public override string ToString()
        {
            return ToString("G");
        }
    }
}

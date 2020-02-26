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
        // public double Parimeter { get { return 2 * (Length + Width);} }
        // public double Area { get { return Length * Width; } }
        /// <summary> Abstract Field </summary>
        public abstract double Area { get; }
        public abstract double Parimeter { get; }

        /// <constructor>
        protected Shape2D(ShapeType ShapeType, double length, double width)
        : base(ShapeType)
        {
            Length = length;
            Width = width;
        }

        public string ToString(string format)
        {
            if (format == "G" || format == null || format == "")
            {
                return $"Figur: {this.shapeType}\n Length {this.Length}\nWidth {this.Width}\nParimeter {this.Parimeter}\nArea {this.Area}";
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
        public override string ToString()
        {
            return ToString("G");
        }
    }
}

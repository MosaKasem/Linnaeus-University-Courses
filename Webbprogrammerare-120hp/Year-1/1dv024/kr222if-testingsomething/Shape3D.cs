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
        public virtual double MantelArea { get { return this._baseShape.Parimeter * this.Height; } }
        public virtual double TotalSurfaceArea{ get { return this.MantelArea + 2 * this._baseShape.Area; } }
        public double Width { get; set; }
        public virtual double Volume { get { return this._baseShape.Area * this.Height; } }
        public double Length { get; set; }
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
                return $"Figur: {this.shapeType}:\n Length {this.Length}\nWidth {this.Width}\nParimeter {this.MantelArea}\nArea {this.Volume}";
            }
            else if (format == "R")
            {
                // return this.ToString();
                return ($"{shapeType} Result Length: {Length} Width: {Width} Parimeter: {MantelArea} Area: {Volume}");                
            } 
            else 
            {
                throw new FormatException();
            }
        }
    }
}
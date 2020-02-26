using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace kr222if_examination_2
{
    abstract class Shape
    {
        public ShapeType shapeType
        {
            get;
            private set;
        }
        /// <summary>
        /// Shape Constructor.
        /// </summary>
        /// <param name="shapetype"></param>
        protected Shape(ShapeType shapetype)
        {
            this.shapeType = shapetype;
        }

        /*
        // Shorter Syntax
                public bool IsShape3D
        {
            get
            {
                if (shapeType == ShapeType.Cylinder || shapeType == ShapeType.Sphere || shapeType == ShapeType.Cuboid)
                {
                    return true;
                }
                return false;
            }             
        }
         */
        public bool is3D
        {
            get
            {
                if (shapeType == ShapeType.Cuboid)
                {
                    return true;
                }
                if (shapeType == ShapeType.Cylinder)
                {
                    return true;
                }
                if (shapeType == ShapeType.Sphere)
                {
                    return true;
                }
                if (shapeType == ShapeType.Rectangle)
                {
                    return false;
                }
                if (shapeType == ShapeType.Ellipse)
                {
                    return false;
                }
                else
                {
                    return false;
                }
            }
        }
        /// <summary>
        /// ShapeType can have the following values:
        /// Rectangle
        /// Circle
        /// Ellipse
        /// Cuboid
        /// Cylinder
        /// Sphere
        /// </summary>
        public enum ShapeType
        {
            Rectangle,
            Ellipse,
            Cuboid,
            Cylinder,
            Sphere
        }
        /// <summary>
        /// Returns a string of the shapes values.
        /// Abstract, is meant to be overrided by other classes.
        /// </summary>
        public override abstract string ToString();
    }
}

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
        public bool is3D
        {
            get
            {
                if (shapeType == ShapeType.Cuboid)
                {
                    Console.WriteLine("Cuboid Selected");
                    return true;
                }
                if (shapeType == ShapeType.Cylinder)
                {
                    Console.WriteLine("Cylinder Selected");
                    return true;
                }
                if (shapeType == ShapeType.Sphere)
                {
                    Console.WriteLine("Sphere Selected");
                    return true;
                }
                if (shapeType == ShapeType.Rectangle)
                {
                    Console.WriteLine("Rectangle Selected");
                    return false;
                }
                if (shapeType == ShapeType.Ellipse)
                {
                    Console.WriteLine("Ellipse Selected");
                    return false;
                }
                else
                {
                    return false;
                }
            }
        }
        // public abstract string ToString(string format);
        public enum ShapeType
        {
            Rectangle,
            Ellipse,
            Cuboid,
            Cylinder,
            Sphere,
            Indefinite
        }
        public override abstract string ToString();
        // public shapetype 
        // public class EnumType
        // {
        //     public void Method(ShapeType enumtype)
        //     {
        //         if (enumtype == ShapeType.Rectangle)
        //         {

        //         }

        //     }
        // }
    }
}

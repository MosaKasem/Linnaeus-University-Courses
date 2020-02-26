
using System;
using System.IO;
using Newtonsoft.Json;
using System.Linq;
using System.Collections;
using System.Collections.Generic;

/// <summary>
/// <author> Mosa Kasem Rasol </author>
/// <version> 1.0.1 </version>
/// </summary>

namespace kr222if_examination_1
{
    class Program
    {
        // signaturen för en metod är namnet på parameter.
        // man kan ha flera metoder med samma namn så länge det har olika paramterar.
        static void Main(String[] args)
        {
            try
            {
                int[] json;
                using (var reader = File.OpenText(args[0]))
                {
                    var serilazier = new JsonSerializer();
                    json = (int[])serilazier.Deserialize(reader, typeof(int[]));
                } // här stängs filen.

                var result = Statistics.DescriptiveStatistics(json);
                showResult(result);

            }
            catch (System.Exception e) // catch the errors
            {
                Console.WriteLine($"(Error Message: ,{e})"); // log the error
            }
        }
        static public void showResult(dynamic data)
        {

            Console.WriteLine($"Max {data.max}");
            Console.WriteLine($"Min {data.min}");
            Console.WriteLine($"Median {data.median}");
            Console.WriteLine($"Mean {data.mean:0.#}");
            // Console.WriteLine($"Mode {}");
            Console.WriteLine("Mode {0}", string.Join(" ", data.mode));
            Console.WriteLine($"Variation {data.variation}");
            Console.WriteLine($"Standard {data.stadard:0.#}");
        }

    }
}

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
    public class CheckError
    {
        /// <summary>
        /// Throw error if it's null or empty.
        /// </summary>
        /// <param name="numbers"></param>
        public static void checkError(int[] numbers)
        {
            if (numbers == null)
            {
                throw new ArgumentException("null null");
            }
            if (numbers.Length == 0)
            {
                throw new InvalidOperationException("empty");
            }
        }
    }
}
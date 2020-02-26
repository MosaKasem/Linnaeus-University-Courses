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
    public static class Statistics
    {

        /// <summary>
        /// calls everyfunction but returns a dynamic value
        /// </summary>
        /// <param name="numbers"></param>
        /// <returns>Dynamic value</returns>
        public static dynamic DescriptiveStatistics(int[] numbers)
        {
            return new
            {
                max = Maximum(numbers),
                min = Minimum(numbers),
                mean = Mean(numbers),
                variation = Range(numbers),
                stadard = StandardDeviation(numbers),
                mode = Mode(numbers),
                median = Median(numbers)
            };
        }
        /// <summary>
        /// Find the maximum number in the array
        /// </summary>
        /// <param name="numbers"></param>
        /// <returns>numbers</returns>
        public static int Maximum(params int[] numbers)
        {
            CheckError.checkError(numbers);
            return numbers.Max();
        }

        /// <summary>
        /// Find the mean number in the array.
        /// </summary>
        /// <param name="numbers"></param>
        /// <returns>theResult</returns>
        public static double Mean(params int[] numbers)
        {
            CheckError.checkError(numbers);
            // add up all the numbers, then divide by how many numbers there are.
            int[] sliced = numbers; // Not necessary but keeping it as a reference.
            double result = 0;
            for (int loop = 0; loop < numbers.Length; loop++)
            {
                result += sliced[loop];
            }
            double theResult = (double)result / numbers.Length;
            return theResult;
        }


        /// <summary>
        /// The median is the "middle" of a sorted list of numbers from a to z as an example, so from 0 to 100, 50 is the middle
        /// </summary>
        /// <param name="sourceNumbers"></param>
        /// <returns>(a + b) / 2</returns>
        public static double Median(int[] sourceNumbers)
        {
            CheckError.checkError(sourceNumbers);
            int[] sortedNumb = (int[])sourceNumbers.Clone();
            Array.Sort(sortedNumb);
            // sortedNumb.OrderBy(n => n);
            int size = sortedNumb.Length;
            // double a;
            // double b;
            int mid = size / 2; // divide by two // funkade inte för räkningen under.
            double median = (size % 2 != 0) ? sortedNumb[mid] : ((sortedNumb[mid - 1]) + (sortedNumb[mid])) / 2; // funkade inte, vad har jag missat?
            return median;
            /// <Alternative> Another way to writing the IF statement </Alternative>
            // // if (size % 2 == 0)
            // {
            //     a = sortedNumb[size / 2 - 1];
            //     b = sortedNumb[size / 2];
            // }
            // else
            // {
            //     return sortedNumb[size / 2];
            // }
            // return (a + b) / 2;
        }


        /// <summary>
        /// Find the minium number in the array
        /// </summary>
        /// <param name="numbers"></param>
        /// <returns>numbers</returns>
        public static int Minimum(params int[] numbers)
        {
            CheckError.checkError(numbers);
            return numbers.Min(); // get minimum number
        }


        /// <summary>
        /// The mode is the number that is repeated more often than any other
        /// </summary>
        /// <param name="numbers"></param>
        /// <returns></returns>
        public static int[] Mode(int[] numbers)
        {
            CheckError.checkError(numbers);
            Dictionary<int, int> counts = new Dictionary<int, int>(); // The object.
            double result = 0;
            double max = 0;

            foreach (int a in numbers)
            {
                if (counts.ContainsKey(a)) // if number doesn't have a key, create key for it.
                    counts[a] = counts[a] + 1;
                else
                    counts[a] = 1;
                foreach (int key in counts.Keys) // find the most occured number.
                {
                    if (counts[key] > max)
                    {
                        max = counts[key];
                        result = key; // the more occurred occurrences, store it to use it for later.
                    }
                }
                // counts.OrderBy(x => x.Value); // is "ToDictionary" also required?
                counts = counts.OrderByDescending(x => x.Value).ToDictionary(x => x.Key, x => x.Value); // sort from most occured to least occured.
                // counts.GroupBy(x => x.Value).Where(x => x.Count() > 1); // GroupBy, keeping it for testing.
            }
            List<int> optionList = new List<int>();
            foreach (KeyValuePair<int, int> keypair in counts)
            {

                if (keypair.Value >= max)
                {

                    optionList.Add(keypair.Key);
                }
            }
            // var JoinedValues = optionList.Aggregate((a, b) => a + b); // plus every value in the array.
            return optionList.ToArray();
        }


        /// <summary>
        /// find the maximum number in the array, minus the minimum number in the array.
        /// Variation width is the simplest measure of spread
        /// </summary>
        /// <param name="numbers"></param>
        /// <returns>result</returns>
        public static int Range(int[] numbers)
        {
            CheckError.checkError(numbers);

            int maaaaax = numbers.Max();
            int miiiiin = numbers.Min();

            int result = maaaaax - miiiiin;
            return result;
        }


        /// <summary>
        /// Standard deviation:
        /// a quantity expressing by how much the members of a group differ from the mean value for the group
        /// </summary>
        /// <param name="numbers"></param>
        /// <returns>result / copyNumbers.Length</returns>
        public static double StandardDeviation(int[] numbers)
        {
            CheckError.checkError(numbers);
            double meanumB = Mean(numbers); // get mean value
            int[] copyNumbers = (int[])numbers.Clone(); // not sure if necessary to clone.
            double result = 0;
            for (int i = 0; i < copyNumbers.Length; i++)
            {
                result += Math.Pow(copyNumbers[i] - meanumB, 2); // for every number (minus the mean value) raised to two, add to result.
            }
            return Math.Sqrt(result / copyNumbers.Length); // square root of result with the of the numbers of array, to get the standarddeviation.
        }

        /// <summary>an alternative to making the dictionary, keeping this as a reference for future projects</summary>
        /*
              var frequency = numbers.GroupBy(x => x).ToDictionary(x => x.Key, x => x.Count());
                foreach (KeyValuePair<int, int> keypair in  frequency)
                {
                    Console.WriteLine(keypair.Key);
                    Console.WriteLine(keypair.Value);
                }
         */




    }
}
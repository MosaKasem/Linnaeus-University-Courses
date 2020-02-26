/**
 * Module for obtaining descriptive information about a set of data.
 *
 * @author Mosa Kasem Rasol.
 * @version 1.1.0
 */

'use strict'

/**
 * Returns the descriptive information (maximum, mean, median, minimum,
 * mode, range and standard deviation) from a set of numbers.
 *
 * @param {number[]} numbers The set of data to be analyzed.
 * @throws {TypeError} The passed argument is not an array.
 * @throws {Error} The passed array contains no elements.
 * @throws {TypeError} The passed array contains not just numbers.
 * @returns {{maximum: number, mean: number, median: number, minimum: number, mode: number[], range: number, standardDeviation: number}}
 */
function descriptiveStatistics (numbers) {
  return {
    maximum: maxNumber(numbers),
    minimum: miniNumber(numbers),
    mean: meanNumber(numbers),
    median: medianNumber(numbers),
    mode: modeNumber(numbers),
    range: rangeNumber(numbers),
    standardDeviation: standardDeviationNumbers(numbers)
  }
  /**
 * @param {number[]} numbers The set of data to be analyzed.
 * @throws {TypeError} The passed argument is not an array.
 * @throws {Error} The passed array contains no elements.
 * @throws {TypeError} The passed array contains not just numbers.
 * @returns {{maximum: number}} returns max number in the object/array
 */
}
function maxNumber (numbers) {
  checkErrors(numbers) // calling function checkErrors for numbers
  let copynumbers = numbers.slice() // make a copy of the reference
  return Math.max(...copynumbers) // ... gör något, typ plattar ut värderna so att man kan ha tillgång till dom, för annars tar den alla värderna inom arrayen.
}
  /**
 * @param {number[]} numbers The set of data to be analyzed.
 * @throws {TypeError} The passed argument is not an array.
 * @throws {Error} The passed array contains no elements.
 * @throws {TypeError} The passed array contains not just numbers.
 * @returns {{mini: number}} return minium number
 */
function miniNumber (numbers) {
  checkErrors(numbers)
  let copynumbers = numbers.slice()
  return Math.min(...copynumbers)
}
  /**
 * @param {number[]} numbers The set of data to be analyzed.
 * @throws {TypeError} The passed argument is not an array.
 * @throws {Error} The passed array contains no elements.
 * @throws {TypeError} The passed array contains not just numbers.
 * @returns {{mean: number}} return the average of the numbers.
 */
function meanNumber (numbers) {
  checkErrors(numbers)
  let copynumbers = numbers.slice()
  let result = 0 // variable result to store our total value
  for (let i = 0; i < copynumbers.length; i++) { // we loop through our copy of numbers to store it's length.
    result += copynumbers[i] // we plus all the values here into result (the ones we looped through) example: 23, 40, 60
  } // result is the total value
  return result / copynumbers.length // we return here the total amount, 23 and divide with the length. in this case, the amont of numbers in the array, so it divides 23 / 5 (23 is the total value, 5 the amount of values)
}
  /**
 * @param {number[]} numbers The set of data to be analyzed.
 * @throws {TypeError} The passed argument is not an array.
 * @throws {Error} The passed array contains no elements.
 * @throws {TypeError} The passed array contains not just numbers.
 * @returns {{median: number}} return the value separating the higher half of the numbers, i.e. middle value
 */
function medianNumber (numbers) {
  checkErrors(numbers)
  let copynumbers = numbers.slice() // make copy to reference
  copynumbers.sort(function (a, b) { return a - b }) // the a - b, to put it simply, it's like 20-100, it gets back a negative number, it knows 20 is less than 100
  let half = Math.floor(copynumbers.length / 2) // we want the interger, we do so by using math.floor, we divide the length of the amount of numbers there are in the array and divide it by two
  if (copynumbers.length % 2) { // if the length, or the amount of numbers are even, then return the value divided by two, (the variable half)
    return copynumbers[half]
  } else { // if it's not, execute the bottom. take the two middle values and divide by 2
    return (copynumbers[half - 1] + copynumbers[half]) / 2 // i cant remember what - 1 does.
  }
}
  /**
 * @param {number[]} numbers The set of data to be analyzed.
 * @throws {TypeError} The passed argument is not an array.
 * @throws {Error} The passed array contains no elements.
 * @throws {TypeError} The passed array contains not just numbers.
 * @returns {{mode: number}} returns the most occured number and how many times it reoccured.
 */
function modeNumber (numbers) {
  checkErrors(numbers)

  let copyNumbers = numbers.slice()
  let frequncyTable = {} // empty object
  let maxFrequency = 0 // we use this to store value or highest value in this case
  for (let number of copyNumbers) { // go through index
    if (frequncyTable[number]) { // if number already exists in frequency table then it adds 1
      frequncyTable[number]++
    } else { // if number doesnt exist, adds the key with value 1
      frequncyTable[number] = 1
    }
    if (frequncyTable[number] > maxFrequency) { // Gets the higest occurances and stores it in maxFrequency
      maxFrequency = frequncyTable[number] // we apply the max or more occured number or possibly numbers, store it inside number with table keys.
    }
  }
  let mostFrequentNumbers = Object.keys(frequncyTable).filter(function (w) {
    return frequncyTable[w] === maxFrequency // in Object.keys we get the property names or "keys" from Table and we filter it using function, to get keys that has the value that has most occurences
  })
  let conversion = mostFrequentNumbers.map(n => parseFloat(n)).sort(function (a, b) { // arrow function. This "=>" means function, n is every number, so map goes through most the given "index" and convert each one it goes through
    return a - b
  })
  return conversion
}
  /* This concerns me, as a reminder.
  // [1, 2, 3, 2, 4, 3]
  1. Count how many times each number occurs in the array numbers.
  {
    "1": 1,
    "2": 2,
    "3": 2,
    "4": 1
  }

  // 2. Find the maximum value in the created object
  => 2

  // 3. Create an array with the keys where value === maximum value
  => [2, 3]
} */
  /**
 * @param {number[]} numbers The set of data to be analyzed.
 * @throws {TypeError} The passed argument is not an array.
 * @throws {Error} The passed array contains no elements.
 * @throws {TypeError} The passed array contains not just numbers.
 * @returns {{range: number}} return the difference between the lowest and highest value
 */
function rangeNumber (numbers) {
  checkErrors(numbers)
  return Math.max(...numbers) - Math.min(...numbers) // highest number minus the lowest number.
}
  /**
 * @param {number[]} numbers The set of data to be analyzed.
 * @throws {TypeError} The passed argument is not an array.
 * @throws {Error} The passed array contains no elements.
 * @throws {TypeError} The passed array contains not just numbers.
 * @returns {{standardDeviation: numbers / number's length}} return the measure of how spread out the numbers are.
 */
function standardDeviationNumbers (numbers) {
  checkErrors(numbers)
  let mean = meanNumber(numbers) // call the meanNumber function, store the value inside the variable named mean.
  let copynumbers = numbers.slice()
  let result = 0
  for (let i = 0; i < copynumbers.length; i++) {
    result += Math.pow(copynumbers[i] - mean, 2) // only the value from copynumbers minus mean value raised to two gets stored into result.
  }
  return Math.sqrt(result / copynumbers.length) // square root of result divided by the length.
}
  /**
 * @param {number[]} numbers The set of data to be analyzed.
 * @throws {TypeError} The passed argument is not an array.
 * @throws {Error} The passed array contains no elements.
 * @throws {TypeError} The passed array contains not just numbers.
 * @returns {{checkErrors: error message}} execute the functions and throws the error that is suitable for it.
 */
let checkErrors = function (numbers) {
  if (!Array.isArray(numbers)) { // if !Array.IsNotArray(numbers) throw exception, Passed argument.... !Array = NotArray
    throw TypeError('The passed argument is not an array.')
  }

  numbers.forEach(function (number) { // we want to check every in the array, we use forEach method, to do that
    if (typeof number !== 'number') { // (first array) check typeof (and the second and so on)
      throw TypeError('The passed array contains not just numbers.')
    }
    // do something with the array
  })
  // alternative option to check if numbers === number
  /*
  for (let i = 0; i < numbers.length; i++) {
    if (typeof numbers[i] !== 'number') {
      throw TypeError('The passed array contains not just numbers.')
    }
  }
  */
  if (numbers.length === 0) {
    throw Error('The passed array contains no elements.')
  }
}
// Exports
exports.descriptiveStatistics = descriptiveStatistics
exports.maximum = maxNumber
exports.mean = meanNumber
exports.median = medianNumber
exports.minimum = miniNumber
exports.mode = modeNumber
exports.range = rangeNumber
exports.standardDeviation = standardDeviationNumbers
// new

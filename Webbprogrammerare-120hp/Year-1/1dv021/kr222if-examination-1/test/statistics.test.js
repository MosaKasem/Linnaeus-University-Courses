/**
 * Tests for the statistics module.
 *
 * @author Mats Loock
 * @version 1.1.0
 */

'use strict'

const statistics = require('../src/statistics')
const expect = require('chai').expect

// ------------------------------------------------------------------ maximum
describe('maximum', () => {
  // exceptions
  it(`maximum(null) should throw TypeError with the custom message 'The passed argument is not an array.'`, done => {
    expect(() => {
      statistics.maximum(null)
    }).to.throw(TypeError).and
    .to.have.property('message', 'The passed argument is not an array.')
    done()
  })

  it(`maximum([]) should throw Error with the custom message 'The passed array contains no elements.'`, done => {
    expect(() => {
      statistics.maximum([])
    }).to.throw(Error).and
    .to.have.property('message', 'The passed array contains no elements.')
    done()
  })

  it(`maximum([1, 2, 3, '4']) should throw TypeError with the custom message 'The passed array contains not just numbers.'`, done => {
    expect(() => {
      statistics.maximum([1, 2, 3, '4'])
    }).to.throw(TypeError).and
    .to.have.property('message', 'The passed array contains not just numbers.')
    done()
  })

  // no effect on the argument
  it('maximum([4, 2, 6, 1, 3, 7, 5, 3]) should return a number and not modify the argument', done => {
    let arg = [4, 2, 6, 1, 3, 7, 5, 3]
    let res = statistics.maximum(arg)
    expect(res).to.be.an('number')
    expect(arg).to.eql([4, 2, 6, 1, 3, 7, 5, 3])
    done()
  })

  // return value
  it('maximum([-2, 5, 1, 1, 5, 5, 2, -2, 2, -2]) should return 5}', done => {
    expect(statistics.maximum([-2, 5, 1, 1, 5, 5, 2, -2, 2, -2])).to.eql(5)
    done()
  })

  it('maximum([-42, -84, -2, -3]) should return -2}', done => {
    expect(statistics.maximum([-42, -84, -2, -3])).to.eql(-2)
    done()
  })
})

// ------------------------------------------------------------------ mean
describe('mean', () => {
  // exceptions
  it(`mean(null) should throw TypeError with the custom message 'The passed argument is not an array.'`, done => {
    expect(() => {
      statistics.mean(null)
    }).to.throw(TypeError).and
    .to.have.property('message', 'The passed argument is not an array.')
    done()
  })

  it(`mean([]) should throw Error with the custom message 'The passed array contains no elements.'`, done => {
    expect(() => {
      statistics.mean([])
    }).to.throw(Error).and
    .to.have.property('message', 'The passed array contains no elements.')
    done()
  })

  it(`mean([1, 2, 3, '4']) should throw TypeError with the custom message 'The passed array contains not just numbers.'`, done => {
    expect(() => {
      statistics.mean([1, 2, 3, '4'])
    }).to.throw(TypeError).and
    .to.have.property('message', 'The passed array contains not just numbers.')
    done()
  })

  // no effect on the argument
  it('mean([4, 2, 6, 1, 3, 7, 5, 3]) should return a number and not modify the argument', done => {
    let arg = [4, 2, 6, 1, 3, 7, 5, 3]
    let res = statistics.mean(arg)
    expect(res).to.be.an('number')
    expect(arg).to.eql([4, 2, 6, 1, 3, 7, 5, 3])
    done()
  })

  // return value
  it('mean([-2, 5, 1, 1, 5, 5, 2, -2, 2, -2]) should return 1.5}', done => {
    expect(statistics.mean([-2, 5, 1, 1, 5, 5, 2, -2, 2, -2])).to.eql(1.5)
    done()
  })

  it('mean([-42, -84, -2, -3]) should return -32.75}', done => {
    expect(statistics.mean([-42, -84, -2, -3])).to.eql(-32.75)
    done()
  })
})

// ------------------------------------------------------------------ median
describe('median', () => {
  // exceptions
  it(`median(null) should throw TypeError with the custom message 'The passed argument is not an array.'`, done => {
    expect(() => {
      statistics.median(null)
    }).to.throw(TypeError).and
    .to.have.property('message', 'The passed argument is not an array.')
    done()
  })

  it(`median([]) should throw Error with the custom message 'The passed array contains no elements.'`, done => {
    expect(() => {
      statistics.median([])
    }).to.throw(Error).and
    .to.have.property('message', 'The passed array contains no elements.')
    done()
  })

  it(`median([1, 2, 3, '4']) should throw TypeError with the custom message 'The passed array contains not just numbers.'`, done => {
    expect(() => {
      statistics.median([1, 2, 3, '4'])
    }).to.throw(TypeError).and
    .to.have.property('message', 'The passed array contains not just numbers.')
    done()
  })

  // no effect on the argument
  it('median([4, 2, 6, 1, 3, 7, 5, 3]) should return a number and not modify the argument', done => {
    let arg = [4, 2, 6, 1, 3, 7, 5, 3]
    let res = statistics.median(arg)
    expect(res).to.be.an('number')
    expect(arg).to.eql([4, 2, 6, 1, 3, 7, 5, 3])
    done()
  })

  // return value
  it('median([4, 2, 6, 1, 3, 7, 5, 3]) should return 3.5}', done => {
    expect(statistics.median([4, 2, 6, 1, 3, 7, 5, 3])).to.eql(3.5)
    done()
  })

  it('median([4, 2, 6, -1, 3, 5, 3]) should return 3}', done => {
    expect(statistics.median([4, 2, 6, -1, 3, 5, 3])).to.eql(3)
    done()
  })
})

// ------------------------------------------------------------------ minimum
describe('minimum', () => {
  // exceptions
  it(`minimum(null) should throw TypeError with the custom message 'The passed argument is not an array.'`, done => {
    expect(() => {
      statistics.minimum(null)
    }).to.throw(TypeError).and
    .to.have.property('message', 'The passed argument is not an array.')
    done()
  })

  it(`minimum([]) should throw Error with the custom message 'The passed array contains no elements.'`, done => {
    expect(() => {
      statistics.minimum([])
    }).to.throw(Error).and
    .to.have.property('message', 'The passed array contains no elements.')
    done()
  })

  it(`minimum([1, 2, 3, '4']) should throw TypeError with the custom message 'The passed array contains not just numbers.'`, done => {
    expect(() => {
      statistics.minimum([1, 2, 3, '4'])
    }).to.throw(TypeError).and
    .to.have.property('message', 'The passed array contains not just numbers.')
    done()
  })

  // no effect on the argument
  it('minimum([4, 2, 6, 1, 3, 7, 5, 3]) should return a number and not modify the argument', done => {
    let arg = [4, 2, 6, 1, 3, 7, 5, 3]
    let res = statistics.minimum(arg)
    expect(res).to.be.an('number')
    expect(arg).to.eql([4, 2, 6, 1, 3, 7, 5, 3])
    done()
  })

  // return value
  it('minimum([2, 5, 1, 1, 5, 5, 2, 2, 2, 2]) should return 1}', done => {
    expect(statistics.minimum([2, 5, 1, 1, 5, 5, 2, 2, 2, 2])).to.eql(1)
    done()
  })

  it('minimum([-42, -84, -2, -3]) should return -84}', done => {
    expect(statistics.minimum([-42, -84, -2, -3])).to.eql(-84)
    done()
  })
})

// ------------------------------------------------------------------ mode
describe('mode', () => {
  // exceptions
  it(`mode(null) should throw TypeError with the custom message 'The passed argument is not an array.'`, done => {
    expect(() => {
      statistics.mode(null)
    }).to.throw(TypeError).and
    .to.have.property('message', 'The passed argument is not an array.')
    done()
  })

  it(`mode([]) should throw Error with the custom message 'The passed array contains no elements.'`, done => {
    expect(() => {
      statistics.mode([])
    }).to.throw(Error).and
    .to.have.property('message', 'The passed array contains no elements.')
    done()
  })

  it(`mode([1, 2, 3, '4']) should throw TypeError with the custom message 'The passed array contains not just numbers.'`, done => {
    expect(() => {
      statistics.mode([1, 2, 3, '4'])
    }).to.throw(TypeError).and
    .to.have.property('message', 'The passed array contains not just numbers.')
    done()
  })

  // no effect on the argument
  it('mode([4, 2, 6, 1, 3, 7, 5, 3]) should return an array and not modify the argument', done => {
    let arg = [4, 2, 6, 1, 3, 7, 5, 3]
    let res = statistics.mode(arg)
    expect(res).to.be.an('array')
    expect(arg).to.eql([4, 2, 6, 1, 3, 7, 5, 3])
    done()
  })

  // return value
  it('mode([-2, 5, 1, 1, 5, 5, 2, -2, 2, -2]) should return [-2, 5]', done => {
    expect(statistics.mode([-2, 5, 1, 1, 5, 5, 2, -2, 2, -2])).to.eql([-2, 5])
    done()
  })

  it('mode([5, 1, 1, 5, 5, 1]) should return [1, 5]', done => {
    expect(statistics.mode([5, 1, 1, 5, 5, 1])).to.eql([1, 5])
    done()
  })

  it('mode([5, 1, 5, 1, 5]) should return [5]', done => {
    expect(statistics.mode([5, 1, 5, 1, 5])).to.eql([5])
    done()
  })

  it('mode([5.3, 5.3, 1.9, 1.9, 5.3]) should return [5.3]', done => {
    expect(statistics.mode([5.3, 5.3, 1.9, 1.9, 5.3])).to.eql([5.3])
    done()
  })

  it('mode([3, 5, 2, -5, 9, 2, -5, 5, 10, 4, 1, 0, -1, 9, 0]) should return [-5, 0, 2, 5, 9]', done => {
    expect(statistics.mode([3, 5, 2, -5, 9, 2, -5, 5, 10, 4, 1, 0, -1, 9, 0])).to.eql([-5, 0, 2, 5, 9])
    done()
  })

  it('mode([42]) should return [42]', done => {
    expect(statistics.mode([42])).to.eql([42])
    done()
  })
})

// ------------------------------------------------------------------ range
describe('range', () => {
  // exceptions
  it(`range(null) should throw TypeError with the custom message 'The passed argument is not an array.'`, done => {
    expect(() => {
      statistics.range(null)
    }).to.throw(TypeError).and
    .to.have.property('message', 'The passed argument is not an array.')
    done()
  })

  it(`range([]) should throw Error with the custom message 'The passed array contains no elements.'`, done => {
    expect(() => {
      statistics.range([])
    }).to.throw(Error).and
    .to.have.property('message', 'The passed array contains no elements.')
    done()
  })

  it(`range([1, 2, 3, '4']) should throw TypeError with the custom message 'The passed array contains not just numbers.'`, done => {
    expect(() => {
      statistics.range([1, 2, 3, '4'])
    }).to.throw(TypeError).and
    .to.have.property('message', 'The passed array contains not just numbers.')
    done()
  })

  // no effect on the argument
  it('range([4, 2, 6, 1, 3, 7, 5, 3]) should return a number and not modify the argument', done => {
    let arg = [4, 2, 6, 1, 3, 7, 5, 3]
    let res = statistics.range(arg)
    expect(res).to.be.an('number')
    expect(arg).to.eql([4, 2, 6, 1, 3, 7, 5, 3])
    done()
  })

  // return value
  it('range([2, 5, 1, 1, 5, 5, 2, 2, -2, 2]) should return 7}', done => {
    expect(statistics.range([2, 5, 1, 1, 5, 5, 2, 2, -2, 2])).to.eql(7)
    done()
  })

  it('range([-42, -84, -2, -3]) should return 82}', done => {
    expect(statistics.range([-42, -84, -2, -3])).to.eql(82)
    done()
  })
})

// ------------------------------------------------------------------ standardDeviation
describe('standardDeviation', () => {
  // exceptions
  it(`standardDeviation(null) should throw TypeError with the custom message 'The passed argument is not an array.'`, done => {
    expect(() => {
      statistics.standardDeviation(null)
    }).to.throw(TypeError).and
    .to.have.property('message', 'The passed argument is not an array.')
    done()
  })

  it(`standardDeviation([]) should throw Error with the custom message 'The passed array contains no elements.'`, done => {
    expect(() => {
      statistics.standardDeviation([])
    }).to.throw(Error).and
    .to.have.property('message', 'The passed array contains no elements.')
    done()
  })

  it(`standardDeviation([1, 2, 3, '4']) should throw TypeError with the custom message 'The passed array contains not just numbers.'`, done => {
    expect(() => {
      statistics.standardDeviation([1, 2, 3, '4'])
    }).to.throw(TypeError).and
    .to.have.property('message', 'The passed array contains not just numbers.')
    done()
  })

  // no effect on the argument
  it('standardDeviation([4, 2, 6, 1, 3, 7, 5, 3]) should return a number and not modify the argument', done => {
    let arg = [4, 2, 6, 1, 3, 7, 5, 3]
    let res = statistics.standardDeviation(arg)
    expect(res).to.be.an('number')
    expect(arg).to.eql([4, 2, 6, 1, 3, 7, 5, 3])
    done()
  })

  // return value
  it('standardDeviation([1, 4, 3, 15, 72, 41, 30, 27, 72, 8, 42, 36, 33, 46, 44]) should return ~21.9}', done => {
    expect(statistics.standardDeviation([1, 4, 3, 15, 72, 41, 30, 27, 72, 8, 42, 36, 33, 46, 44]).toFixed(1)).to.eql('21.9')
    done()
  })

  it('standardDeviation([30, 31, 33, 34, 35, 34, 28, 34, 33, 34, 36, 35, 32, 31, 32]) should return ~2.1}', done => {
    expect(statistics.standardDeviation([30, 31, 33, 34, 35, 34, 28, 34, 33, 34, 36, 35, 32, 31, 32]).toFixed(1)).to.eql('2.1')
    done()
  })
})

// ------------------------------------------------------------------ descriptiveStatistics
describe('descriptiveStatistics', () => {
  // exceptions
  it(`descriptiveStatistics(null) should throw TypeError with the custom message 'The passed argument is not an array.'`, done => {
    expect(() => {
      statistics.descriptiveStatistics(null)
    }).to.throw(TypeError).and
    .to.have.property('message', 'The passed argument is not an array.')
    done()
  })

  it(`descriptiveStatistics([]) should throw Error with the custom message 'The passed array contains no elements.'`, done => {
    expect(() => {
      statistics.descriptiveStatistics([])
    }).to.throw(Error).and
    .to.have.property('message', 'The passed array contains no elements.')
    done()
  })

  it(`descriptiveStatistics([1, 2, 3, '4']) should throw TypeError with the custom message 'The passed array contains not just numbers.'`, done => {
    expect(() => {
      statistics.descriptiveStatistics([1, 2, 3, '4'])
    }).to.throw(TypeError).and
    .to.have.property('message', 'The passed array contains not just numbers.')
    done()
  })

  // no effect on the argument
  it('descriptiveStatistics([4, 2, 6, 1, 3, 7, 5, 3]) should return a number and not modify the argument', done => {
    let arg = [4, 2, 6, 1, 3, 7, 5, 3]
    let res = statistics.descriptiveStatistics(arg)
    expect(res).to.be.an('object').that.includes({maximum: 7})
    expect(arg).to.eql([4, 2, 6, 1, 3, 7, 5, 3])
    done()
  })

  // return value
  it('descriptiveStatistics([42]) should return {maximum: 42, mean: 42, median: 42, minimum: 42, mode: [42], range: 0, standardDeviation: 0}', done => {
    expect(statistics.descriptiveStatistics([42])).to.eql({
      maximum: 42,
      mean: 42,
      median: 42,
      minimum: 42,
      mode: [42],
      range: 0,
      standardDeviation: 0
    })
    done()
  })

  it('descriptiveStatistics([4, 2, 6, 1, 3, 7, 5, 3]) should return {max: 7, mean: 3.875, median: 3.5, min: 1, mode: [3], range: 6, standardDeviation: 1.899835519196333}', done => {
    expect(statistics.descriptiveStatistics([4, 2, 6, 1, 3, 7, 5, 3])).to.eql({
      maximum: 7,
      mean: 3.875,
      median: 3.5,
      minimum: 1,
      mode: [3],
      range: 6,
      standardDeviation: 1.899835519196333
    })
    done()
  })
})

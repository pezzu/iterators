/* eslint-env jest */

const Range = require('./Range')

describe('Support for iteration protocols', () => {
  it('Iterable: for...of', () => {
    const range = new Range(0, 3)
    let i = 0
    for (const v of range) {
      expect(v).toBe(i)
      i++
    }
  })

  it('Iterator: next()', () => {
    const range = new Range(0, 3)
    for (let i = 0; i < 3; i++) {
      const next = range.next()
      expect(next.value).toBe(i)
      expect(next.done).toBe(false)
    }
    const last = range.next()
    expect(last.value).toBeUndefined()
    expect(last.done).toBe(true)
  })

  it('Iterable: spread...', () => {
    const range = new Range(0, 3)
    expect([...range]).toEqual([0, 1, 2])
  })

  it('Not restartable', () => {
    const range = new Range(0, 5)
    range.next()
    range.next()
    expect([...range]).toEqual([2, 3, 4])
  })
})

describe('Build sequences', () => {
  it('Starts for beginnig, including', () => {
    const range = new Range(1, 5)
    expect(range.next().value).toBe(1)
  })

  it('Ends at the end, exluding', () => {
    const range = new Range(1, 5)
    let last
    let next = range.next()
    while (!next.done) {
      last = next.value
      next = range.next()
    }
    expect(last).toBe(4)
  })

  it('Creates proper number sequence in between', () => {
    const range = new Range(1, 5)
    expect([...range]).toEqual([1, 2, 3, 4])
  })

  it('Defaults beginnig to 0', () => {
    const range = new Range()
    expect(range.next().value).toBe(0)
  })

  it('Defaults end to Infinity', () => {
    const range = new Range()
    expect(range.end).toEqual(Infinity)
  })
})

const Bucket = require('./Bucket')

describe('Support for iteration protocols', () => {
  it('Iterable: for...of', () => {
    const source = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    const buckets = new Bucket(source, 2)
    let i = 0;
    for (let b of buckets) {
      expect(b).toEqual([i, i + 1])
      i+=2
    }
  })

  it('Iterator: next()', () => {
    const source = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    const buckets = new Bucket(source, 2)
    for (let i = 0; i < source.length; i += 2) {
      const next = buckets.next()
      expect(next.value).toEqual([i, i + 1])
      epxect(next.done).toBe(false)
    }
    const last = buckets.next()
    expect(last.value).toBeUndefined()
    expect(last.done).toBe(true)
  })

  it('Iterable: spread...', () => {
 
  })
})

describe('Create buckets out of array', () => {
  it('Crates buckets of provided size', () => {

  })

  it('Fills last bucket with left elements', () => {

  })

  it('Creates single bucket if bucketSize <= source.lenght', () => {

  })
})

describe('Treats edge cases with respect', () => {
  it('Returns iterator to original source it bucketSize is 0', () => {

  })

  it('Throws if bucketSize is undefined or not provided', () => {

  })
})


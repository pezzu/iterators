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
      expect(next.done).toBe(false)
    }
    const last = buckets.next()
    expect(last.value).toBeUndefined()
    expect(last.done).toBe(true)
  })

  it('Iterable: spread...', () => {
    const source = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    const buckets = new Bucket(source, 2)
    expect([...buckets]).toEqual([[0, 1], [2, 3], [4, 5], [6, 7], [8, 9]])
  })

  it('Not restartable', () => {
    const source = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    const buckets = new Bucket(source, 2)
    buckets.next()
    buckets.next()
    expect([...buckets]).toEqual([[4, 5], [6, 7], [8, 9]])
  })
})

describe('Create buckets out of array', () => {
  it('Crates buckets of provided size', () => {
    const source = [0, 1, 2, 3, 4, 5, 6, 7, 8]
    const buckets = new Bucket(source, 3)
    expect([...buckets]).toEqual([[0, 1, 2], [3, 4, 5], [6, 7, 8]])

  })

  it('Fills last bucket with left elements', () => {
    const source = [0, 1, 2, 3, 4, 5, 6]
    const buckets = new Bucket(source, 3)
    expect([...buckets]).toEqual([[0, 1, 2], [3, 4, 5], [6]])
  })

  it('Creates single bucket if size <= source.lenght', () => {
    const source = [0, 1, 2, 3, 4, 5, 6]
    const buckets = new Bucket(source, 10)
    expect([...buckets]).toEqual([[0, 1, 2, 3, 4, 5, 6]])
  })

  it('Respects size == 1', () => {
    const source = [0, 1, 2, 3, 4, 5]
    const buckets = new Bucket(source, 1)
    expect([...buckets]).toEqual([[0], [1], [2], [3], [4], [5]])
  })
})

describe('Treats edge cases with respect', () => {
  it('throws if size is 0', () => {
    expect(() => new Bucket([0, 1, 2, 3, 4, 5], 0)).toThrow(TypeError)
  })

  it('Throws if size is undefined or not provided', () => {
    expect(() => new Bucket([0, 1, 2, 3, 4, 5])).toThrow(TypeError)
  })

  it('Throws if size negative', () => {
    expect(() => new Bucket([0, 1, 2, 3, 4, 5], -2)).toThrow(TypeError)
  })
})

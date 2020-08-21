/* eslint-env jest */

const Chunk = require('./Chunk')

describe('Support for iteration protocols', () => {
  it('Iterable: for...of', () => {
    const source = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    const chunk = new Chunk(source, 2)
    let i = 0
    for (const b of chunk) {
      expect(b).toEqual([i, i + 1])
      i += 2
    }
  })

  it('Iterator: next()', () => {
    const source = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    const chunk = new Chunk(source, 2)
    for (let i = 0; i < source.length; i += 2) {
      const next = chunk.next()
      expect(next.value).toEqual([i, i + 1])
      expect(next.done).toBe(false)
    }
    const last = chunk.next()
    expect(last.value).toBeUndefined()
    expect(last.done).toBe(true)
  })

  it('Iterable: spread...', () => {
    const source = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    const chunk = new Chunk(source, 2)
    expect([...chunk]).toEqual([[0, 1], [2, 3], [4, 5], [6, 7], [8, 9]])
  })

  it('Not restartable', () => {
    const source = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    const chunk = new Chunk(source, 2)
    chunk.next()
    chunk.next()
    expect([...chunk]).toEqual([[4, 5], [6, 7], [8, 9]])
  })
})

describe('Create chunks out of array', () => {
  it('Crates chunks of provided size', () => {
    const source = [0, 1, 2, 3, 4, 5, 6, 7, 8]
    const chunk = new Chunk(source, 3)
    expect([...chunk]).toEqual([[0, 1, 2], [3, 4, 5], [6, 7, 8]])
  })

  it('Fills last bucket with left elements', () => {
    const source = [0, 1, 2, 3, 4, 5, 6]
    const chunk = new Chunk(source, 3)
    expect([...chunk]).toEqual([[0, 1, 2], [3, 4, 5], [6]])
  })

  it('Creates single bucket if size <= source.lenght', () => {
    const source = [0, 1, 2, 3, 4, 5, 6]
    const chunk = new Chunk(source, 10)
    expect([...chunk]).toEqual([[0, 1, 2, 3, 4, 5, 6]])
  })

  it('Respects size == 1', () => {
    const source = [0, 1, 2, 3, 4, 5]
    const chunk = new Chunk(source, 1)
    expect([...chunk]).toEqual([[0], [1], [2], [3], [4], [5]])
  })
})

describe('Treats edge cases with respect', () => {
  it('throws if size is 0', () => {
    expect(() => new Chunk([0, 1, 2, 3, 4, 5], 0)).toThrow(TypeError)
  })

  it('Throws if size is undefined or not provided', () => {
    expect(() => new Chunk([0, 1, 2, 3, 4, 5])).toThrow(TypeError)
  })

  it('Throws if size negative', () => {
    expect(() => new Chunk([0, 1, 2, 3, 4, 5], -2)).toThrow(TypeError)
  })
})

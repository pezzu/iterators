class Chunk {
  constructor (array, size) {
    if (typeof size === 'undefined' || size <= 0) {
      throw new TypeError('size parameter should be defined and greater than 0')
    }
    this.array = array
    this.size = size
    this.index = 0
  }

  next () {
    if (this.index < this.array.length) {
      const next = {
        value: this.array.slice(this.index, this.index + this.size),
        done: false
      }
      this.index += this.size
      return next
    } else {
      return { value: undefined, done: true }
    }
  }

  [Symbol.iterator] () {
    return this
  }
}

module.exports = Chunk

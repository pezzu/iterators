class Bucket {
  constructor(array, bucketSize) {
    if (typeof bucketSize === 'undefined' || bucketSize < 0) {
      throw new TypeError('bucketSize parameter should be defined and >=0')
    }
    this.array = array
    this.bucketSize = bucketSize
    this.index = 0
  }

  next() {
    if (this.index < this.array.length) {
      const next = {
        value: this.array.slice(this.index, this.index + this.bucketSize),
        done: false
      }
      this.index += this.bucketSize
      return next
    }
    else {
      return { value: undefined, done: true }
    }
  }

  [Symbol.iterator]() {
    return this;
  }
}

module.exports = Bucket
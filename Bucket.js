class Bucket {
  constructor(source, bucketSize = 1) {
    this.source = source
    this.bucketSize = bucketSize
    this.index = 0
    this.bucketNumber = 0
  }

  next() {
    
  }

  [Symbol.iterator]() {
    return this;
  }
}

module.exports = BucketIterator
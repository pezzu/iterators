class Range {
  constructor(begin = 0, end = Infinity) {
    this.begin = begin;
    this.end = end;
    this.index = begin;
  }

  next() {
    if (this.index < this.end) {
      return {value: this.index++, done: false}
    } else {
      return {done: true}
    }
  }

  [Symbol.iterator]() {
    return this;
    // return new Range(this.begin, this.end)
  }
}

module.exports = Range;
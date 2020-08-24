class Circle {
  constructor(source) {
    this.source = source
    this.index = 0
  }

  next() {
    if (this.index >= this.source.length) this.index = 0
    return { value: this.source[this.index++], done: false }
  }

  [Symbol.iterator] () {
    return this
  }
}
const Vertex = require('imperative-trie')

module.exports = class CacheVertex extends Vertex {
  constructor (op, vertex) {
    super({
      op: op,
      vertex: vertex
    })
  }

  /**
   * get a vertex given a path
   * @param {Array} path
   * @return {Vertex}
   */
  get (path) {
    path = path.slice(0)
    let result = this
    while (path.length && result && result.op !== 'del') {
      const edge = path.shift()
      result = result.edges.get(edge)
    }
    return result
  }

  get hasVertex () {
    return this.op === 'del' || this.vertex
  }

  get op () {
    return this.value.op
  }

  set op (op) {
    this.value.op = op
  }

  get vertex () {
    return this.value.vertex
  }

  set vertex (vertex) {
    this.value.vertex = vertex
  }

  set (path, vertex) {
    vertex._cache.op = 'set'
    super.set(path, vertex._cache)
  }

  del (path) {
    super.set(path, new CacheVertex('del'))
  }

  clear () {
    this.op = null
    this.edges = new Map()
  }
}

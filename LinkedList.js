class NodeLinkedList {
  constructor(value, next = null, prev = null) {
    this.prev = prev
    this.value = value
    this.next = next
  }
}

class LinkedList {
  #firstElement = null
  #lastElement = null
  #length = 0

  get firstElement() {
    return this.#firstElement?.value || null
  }

  get lastElement() {
    return this.#lastElement?.value || null
  }

  get length() {
    return this.#length
  }

  #getNode(position) {
    if (position >= 0 && position < this.length) {
      let i = this.#length - 1 
      if (position > (i / 2)) {
        let node = this.#lastElement
        while(i !== position) {
          node = node.prev
          i--
        }
        return node
      } else {
        let i = 0
        let node = this.#firstElement
        while(i !== position) {
          node = node.next
          i++
        }
        return node
      }
    }
    return undefined
  }

  show(position) {
    const node = this.#getNode(position)
    if (node) return node.value
    else return undefined
  }

  add(value) {
    if (this.#firstElement === null) {
      const node = new NodeLinkedList(value)
      this.#firstElement = node
      this.#lastElement = this.#firstElement
    } else {
      const node = new NodeLinkedList(value, null, this.#lastElement)
      this.#lastElement.next = node
      this.#lastElement = node
    }
    this.#length++

    return this
  }

  insertBefore(position, value) {
    const node = this.#getNode(position)
    if (node) {
      const newNode = new NodeLinkedList(value)
      newNode.prev = node.prev
      newNode.next = node
      newNode.next.prev = newNode
      if (newNode.prev) newNode.prev.next = newNode
      else this.#firstElement = newNode
      this.#length++
    } else {
      console.warn(`There is no node at index ${position}`)
    }
    return this
  }

  #deleteNode(node) {
    const prev = node.prev
    const next = node.next
    if (next) next.prev = prev || null
    if (prev) prev.next = next || null
    if (!next) this.#lastElement = prev
    if (!prev) this.#firstElement = next
    this.#length--
    return [prev, next]
  }

  remove(position) {
    const node = this.#getNode(position)
    if (node) {
      this.#deleteNode(node)
    }
    return node
  }

  addMany(array) {
    if (!Array.isArray(array) || !array.length) {
      const msg = 'The argument passed in the LinkedList.addMany() method must be an Array and cannot be empty'
      console.warn(msg)
    } else {
      array.forEach(e => this.add(e))
      return this
    }
  }

  insertManyBefore(position, array) {
    if (!Array.isArray(array) || !array.length) {
      const msg = 'The argument passed in the LinkedList.insertManyBefore() method must be an Array and cannot be empty'
      console.warn(msg)
    } else {
      let node = this.#getNode(position)
      if (node) {
        let i = array.length
        while(i--) {
          const newNode = new NodeLinkedList(array[i])
          newNode.prev = node.prev
          newNode.next = node
          newNode.next.prev = newNode
          if (newNode.prev) newNode.prev.next = newNode
          else this.#firstElement = newNode
          this.#length++
          node = newNode
        }
      } else {
        console.warn(`There is no node at index ${position}`)
      }
      return this
    }
  }

  showMany(start, end) {
    const lastIndex = this.#length - 1
    if (
      end > start &&
      end <= lastIndex && 
      start >= 0
    ) {
      let i = (end - start) + 1
      const arr = new Array(i)
      if ((lastIndex - end) <= start) {
        let node = this.#getNode(end)
        while(i--) {
          arr[i] = node.value
          node = node.prev
        }
      } else {
        let node = this.#getNode(start)
        let j = 0
        while(j < i) {
          arr[j] = node.value
          node = node.next
          j++
        }
      }
      return arr
    } else {
      const msg = 'The "start" argument in LinkedList.showMany() must be greater than or equal to zero and less than the "end" argument, and the "end" argument must be less than or equal to the last index'
      console.warn(msg)
    }
  }

  removeMany(start, end) {
    const lastIndex = this.#length - 1
    if (
      end > start &&
      end <= lastIndex && 
      start >= 0
    ) {
      let i = (end - start) + 1
      const removed = new Array(i)
      if ((lastIndex - end) < start) {
        let node = this.#getNode(end)
        while(i--) {
          const prev = this.#deleteNode(node)[0]
          removed[i] = node.value
          node = prev
        }
      } else {
        let node = this.#getNode(start)
        let j = 0
        while(j < i) {
          const next = this.#deleteNode(node)[1]
          removed[j] = node.value
          node = next
          j++
        }
      }
      return removed
    } else {
      const msg = 'The "start" argument in LinkedList.removeMany() must be greater than or equal to zero and less than the "end" argument, and the "end" argument must be less than or equal to the last index'
      console.warn(msg)
    }
  }

  listAll() {
    if (!this.length) return []
    const arr = new Array(this.length)
    let node = this.#lastElement
    let i = this.#length
    while(i--) {
      arr[i] = node.value
      node = node.prev
    }
    return arr
  }

  reset() {
    this.#firstElement = null
    this.#lastElement = null
    this.#length = 0

    return this
  }
}

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
      return this
    } else {
      console.warn(`There is no node at index ${position}`)
    }
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

  #privateRemove(position, nodeRef = null) {
    const node = nodeRef || this.#getNode(position)
    if (node) {
      this.#deleteNode(node)
    } else {
      console.warn(`There is no node at index ${position}`)
    }
    return node
  }

  remove(position) {
    const node = this.#privateRemove(position)
    if (node) return node.value
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

  #privateInsertManyBefore(position, array, nodeRef = null) {
    if (!Array.isArray(array) || !array.length) {
      const msg = 'The argument passed in the LinkedList.insertManyBefore() method must be an Array and cannot be empty'
      console.warn(msg)
    } else {
      let node = nodeRef || this.#getNode(position)
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
        return node
      } else {
        console.warn(`There is no node at index ${position}`)
      }
    }
  }

  insertManyBefore(position, array) {
    const hadItemAdded = this.#privateInsertManyBefore(position, array)
    if (hadItemAdded) return this
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

  #privateRemoveMany(start, end, nodeRef = null) {
    const lastIndex = this.#length - 1
    if (
      end > start &&
      end <= lastIndex && 
      start >= 0
    ) {
      let i = (end - start) + 1
      const removed = new Array(i)
      let lastNodeRemoved = null
      if ((lastIndex - end) <= start) {
        let node = nodeRef || this.#getNode(end)
        while(i--) {
          const prev = this.#deleteNode(node)[0]
          removed[i] = node
          node = prev
        }
        lastNodeRemoved = removed[(end - start)]
      } else {
        let node = nodeRef || this.#getNode(start)
        let j = 0
        while(j < i) {
          const next = this.#deleteNode(node)[1]
          removed[j] = node
          node = next
          j++
        }
        lastNodeRemoved = removed[(end - start)]
      }
      return [removed.map(node => node.value), lastNodeRemoved]
    } else {
      const msg = 'The "start" argument in LinkedList.removeMany() must be greater than or equal to zero and less than the "end" argument, and the "end" argument must be less than or equal to the last index'
      console.warn(msg)
    }
  }

  removeMany(start, end) {
    const removed = this.#privateRemoveMany(start, end)
    if (removed) return removed[0]
  }

  splice(idx, deleteCount, ...rest) {
    if ((this.#length === 0 && idx > 0) || idx > this.#length) {
      console.warn(`There is no node at index ${idx}`)
      return
    }
    if (deleteCount === 0) {
      if (rest.length) {
        if (idx === this.#length) this.addMany(rest)
        else this.insertManyBefore(idx, rest) 
        return this
      } 
    }
    if (idx > this.#length - 1 || idx < 0) {
      console.warn(`There is no node at index ${idx}`)
      return
    }

    if (deleteCount > 0) {
      let lastIdxToDelete = idx + deleteCount - 1
      if (lastIdxToDelete >= this.#length) 
        lastIdxToDelete = this.#length - 1

      let lastNodeRemoved = null
      if (idx === lastIdxToDelete) lastNodeRemoved = this.#privateRemove(idx)
      else lastNodeRemoved = this.#privateRemoveMany(idx, lastIdxToDelete)[1]

      if (rest.length) {
        if (lastNodeRemoved?.next) 
          this.#privateInsertManyBefore(idx, rest, lastNodeRemoved.next) 
        else this.addMany(rest)
      } 
      return this
    }

    if (deleteCount < 0) {
      let lastNodeRemoved = null
      let position = idx + deleteCount + 1
      if (position < 0) {
        const endToBack = this.#length + position
        position = 0
        if (endToBack <= idx) {
          this.reset()
        } else {
          const lastIdx = this.#length - 1
          if (idx === position) this.remove(idx)
          else this.removeMany(position, idx)
          if (endToBack === lastIdx) this.remove(endToBack-idx-1)
          else this.removeMany(endToBack-idx-1, lastIdx-idx-1)
        }
        if (rest.length) this.addMany(rest) 
        return this
      } else if (position === idx) lastNodeRemoved = this.#privateRemove(idx)
      else lastNodeRemoved = this.#privateRemoveMany(position, idx)[1]

      if (rest.length) {
        if (lastNodeRemoved?.next)
          this.#privateInsertManyBefore(position, rest, lastNodeRemoved.next)
        else this.addMany(rest)
      }
      return this
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

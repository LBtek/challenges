// second solution
function improvedStatsFinder(array) {
  if (!Array.isArray(array) || !array.length) 
    return "Error"
    
  if (array.some((n) => typeof n !== 'number'))
    return "Error"

  let len = array.length
  const mean = array.reduce((a, b) => a + b) / len
  const frequencies = {}

  while (len--) {
    frequencies[array[len]] = (frequencies[array[len]] || 0) + 1
  }

  let mode = null

  if (Object.values(frequencies).some(a => a > 1))
    mode = Object.keys(frequencies).reduce((a, b) => frequencies[a] >= frequencies[b] ? a : b)

  return [mean, mode]
}

// first solution
function statsFinder(array) {
  if (!Array.isArray(array) || !array.length) 
    return "Error"

  if (array.some((n) => typeof n !== 'number'))
    return "Error"

  let len = array.length
  const mean = array.reduce((acc, item) => acc + item) / len
  const repeatedNumbers = new Map()

  function backwardCounter(array, idx, value) {
    let acc = 1;
    if (!repeatedNumbers.has(value) && idx > 0) {
      while (idx--) {
        array[idx] === value ? acc++ : ''
      }
    }
    return acc
  }

  let max = 0
  let mode = null

  while (len--) {
    const value = array[len]
    const count = backwardCounter(array, len, value)
    if (count > 1) {
      repeatedNumbers.set(value, count)
      if (count >= max) {
        max = count
        mode = value
      }
    }
  }
  return [mean, mode]
}
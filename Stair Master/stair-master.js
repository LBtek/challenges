function stairMaster(n) {
  if (!(Number.isInteger(n) && n > 0))
    return '[] The argument passed must be a positive integer greater than zero'

  if (n === 1) return '[1]'

  const stepsToUp = [1, 2, 3]

  let array = []
  let arr = []
  let sum = 0

  function Add(x) {
    arr.push(x)
    sum = arr.reduce((a, b) => a + b)

    if (sum === n) {
      array.push([...arr])
    }

    if (sum < n) {
      let currentArr = [...arr]
      Add(x)
      arr = [...currentArr]
      if (x > 1) {
        while(x--) {
          Add(x)
        }
      }
    }
    arr = []
  }

  stepsToUp.forEach(e => {
    if (e > 1) Add(e)
  })

  const copy = [...array]

  copy.forEach(e => {
    for (let i = 0; i < e.length; i++) {
      for (let j = 0; j < e.length - 1; j++) {
        let next = e[j+1]
        if (next !== e[j]) {
          e[j+1] = e[j]
          e[j] = next
        }
        array.push([...e])
      }
    }
  })

  Add(1)

  let set = {}
  array.forEach(e => set[e] = e)
  const values = Object.values(set).sort((a, b) => b.length - a.length)
  let stringReturn = ''
  values.forEach((e) => stringReturn += `[${e}] `)

  return stringReturn.trim()
  // If you want it returned as an array of arrays, just return the "values" or return an Object.values(freq).
  // If you just want how many combinations/permutations there are, just return "values.length" or Object.values(freq).length
}
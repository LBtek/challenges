function missingNos(array, k) {
  if (!(Number.isInteger(k) && k > 0)) 
    return 'Error'

  const result = []
  let n = 1

  while(result.length !== k) {
    if (!array.includes(n)) {
      result.push(n)
    }
    n++
  }
  return result
}
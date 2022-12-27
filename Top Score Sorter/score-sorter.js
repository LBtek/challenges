function scoreSorter(array, topScore) {
  if (!array.length || typeof topScore !== 'number')
    return 'Error'

  let arrayFiltered = array.filter(e => typeof e === 'number' && e <= topScore)

  let i = arrayFiltered.length

  if (!i) return `Not found value <= ${topScore}`

  while (i--) {
    let j = i
    while (j--) {
      if (arrayFiltered[j] < arrayFiltered[i]) {
        const smaller = arrayFiltered[j]
        arrayFiltered[j] = arrayFiltered[i]
        arrayFiltered[i] = smaller
      }
    }
  }
  return arrayFiltered
}
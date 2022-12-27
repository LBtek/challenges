function uniqueChars(stringIn) {
  if (typeof stringIn !== 'string') 
    return 'Error'

  let len = stringIn.length

  if (!len)
    return "Invalid argument length."

  let frequencies = {}

  while (len--) {
    frequencies[stringIn[len]] = (frequencies[stringIn[len]] || 0) + 1
  }
  return !Object.values(frequencies).some((val) => val > 1)
}
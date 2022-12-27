function getX(x, nums) {
  if (!nums.length || !(Number.isInteger(x) && x > 0)) 
    return 'Error'
  const arr = nums.sort((a, b) => a - b)
  return arr[x-1]
}
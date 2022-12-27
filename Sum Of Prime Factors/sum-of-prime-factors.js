function sumOfPrimeFactors(num) {
  let sum = 0;
  for(let i = 2; i <= num; i++) {
    if(isPrime(i)){
      if(num % i === 0)
        sum += i
    }
  }
  return sum
}
function isPrime(num) {
  if(num === 0 || num === 1) 
    return false
  if(
      num === 2 || 
      num === 3 || 
      num === 5 ||
      num === 7
    ) return true
  if(
      num % 2 === 0 || 
      num % 3 === 0 || 
      num % 5 === 0 ||
      num % 7 === 0 
    ) return false

  return true
}
function primeFinder(num) {
  let primeNumbers = [];
  for(let i = 2; i <= num; i++) {
    if(isPrime(i)){
      primeNumbers.push(i);
    }
  }
  return primeNumbers;
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
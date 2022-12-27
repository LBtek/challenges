function fizzbuzz(n) {
  let arr = []
  for(let i = 1; i <= n; i++) {
    arr.push(
      i % 3 === 0 && i % 5 === 0 ? "FizzBuzz" : 
      i % 3 === 0 ? "Fizz" : 
      i % 5 === 0 ? "Buzz" : i )
  }
  return arr
}
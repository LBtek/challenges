// first solution
function fibFinder(n) {
  if (n === 0) return 0;
  let prev = result = 1
  let p

  for (let i = 2; i < n; i++) {
    p = result
    result = result + prev
    prev = p
  }
  return result
}

//second solution
function fibFinder(n) {
  let a = 0;
  let b = x = 1;

  while (x <= n) {
    [a, b] = [b, a + b];
    n--;
  }
  return a;
}

console.log(fibFinder(6))
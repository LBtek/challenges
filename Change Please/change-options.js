function changeOptions(money, coins) {
  if (!coins.length || !(Number.isInteger(money) && money > 0)) {
    console.warn('Error')
    return "Error"
  }
  const newArray = coins.filter(
    (coin) => Number.isInteger(coin) && coin > 0 && coin <= money
  ).sort((a, b) => a - b)

  if (!newArray.length) {
    console.warn('Error')
    return "Error"
  }

  const arrayReturn = []
  let arr = []

  let sum = 0

  function Add(x, id) {
    arr.push(x)
    sum = arr.reduce((a, b) => a + b)

    if (sum === money) {
      arrayReturn.push([...arr])
    }

    if (sum < money) {
      let currentArr = [...arr]
      Add(x, id)
      arr = [...currentArr]
      if (id) {
        while(id--) {
          Add(newArray[id], id)
          arr = [...currentArr]
        }
      }
    }
    arr = []
  }

  let i = newArray.length
  while(i--) {
    Add(newArray[i], i)
  }

  return arrayReturn
}

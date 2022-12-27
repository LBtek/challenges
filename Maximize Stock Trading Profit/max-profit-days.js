// Second solution
function maxProfitDays(stockPrices) {
  let result = [];
  let profit = 0;
  let i = stockPrices.length
  while (i--) {
    let j = i
    while (j--) { 
      if (stockPrices[i] - stockPrices[j] >= profit) {
        profit = stockPrices[i] - stockPrices[j];
        result = [j, i]
      }
    }
  }
  return result;
}



// First solution
function maxProfitDays(stockPrices) {
  let len = stockPrices.length
  let positiveDays = []

  function profitFinderBackwards(array, idx, value) {
    let lowerValue = [idx, value]
    let newIdx = idx
    while(newIdx--) {
      if(array[newIdx] <= lowerValue[1])
        lowerValue = [newIdx, array[newIdx]]
    }
    if(value > lowerValue[1])
      return [
        [lowerValue[0], idx], 
        (value - lowerValue[1])
      ]
  }

  while(len--) {
    const results = profitFinderBackwards(stockPrices, len, stockPrices[len])

    if (results) positiveDays.push(results)
  }

  let maxProfit;

  if (positiveDays.length) 
    maxProfit  = positiveDays.reduce(
      (acc, item) => 
        acc[1] > item[1] ? acc : item
    )[0]

  return maxProfit || []
}

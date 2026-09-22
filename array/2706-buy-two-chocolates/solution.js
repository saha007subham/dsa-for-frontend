/**
 * @param {number[]} prices
 * @param {number} money
 * @return {number}
 */
var buyChoco = function (prices, money) {
  let { first, second } = findTwoMinimum(prices);

  let totalSum = first + second;

  if (totalSum > money) return money;

  return money - totalSum;
};

function findTwoMinimum(arr) {
  let first = 101;
  let second = 101;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < first) {
      second = first;
      first = arr[i];
    } else if (arr[i] < second) {
      second = arr[i];
    }
  }

  return { first, second };
}

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var leftRightDifference = function (arr) {
  const leftArr = [];
  const rightArr = [];
  let ansArr = [];

  leftArr[0] = 0;
  rightArr[arr.length - 1] = 0;

  // Build Left sum arr:
  for (let i = 1; i < arr.length; i++) {
    leftArr[i] = arr[i - 1] + leftArr[i - 1];
  }

  // Build Right sum arr:
  for (let i = arr.length - 2; i >= 0; i--) {
    rightArr[i] = arr[i + 1] + rightArr[i + 1];
  }

  // Build ans sum:
  for (let i = 0; i < arr.length; i++) {
    ansArr[i] = Math.abs(leftArr[i] - rightArr[i]);
  }

  return ansArr;
};

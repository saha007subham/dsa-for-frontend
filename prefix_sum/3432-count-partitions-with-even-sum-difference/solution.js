/**
 * @param {number[]} nums
 * @return {number}
 */
var countPartitions = function (arr) {
  let totalSum = 0;
  let evenCount = 0;
  let leftSum = 0;

  for (let i = 0; i < arr.length; i++) {
    totalSum = totalSum + arr[i];
  }

  for (let i = 0; i < arr.length - 1; i++) {
    leftSum = leftSum + arr[i];

    let rightSum = totalSum - leftSum;

    if ((leftSum - rightSum) % 2 === 0) {
      evenCount++;
    }
  }

  return evenCount;
};

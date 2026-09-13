/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (arr, target) {
  let leftPointer = 0;
  let rightPointer = arr.length - 1;

  while (leftPointer < rightPointer) {
    if (arr[leftPointer] + arr[rightPointer] === target) {
      // Adding +1 because this is a 1-indexed array:
      return [leftPointer + 1, rightPointer + 1];
    } else if (arr[leftPointer] + arr[rightPointer] > target) {
      rightPointer--;
    } else {
      leftPointer++;
    }
  }

  return [0, 0];
};

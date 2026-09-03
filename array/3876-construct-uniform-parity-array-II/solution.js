/**
 * @param {number[]} nums1
 * @return {boolean}
 */
var uniformArray = function (nums1) {
  nums1.sort((a, b) => a - b);

  let smallestParity = nums1[0] % 2;

  for (let i = 1; i < nums1.length; i++) {
    // Keep nums1[i]
    if (nums1[i] % 2 === smallestParity) {
      continue;
    }

    // Subtract the smallest element
    let difference = nums1[i] - nums1[0];

    if (difference % 2 === smallestParity) {
      continue;
    }

    return false;
  }

  return true;
};

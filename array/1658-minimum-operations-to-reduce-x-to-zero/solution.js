/**
 * @param {number[]} nums
 * @param {number} x
 * @return {number}
 */
var minOperations = function (nums, x) {
  const n = nums.length;

  const total = nums.reduce((sum, num) => sum + num, 0);
  const target = total - x;

  if (target === 0) return n;

  if (target < 0) return -1;

  let left = 0;
  let sum = 0;
  let maxLength = -1;

  for (let right = 0; right < n; right++) {
    sum += nums[right];

    while (sum > target) {
      sum -= nums[left];
      left++;
    }

    if (sum === target) {
      maxLength = Math.max(maxLength, right - left + 1);
    }
  }

  if (maxLength === -1) return -1;

  return n - maxLength;
};

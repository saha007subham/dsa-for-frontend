/**
 * @param {number[]} nums
 * @return {number[]}
 */
var rearrangeArray = function (nums) {
  const freq = new Map();

  for (const num of nums) {
    freq.set(num, (freq.get(num) || 0) + 1);
  }

  const ans = [];

  while (freq.size > 0) {
    const values = [...freq.keys()].sort((a, b) => a - b);

    for (const value of values) {
      ans.push(value);

      const count = freq.get(value);

      if (count === 1) {
        freq.delete(value);
      } else {
        freq.set(value, count - 1);
      }
    }
  }

  return ans;
};

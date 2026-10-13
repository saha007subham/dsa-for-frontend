/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  let i = 0;
  let j = 0;
  let len = s.length;
  let maxWindow = 0;
  let map = new Map();

  while (j < len) {
    if (map.has(s[j]) && map.get(s[j]) >= i) {
      i = map.get(s[j]) + 1;
    }

    map.set(s[j], j);
    let curr = j - i + 1;
    maxWindow = Math.max(maxWindow, curr);

    j++;
  }

  return maxWindow;
};

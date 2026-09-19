/**
 * @param {number[]} code
 * @param {number} k
 * @return {number[]}
 */
var decrypt = function (code, k) {
  const n = code.length;

  if (k === 0) {
    return new Array(n).fill(0);
  }

  const res = new Array(n).fill(0);
  const len = Math.abs(k);

  let sum = 0;

  if (k > 0) {
    // Initial window: next k elements of index 0
    for (let i = 1; i <= k; i++) {
      sum += code[i % n];
    }

    res[0] = sum;

    // Slide the window
    for (let i = 1; i < n; i++) {
      sum -= code[i % n];
      sum += code[(i + k) % n];

      res[i] = sum;
    }
  } else {
    // Initial window: previous |k| elements of index 0
    for (let i = 1; i <= len; i++) {
      sum += code[(n - i) % n];
    }

    res[0] = sum;

    // Slide the window
    for (let i = 1; i < n; i++) {
      sum -= code[(i - len - 1 + n) % n];
      sum += code[(i - 1 + n) % n];

      res[i] = sum;
    }
  }

  return res;
};

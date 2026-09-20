/**
 * @param {string} s
 * @return {number}
 */
var reverseDegree = function (s) {
  let map = new Map();
  let count = 26;
  let arr = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];

  for (let i = 0; i < 26; i++) {
    map.set(arr[i], count);
    count--;
  }

  let product = 0;

  for (let i = 0; i < s.length; i++) {
    let curr = s[i];
    let val = map.get(curr);
    let idx = i + 1;
    let sum = val * idx;

    product = product + sum;
  }

  return product;
};

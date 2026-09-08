/**
 * @param {number} n
 * @return {boolean}
 */
var isStrictlyPalindromic = function (n) {
  for (let i = 2; i <= n - 2; i++) {
    let ans = convertToBase(n, i);

    if (!isPalindrome(ans)) {
      return false;
    }
  }

  return true;
};

function isPalindrome(str) {
  let start = 0;
  let end = str.length - 1;

  while (start <= end) {
    if (str[start] !== str[end]) {
      return false;
    }

    start++;
    end--;
  }

  return true;
}

function convertToBase(n, base) {
  let result = "";

  while (n > 0) {
    result += n % base;
    n = Math.floor(n / base);
  }

  return result.split("").reverse().join("");
}

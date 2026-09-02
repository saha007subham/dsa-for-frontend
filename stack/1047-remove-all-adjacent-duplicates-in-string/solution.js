var removeDuplicates = function (s) {
  let stack = [];

  for (let ch of s) {
    if (stack.length > 0 && stack[stack.length - 1] === ch) {
      stack.pop();
    } else {
      stack.push(ch);
    }
  }

  return stack.join("");
};

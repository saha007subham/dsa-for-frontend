/**
 * @param {string} seq
 * @return {number[]}
 */
var maxDepthAfterSplit = function (seq) {
  let ans = [];
  let depth = 0;

  for (let i = 0; i < seq.length; i++) {
    if (seq[i] == "(") {
      depth++;
    }

    ans.push(depth % 2);

    if (seq[i] == ")") {
      depth--;
    }
  }

  return ans;
};

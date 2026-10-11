# [1021. Remove Outermost Parentheses](https://leetcode.com/problems/remove-outermost-parentheses/)

**Difficulty:** Easy

## Problem

A **valid parentheses string** is either empty `""`, `"(" + A + ")"`, or `A + B`, where `A` and `B` are valid parentheses strings, and `+` represents string concatenation.

For example, `""`, `"()"`, `"(())()"`, and `"(()(()))"` are all valid parentheses strings.

A valid parentheses string `s` is **primitive** if it is nonempty, and there does not exist a way to split it into `s = A + B`, with `A` and `B` nonempty valid parentheses strings.

Given a valid parentheses string `s`, consider its **primitive decomposition**: `s = P1 + P2 + ... + Pk`, where `Pi` are primitive valid parentheses strings.

Return `s` after removing the **outermost parentheses** of every primitive string in the primitive decomposition of `s`.

## Example 1

**Input:**

```text
s = "(()())(())"
```

**Output:**

```text
"()()()"
```

**Explanation:**

The input string is `"(()())(())"`, with primitive decomposition `"(()())"` + `"(())"`.

After removing outer parentheses of each part, this is `"()()"` + `"()"` = `"()()()"`.

## Example 2

**Input:**

```text
s = "(()())(())(()(()))"
```

**Output:**

```text
"()()()()(())"
```

**Explanation:**

The input string is `"(()())(())(()(()))"`, with primitive decomposition `"(()())"` + `"(())"` + `"(()(()))"`.

After removing outer parentheses of each part, this is `"()()"` + `"()"` + `"()(())"` = `"()()()()(())"`.

## Example 3

**Input:**

```text
s = "()()"
```

**Output:**

```text
""
```

**Explanation:**

The input string is `"()()"`, with primitive decomposition `"()"` + `"()"`.

After removing outer parentheses of each part, this is `""` + `""` = `""`.

## Constraints

- `1 <= s.length <= 10^5`
- `s[i]` is either `'('` or `')'`.
- `s` is a valid parentheses string.

## Solution

Every primitive string starts at a `(` that brings the nesting level from `0` to `1`, and ends at the `)` that brings it back from `1` to `0`. Those two characters are exactly the **outermost parentheses** we need to remove.

So we scan the string while tracking a running `level`:

- For `(`: increase `level`, and keep the character only if the new `level > 1`.
- For `)`: keep the character only if the current `level > 1`, and then decrease `level`.

Everything that sits at level `1` (the outer wrapper of a primitive) is skipped; everything deeper is kept.

See [`NOTES.md`](./NOTES.md) for the detailed explanation.

See [`solution.js`](./solution.js) for the implementation.

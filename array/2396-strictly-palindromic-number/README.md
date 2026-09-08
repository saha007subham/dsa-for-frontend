# [2396. Strictly Palindromic Number](https://leetcode.com/problems/strictly-palindromic-number/)

**Difficulty:** Medium

## Problem

An integer `n` is **strictly palindromic** if, for **every** base `b` between `2` and `n - 2` (**inclusive**), the string representation of the integer `n` in base `b` is **palindromic**.

Given an integer `n`, return `true` if `n` is **strictly palindromic** and `false` otherwise.

A string is **palindromic** if it reads the same forward and backward.

---

## Example 1

**Input:**

```text
n = 9
```

**Output:**

```text
false
```

**Explanation:**

In base 2:

```text
9 = 1001₂
```

which is palindromic.

In base 3:

```text
9 = 100₃
```

which is not palindromic.

Therefore, `9` is not strictly palindromic, so we return `false`.

Note that in bases 4, 5, 6, and 7, `n = 9` is also not palindromic.

---

## Example 2

**Input:**

```text
n = 4
```

**Output:**

```text
false
```

**Explanation:**

We only consider base 2:

```text
4 = 100₂
```

which is not palindromic.

Therefore, we return `false`.

---

## Constraints

- `4 <= n <= 10^5`

---

## Solution

The solution uses:

1. **Base conversion** — Convert `n` into every base from `2` to `n - 2`.
2. **Two-pointer technique** — Check whether each base representation is a palindrome.

See [`NOTES.md`](./NOTES.md) for the detailed explanation.

See [`solution.js`](./solution.js) for the JavaScript implementation.

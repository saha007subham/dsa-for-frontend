# [392. Is Subsequence](https://leetcode.com/problems/is-subsequence/)

**Difficulty:** Easy

## Problem

Given two strings `s` and `t`, return `true` if `s` is a **subsequence** of `t`, or `false` otherwise.

A **subsequence** of a string is a new string that is formed from the original string by deleting some (can be none) of the characters without disturbing the relative positions of the remaining characters.

For example:

```text
"ace" is a subsequence of "abcde"
```

because we can remove `b` and `d`.

However:

```text
"aec" is not a subsequence of "abcde"
```

because the relative order of the characters is not maintained.

## Example 1

**Input:**

```text
s = "abc"
t = "ahbgdc"
```

**Output:**

```text
true
```

## Example 2

**Input:**

```text
s = "axc"
t = "ahbgdc"
```

**Output:**

```text
false
```

## Constraints

- `0 <= s.length <= 100`
- `0 <= t.length <= 10^4`
- `s` and `t` consist only of lowercase English letters.

## Follow-up

Suppose there are lots of incoming strings `s`, say:

```text
s1, s2, ..., sk
```

where `k >= 10^9`, and you want to check one by one to see if `t` has each string as a subsequence.

How would you change your code?

## Solution

The solution uses the **Two Pointer** technique.

- `i` points to the current character we are looking for in `s`.
- `j` scans through `t`.
- Whenever `s[i] === t[j]`, move `i` forward.
- Always move `j` forward.
- If `i` reaches `s.length`, every character of `s` has been matched in order.

See [`NOTES.md`](./NOTES.md) for the detailed explanation.

See [`solution.js`](./solution.js) for the implementation.

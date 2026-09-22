# [3. Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/)

**Difficulty:** Medium

## Problem

Given a string `s`, find the length of the **longest substring** without duplicate characters.

## Example 1

**Input:**

```text
s = "abcabcbb"
```

**Output:**

```text
3
```

**Explanation:**

The answer is `"abc"`, with the length of `3`.

Note that `"bca"` and `"cab"` are also correct answers.

## Example 2

**Input:**

```text
s = "bbbbb"
```

**Output:**

```text
1
```

**Explanation:**

The answer is `"b"`, with the length of `1`.

## Example 3

**Input:**

```text
s = "pwwkew"
```

**Output:**

```text
3
```

**Explanation:**

The answer is `"wke"`, with the length of `3`.

Notice that the answer must be a **substring**, `"pwke"` is a subsequence and not a substring.

## Constraints

- `0 <= s.length <= 10^5`
- `s` consists of English letters, digits, symbols and spaces.

## Solution

We use the **sliding window** technique with two pointers, `i` (window start) and `j` (window end), plus a `Map` that stores the **last seen index** of every character.

As `j` moves forward through the string:

- If the character at `j` has been seen before **inside the current window** (its last index is `>= i`), we shrink the window by moving `i` to just after that previous occurrence.
- We then record the current character's index in the map.
- The current window size is `j - i + 1`, and we track the maximum window size seen so far.

This lets us find the longest window with no repeating characters in a **single pass**, without re-scanning the string for every window.

See [`NOTES.md`](./NOTES.md) for the detailed explanation.

See [`solution.js`](./solution.js) for the implementation.

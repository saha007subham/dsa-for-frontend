# [1111. Maximum Nesting Depth of Two Valid Parentheses Strings](https://leetcode.com/problems/maximum-nesting-depth-of-two-valid-parentheses-strings/)

**Difficulty:** Medium

## Problem

A string is a **valid parentheses string** (denoted **VPS**) if and only if it consists of `"("` and `")"` characters only, and:

- It is the empty string, or
- It can be written as `AB` (`A` concatenated with `B`), where `A` and `B` are VPS's, or
- It can be written as `(A)`, where `A` is a VPS.

We can similarly define the **nesting depth** `depth(S)` of any VPS `S` as follows:

- `depth("") = 0`
- `depth(A + B) = max(depth(A), depth(B))`, where `A` and `B` are VPS's
- `depth("(" + A + ")") = 1 + depth(A)`, where `A` is a VPS.

For example, `""`, `"()()"`, and `"()(()())"` are VPS's (with nesting depths `0`, `1`, and `2`), and `")("` and `"(()"` are not VPS's.

Given a VPS `seq`, split it into two **disjoint subsequences** `A` and `B`, such that `A` and `B` are VPS's (and `A.length + B.length = seq.length`). The subsequences may not necessarily be contiguous.

For example, for the sequence `123456789`, one possible split is:

- `A = {1, 3, 5, 7, 9}`
- `B = {2, 4, 6, 8}`

This corresponds to the output `[0, 1, 0, 1, 0, 1, 0, 1, 0]` where `0` indicates membership in `A` and `1` indicates membership in `B`.

Now choose any such `A` and `B` such that `max(depth(A), depth(B))` is the **minimum possible** value.

Return an `answer` array (of length `seq.length`) that encodes such a choice of `A` and `B`: `answer[i] = 0` if `seq[i]` is part of `A`, else `answer[i] = 1`. Note that even though multiple answers may exist, you may return any of them.

## Example 1

**Input:**

```text
seq = "(()())"
```

**Output:**

```text
[0,1,1,1,1,0]
```

## Example 2

**Input:**

```text
seq = "()(())()"
```

**Output:**

```text
[0,0,0,1,1,0,1,1]
```

## Constraints

- `1 <= seq.size <= 10000`

## Solution

The key insight is that we don't need to think about `A` and `B` as two separate strings at all — we just need to decide, character by character, which group each parenthesis belongs to, so that **neither group ever gets too deeply nested**.

We track the running `depth` of the original string as we scan it, and assign each character to group `0` or group `1` based on the **parity** (odd/even) of the depth at that point:

- For `(`: increment `depth` **first**, then assign `depth % 2`.
- For `)`: assign `depth % 2` **first**, then decrement `depth`.

Splitting by parity naturally distributes the "deep" nesting between the two groups, so each group's maximum depth ends up roughly **half** of the original — which is provably optimal.

See [`NOTES.md`](./NOTES.md) for the detailed explanation.

See [`solution.js`](./solution.js) for the implementation.

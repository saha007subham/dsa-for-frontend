# [633. Sum of Square Numbers](https://leetcode.com/problems/sum-of-square-numbers/)

**Difficulty:** Medium

## Problem

Given a non-negative integer `c`, decide whether there are two integers `a` and `b` such that:

```text
a² + b² = c
```

Return `true` if such integers exist, otherwise return `false`.

## Example 1

**Input:**

```text
c = 5
```

**Output:**

```text
true
```

**Explanation:**

```text
1 * 1 + 2 * 2 = 5
```

Therefore, `a = 1` and `b = 2`.

## Example 2

**Input:**

```text
c = 3
```

**Output:**

```text
false
```

## Constraints

- `0 <= c <= 2^31 - 1`

## Solution

The solution uses the **Two Pointer** technique.

We initialize:

- `a = 0`
- `b = Math.floor(Math.sqrt(c))`

Since:

```text
b² <= c
```

we only need to search between `0` and `sqrt(c)`.

For every pair:

```text
sum = a² + b²
```

- If `sum === c`, return `true`.
- If `sum > c`, decrease `b`.
- If `sum < c`, increase `a`.

If the pointers cross without finding a valid pair, return `false`.

See [`NOTES.md`](./NOTES.md) for the detailed explanation.

See [`solution.js`](./solution.js) for the implementation.

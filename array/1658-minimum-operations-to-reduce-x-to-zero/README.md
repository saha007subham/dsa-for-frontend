# [1658. Minimum Operations to Reduce X to Zero](https://leetcode.com/problems/minimum-operations-to-reduce-x-to-zero/)

**Difficulty:** Medium

## Problem

You are given an integer array `nums` and an integer `x`.

In one operation, you can either **remove the leftmost** or **remove the rightmost** element from the array `nums` and subtract its value from `x`. Note that this modifies the array for future operations.

Return the **minimum number of operations** to reduce `x` to exactly `0` if it is possible, otherwise, return `-1`.

## Example 1

**Input:**

```text
nums = [1,1,4,2,3]
x = 5
```

**Output:**

```text
2
```

**Explanation:**

The optimal solution is to remove the last two elements to reduce `x` to zero.

## Example 2

**Input:**

```text
nums = [5,6,7,8,9]
x = 4
```

**Output:**

```text
-1
```

## Example 3

**Input:**

```text
nums = [3,2,20,1,1,3]
x = 10
```

**Output:**

```text
5
```

**Explanation:**

The optimal solution is to remove the last three elements and the first two elements (`5` operations in total) to reduce `x` to zero.

## Constraints

- `1 <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^4`
- `1 <= x <= 10^9`

## Solution

Removing some elements from the **left** and some from the **right** so that they sum to `x` is the same as saying: the elements that are **left over in the middle** must sum to:

```text
target = total - x
```

So the problem becomes: find the **longest contiguous subarray** whose sum equals `target`. Once we know its length, the minimum number of operations is:

```text
n - maxLength
```

Because all values in `nums` are **positive**, the running sum only ever increases as the window grows and decreases as it shrinks — which means a classic **sliding window** works: expand the window, and shrink it from the left whenever the sum exceeds `target`.

See [`NOTES.md`](./NOTES.md) for the detailed explanation.

See [`solution.js`](./solution.js) for the implementation.

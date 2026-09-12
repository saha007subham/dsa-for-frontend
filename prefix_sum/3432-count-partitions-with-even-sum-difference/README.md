# [3432. Count Partitions with Even Sum Difference](https://leetcode.com/problems/count-partitions-with-even-sum-difference/)

**Difficulty:** Easy

## Problem

You are given an integer array `nums` of length `n`.

A **partition** is defined as an index `i` where `0 <= i < n - 1`, splitting the array into two **non-empty** subarrays such that:

- The left subarray contains indices `[0, i]`.
- The right subarray contains indices `[i + 1, n - 1]`.

Return the number of **partitions** where the **difference** between the **sum** of the left and right subarrays is **even**.

---

## Example 1

**Input:**

```text
nums = [10,10,3,7,6]
```

**Output:**

```text
4
```

**Explanation:**

The 4 valid partitions are:

```text
[10]              [10,3,7,6]
10 - 26 = -16    → even

[10,10]           [3,7,6]
20 - 16 = 4      → even

[10,10,3]         [7,6]
23 - 13 = 10     → even

[10,10,3,7]       [6]
30 - 6 = 24      → even
```

---

## Example 2

**Input:**

```text
nums = [1,2,2]
```

**Output:**

```text
0
```

**Explanation:**

No partition results in an even sum difference.

---

## Example 3

**Input:**

```text
nums = [2,4,6,8]
```

**Output:**

```text
3
```

**Explanation:**

All partitions result in an even sum difference.

---

## Constraints

- `2 <= n == nums.length <= 100`
- `1 <= nums[i] <= 100`

---

## Solution

The solution first calculates the **total sum** of the array.

Then, while traversing the array from left to right, it maintains:

- `leftSum` — sum of the current left subarray.
- `rightSum` — calculated as `totalSum - leftSum`.

For every valid partition, it checks whether:

```text
(leftSum - rightSum) % 2 === 0
```

If the difference is even, the partition is counted.

See [`NOTES.md`](./NOTES.md) for the detailed explanation.

See [`solution.js`](./solution.js) for the implementation.

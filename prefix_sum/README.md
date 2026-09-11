# [2574. Left and Right Sum Differences](https://leetcode.com/problems/left-and-right-sum-differences/)

**Difficulty:** Easy

## Problem

You are given a **0-indexed** integer array `nums` of size `n`.

Define two arrays `leftSum` and `rightSum` where:

- `leftSum[i]` is the sum of elements to the left of index `i` in the array `nums`. If there is no such element, `leftSum[i] = 0`.
- `rightSum[i]` is the sum of elements to the right of index `i` in the array `nums`. If there is no such element, `rightSum[i] = 0`.

Return an integer array `answer` of size `n` where:

```text
answer[i] = |leftSum[i] - rightSum[i]|
```

## Example 1

**Input:**

```text
nums = [10,4,8,3]
```

**Output:**

```text
[15,1,11,22]
```

**Explanation:**

The array `leftSum` is:

```text
[0,10,14,22]
```

The array `rightSum` is:

```text
[15,11,3,0]
```

Therefore:

```text
answer = [|0 - 15|, |10 - 11|, |14 - 3|, |22 - 0|]
       = [15,1,11,22]
```

## Example 2

**Input:**

```text
nums = [1]
```

**Output:**

```text
[0]
```

**Explanation:**

The array `leftSum` is:

```text
[0]
```

The array `rightSum` is:

```text
[0]
```

Therefore:

```text
answer = [|0 - 0|]
       = [0]
```

## Constraints

- `1 <= nums.length <= 1000`
- `1 <= nums[i] <= 10^5`

## Solution

The solution builds:

1. A `leftArr` containing the sum of elements to the left of every index.
2. A `rightArr` containing the sum of elements to the right of every index.
3. An `ansArr` containing the absolute difference between the corresponding left and right sums.

See [`NOTES.md`](./NOTES.md) for the detailed explanation.

See [`solution.js`](./solution.js) for the implementation.

# [167. Two Sum II - Input Array Is Sorted](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/)

**Difficulty:** Medium

## Problem

Given a **1-indexed** array of integers `numbers` that is already **sorted in non-decreasing order**, find two numbers such that they add up to a specific `target` number.

Let these two numbers be `numbers[index1]` and `numbers[index2]` where:

```text
1 <= index1 < index2 <= numbers.length
```

Return the indices of the two numbers `index1` and `index2`, **each incremented by one**, as an integer array:

```text
[index1, index2]
```

The tests are generated such that there is **exactly one solution**.

You may not use the same element twice.

Your solution must use only **constant extra space**.

## Example 1

**Input:**

```text
numbers = [2,7,11,15]
target = 9
```

**Output:**

```text
[1,2]
```

**Explanation:**

The sum of `2` and `7` is `9`.

Therefore:

```text
index1 = 1
index2 = 2
```

We return:

```text
[1,2]
```

## Example 2

**Input:**

```text
numbers = [2,3,4]
target = 6
```

**Output:**

```text
[1,3]
```

**Explanation:**

The sum of `2` and `4` is `6`.

Therefore:

```text
index1 = 1
index2 = 3
```

We return:

```text
[1,3]
```

## Example 3

**Input:**

```text
numbers = [-1,0]
target = -1
```

**Output:**

```text
[1,2]
```

**Explanation:**

The sum of `-1` and `0` is `-1`.

Therefore:

```text
index1 = 1
index2 = 2
```

We return:

```text
[1,2]
```

## Constraints

- `2 <= numbers.length <= 3 * 10^4`
- `-1000 <= numbers[i] <= 1000`
- `numbers` is sorted in **non-decreasing order**.
- `-1000 <= target <= 1000`
- The tests are generated such that there is **exactly one solution**.

## Solution

Because the array is already sorted, we can use the **Two Pointer** technique.

- Start one pointer at the beginning.
- Start another pointer at the end.
- If the sum is equal to `target`, return the indices.
- If the sum is greater than `target`, move the right pointer left.
- If the sum is smaller than `target`, move the left pointer right.

This gives an `O(n)` time and `O(1)` space solution.

See [`NOTES.md`](./NOTES.md) for the detailed explanation.

See [`solution.js`](./solution.js) for the implementation.

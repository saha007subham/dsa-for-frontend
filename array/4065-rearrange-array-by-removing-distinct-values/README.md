# 4065. Rearrange Array by Removing Distinct Values

**Difficulty:** Easy

## Problem

You are given an integer array `nums`.

You start with an empty array `ans`. Repeat the following operation until `nums` is empty:

1. Identify **all distinct values** currently present in `nums`.
2. Remove **one occurrence of every distinct value** currently in `nums`, and append those values to `ans` **in ascending order**.

Return the array `ans`.

## Example 1

**Input:**

```text
nums = [3,1,3,2,1,3]
```

**Output:**

```text
[1,2,3,1,3,3]
```

**Explanation:**

| Operation | Appended to `ans` | `nums` after |     `ans` after      |
| :-------: | :---------------: | :----------: | :------------------: |
|     1     |      1, 2, 3      | `[3, 1, 3]`  |     `[1, 2, 3]`      |
|     2     |       1, 3        |    `[3]`     |  `[1, 2, 3, 1, 3]`   |
|     3     |         3         |     `[]`     | `[1, 2, 3, 1, 3, 3]` |

`nums` is now empty, so the answer is `[1, 2, 3, 1, 3, 3]`.

## Example 2

**Input:**

```text
nums = [7,7,4,4,4]
```

**Output:**

```text
[4,7,4,7,4]
```

**Explanation:**

| Operation | Appended to `ans` | `nums` after |    `ans` after    |
| :-------: | :---------------: | :----------: | :---------------: |
|     1     |       4, 7        | `[7, 4, 4]`  |     `[4, 7]`      |
|     2     |       4, 7        |    `[4]`     |  `[4, 7, 4, 7]`   |
|     3     |         4         |     `[]`     | `[4, 7, 4, 7, 4]` |

`nums` is now empty, so the answer is `[4, 7, 4, 7, 4]`.

## Constraints

- `1 <= nums.length <= 100`
- `1 <= nums[i] <= 100`

## Solution

We count how many times each value appears using a frequency map, then simulate the process:

- On each "round," take every value still remaining in the map, sorted in ascending order, and push each one to `ans` exactly once, decrementing its count (or removing it entirely once its count hits zero).
- Repeat until the map is empty.

The number of rounds needed equals the **highest frequency** of any single value — that value keeps reappearing in every round until it's fully used up.

See [`NOTES.md`](./NOTES.md) for the detailed explanation.

See [`solution.js`](./solution.js) for the implementation.

# [1. Two Sum](https://leetcode.com/problems/two-sum/)

**Difficulty:** Easy

## Problem

You are given an array of integers `nums` and an integer `target`. Return _indices of the two numbers such that they add up to `target`_.

You may assume that each input would have **exactly one solution**, and you may not use the _same_ element twice.

You can return the answer in any order.

---

## Example 1

**Input:**

```text
nums = [2,7,11,15]
target = 9
```

**Output:**

```text
[0,1]
```

**Explanation:**

Because:

```text
nums[0] + nums[1] = 2 + 7 = 9
```

We return:

```text
[0, 1]
```

---

## Example 2

**Input:**

```text
nums = [3,2,4]
target = 6
```

**Output:**

```text
[1,2]
```

---

## Example 3

**Input:**

```text
nums = [3,3]
target = 6
```

**Output:**

```text
[0,1]
```

---

## Constraints

- `2 <= nums.length <= 10^4`
- `-10^9 <= nums[i] <= 10^9`
- `-10^9 <= target <= 10^9`
- **Only one valid answer exists.**

---

## Follow-up

Can you come up with an algorithm that is less than `O(n^2)` time complexity?

---

## Solution

The solution uses a **HashMap** to achieve `O(n)` time complexity.

See [`NOTES.md`](./NOTES.md) for the detailed approach and explanation.

See [`solution.js`](./solution.js) for the JavaScript implementation.

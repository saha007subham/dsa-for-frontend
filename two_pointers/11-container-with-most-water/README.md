# [11. Container With Most Water](https://leetcode.com/problems/container-with-most-water/)

**Difficulty:** Medium

## Problem

You are given an integer array `height` of length `n`.

There are `n` vertical lines drawn such that the two endpoints of the `ith` line are:

```text
(i, 0)
(i, height[i])
```

Find two lines that, together with the x-axis, form a container such that the container contains the **most water**.

Return the **maximum amount of water** a container can store.

**Notice:** You may not slant the container.

## Example 1

**Input:**

```text
height = [1,8,6,2,5,4,8,3,7]
```

**Output:**

```text
49
```

**Explanation:**

The maximum amount of water that can be stored is `49`.

The two selected lines have heights:

```text
8 and 7
```

and their distance is:

```text
8 - 1 = 7
```

Therefore:

```text
Area = min(8, 7) × 7
     = 7 × 7
     = 49
```

## Example 2

**Input:**

```text
height = [1,1]
```

**Output:**

```text
1
```

**Explanation:**

The width between the two lines is:

```text
1
```

The height of the container is:

```text
min(1, 1) = 1
```

Therefore:

```text
Area = 1 × 1 = 1
```

## Constraints

- `n == height.length`
- `2 <= n <= 10^5`
- `0 <= height[i] <= 10^4`

## Solution

The solution uses the **Two Pointer** technique.

Start with:

```text
i = 0
j = height.length - 1
```

At every step:

```text
width = j - i
height = min(height[i], height[j])
area = height × width
```

Update the maximum area.

To potentially find a larger container:

- If `height[i] > height[j]`, move `j` left.
- Otherwise, move `i` right.

The important idea is that the **shorter line limits the water height**. Moving the taller line cannot increase the container height, while moving the shorter line gives a chance to find a taller boundary.

See [`NOTES.md`](./NOTES.md) for the detailed explanation.

See [`solution.js`](./solution.js) for the implementation.

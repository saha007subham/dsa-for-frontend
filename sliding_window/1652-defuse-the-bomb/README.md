# [1652. Defuse the Bomb](https://leetcode.com/problems/defuse-the-bomb/)

**Difficulty:** Easy

## Problem

You have a bomb to defuse, and your time is running out!

Your informer will provide you with a **circular** array `code` of length `n` and a key `k`.

To decrypt the code, you must replace every number. All the numbers are replaced **simultaneously**.

- If `k > 0`, replace the `ith` number with the sum of the **next** `k` numbers.
- If `k < 0`, replace the `ith` number with the sum of the **previous** `-k` numbers.
- If `k == 0`, replace the `ith` number with `0`.

As `code` is circular:

- The next element of `code[n - 1]` is `code[0]`.
- The previous element of `code[0]` is `code[n - 1]`.

Given the **circular** array `code` and an integer key `k`, return the decrypted code to defuse the bomb.

## Example 1

**Input:**

```text
code = [5,7,1,4]
k = 3
```

**Output:**

```text
[12,10,16,13]
```

**Explanation:**

Each number is replaced by the sum of the next `3` numbers.

```text
Index 0 → 7 + 1 + 4 = 12
Index 1 → 1 + 4 + 5 = 10
Index 2 → 4 + 5 + 7 = 16
Index 3 → 5 + 7 + 1 = 13
```

The array is circular, so the elements wrap around.

## Example 2

**Input:**

```text
code = [1,2,3,4]
k = 0
```

**Output:**

```text
[0,0,0,0]
```

**Explanation:**

When `k` is zero, every number is replaced by `0`.

## Example 3

**Input:**

```text
code = [2,4,9,3]
k = -2
```

**Output:**

```text
[12,5,6,13]
```

**Explanation:**

Since `k` is negative, we use the previous `2` numbers:

```text
Index 0 → 3 + 9 = 12
Index 1 → 2 + 3 = 5
Index 2 → 4 + 2 = 6
Index 3 → 9 + 4 = 13
```

The elements wrap around because the array is circular.

## Constraints

- `n == code.length`
- `1 <= n <= 100`
- `1 <= code[i] <= 100`
- `-(n - 1) <= k <= n - 1`

## Solution

The solution uses a **Sliding Window** technique.

There are three cases:

1. `k == 0` → return an array filled with `0`.
2. `k > 0` → maintain a window containing the next `k` elements.
3. `k < 0` → maintain a window containing the previous `|k|` elements.

Instead of recalculating every window from scratch, the solution removes the element leaving the window and adds the new element entering the window.

Because the array is circular, modulo arithmetic is used to wrap indices around the array.

See [`NOTES.md`](./NOTES.md) for the detailed explanation.

See [`solution.js`](./solution.js) for the implementation.

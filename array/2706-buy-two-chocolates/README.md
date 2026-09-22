# [2706. Buy Two Chocolates](https://leetcode.com/problems/buy-two-chocolates/)

**Difficulty:** Easy

## Problem

You are given an integer array `prices` representing the prices of various chocolates in a store.

You are also given a single integer `money`, which represents your initial amount of money.

You must buy **exactly two chocolates** in such a way that you still have some **non-negative** leftover money.

You would like to minimize the sum of the prices of the two chocolates you buy.

Return the amount of money you will have leftover after buying the two chocolates.

If there is no way for you to buy two chocolates without ending up in debt, return `money`.

Note that the leftover must be non-negative.

## Example 1

**Input:**

```text
prices = [1,2,2]
money = 3
```

**Output:**

```text
0
```

**Explanation:**

Purchase the chocolates priced at `1` and `2`.

The total cost is:

```text
1 + 2 = 3
```

The leftover money is:

```text
3 - 3 = 0
```

Therefore, we return:

```text
0
```

## Example 2

**Input:**

```text
prices = [3,2,3]
money = 3
```

**Output:**

```text
3
```

**Explanation:**

The two cheapest chocolates cost:

```text
2 + 3 = 5
```

Since:

```text
5 > 3
```

we cannot buy two chocolates without going into debt.

Therefore, we return the original amount:

```text
3
```

## Constraints

- `2 <= prices.length <= 50`
- `1 <= prices[i] <= 100`
- `1 <= money <= 100`

## Solution

To minimize the total price of buying exactly two chocolates, we only need to find the **two smallest prices**.

The solution uses a single pass through the array and maintains:

- `first` — the smallest price found so far.
- `second` — the second smallest price found so far.

After finding both:

```text
totalSum = first + second
```

If the total is greater than `money`, return `money`.

Otherwise:

```text
leftover = money - totalSum
```

See [`NOTES.md`](./NOTES.md) for the detailed explanation.

See [`solution.js`](./solution.js) for the implementation.

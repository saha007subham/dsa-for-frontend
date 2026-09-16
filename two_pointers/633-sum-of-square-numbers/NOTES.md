# Notes — Sum of Square Numbers

## Approach

We need to determine whether a non-negative integer `c` can be represented as:

```text
a² + b² = c
```

The solution uses the **Two Pointer** technique.

Instead of trying every possible pair `(a, b)`, we start with:

```text
a = 0
b = √c
```

Then adjust the pointers based on the current sum.

---

## Step 1: Initialize Two Pointers

The solution starts with:

```js
let a = 0;
let b = Math.floor(Math.sqrt(c));
```

Why?

Because:

```text
a² >= 0
```

and therefore:

```text
b² <= c
```

So `b` never needs to be larger than `√c`.

For:

```text
c = 5
```

we get:

```text
a = 0
b = 2
```

because:

```text
√5 ≈ 2.23
```

and:

```text
Math.floor(√5) = 2
```

---

## Step 2: Calculate the Current Sum

Inside the loop:

```js
let sum = a * a + b * b;
```

This represents:

```text
a² + b²
```

We compare this value with `c`.

There are three possible cases.

---

## Case 1: Sum Equals `c`

```js
if (sum === c) {
  return true;
}
```

We found two integers whose squares add up to `c`.

For example:

```text
c = 5

a = 1
b = 2

1² + 2²
= 1 + 4
= 5
```

So we return:

```text
true
```

---

## Case 2: Sum Is Greater Than `c`

```js
if (sum > c) {
  b--;
}
```

Suppose:

```text
a² + b² > c
```

The sum is too large.

Since `a` is already the smaller pointer, increasing `a` would make the sum even larger.

Therefore, we decrease `b`:

```text
b--
```

This reduces:

```text
b²
```

and therefore reduces the total sum.

---

## Case 3: Sum Is Smaller Than `c`

```js
else {
    a++;
}
```

If:

```text
a² + b² < c
```

the sum is too small.

Since `b` is already the larger pointer, decreasing `b` would make the sum even smaller.

Therefore, we increase `a`:

```text
a++
```

This increases:

```text
a²
```

and therefore increases the total sum.

---

# Dry Run

Consider:

```text
c = 5
```

Initial:

```text
a = 0
b = 2
```

---

### Step 1

```text
a² + b²
= 0² + 2²
= 0 + 4
= 4
```

We have:

```text
4 < 5
```

So increase `a`:

```text
a = 1
```

---

### Step 2

Now:

```text
a = 1
b = 2
```

Calculate:

```text
1² + 2²
= 1 + 4
= 5
```

We found:

```text
sum === c
```

Therefore:

```text
return true
```

---

# Complete Dry Run

```text
c = 5
```

| `a` | `b` | `a² + b²` | Action                |
| --: | --: | --------: | --------------------- |
|   0 |   2 |         4 | Sum too small → `a++` |
|   1 |   2 |         5 | Found → `true`        |

---

# Example Where No Pair Exists

Consider:

```text
c = 3
```

Initial:

```text
a = 0
b = 1
```

### Step 1

```text
0² + 1² = 1
```

Since:

```text
1 < 3
```

increase `a`:

```text
a = 1
```

### Step 2

Now:

```text
a = 1
b = 1
```

Calculate:

```text
1² + 1² = 2
```

Still:

```text
2 < 3
```

Increase `a`:

```text
a = 2
```

Now:

```text
a > b
```

The loop stops.

No valid pair exists, so:

```text
return false
```

---

# Why Does the Two Pointer Approach Work?

The values are considered in an ordered range:

```text
a = 0 → √c
b = √c → 0
```

At every step:

- If the sum is too large, decrease `b`.
- If the sum is too small, increase `a`.

Because increasing `a` increases `a²`, and decreasing `b` decreases `b²`, each pointer movement moves the sum in the required direction.

This allows us to search the possible pairs without checking every combination.

---

# Code Breakdown

## Initialize Pointers

```js
let a = 0;
let b = Math.floor(Math.sqrt(c));
```

`a` starts at the smallest possible value.

`b` starts at the largest value that could possibly participate.

---

## Continue While Pointers Don't Cross

```js
while (a <= b)
```

We continue while there are still possible pairs to check.

---

## Calculate Sum

```js
let sum = a * a + b * b;
```

Calculate:

```text
a² + b²
```

---

## Found the Answer

```js
if (sum === c) {
  return true;
}
```

Return `true` immediately when a valid pair is found.

---

## Sum Too Large

```js
if (sum > c) {
  b--;
}
```

Decrease `b` to reduce the sum.

---

## Sum Too Small

```js
else {
    a++;
}
```

Increase `a` to increase the sum.

---

## No Pair Found

If the loop finishes:

```js
return false;
```

No pair of integers satisfies:

```text
a² + b² = c
```

---

# Complexity

Let:

```text
c = input number
```

The pointers start at:

```text
a = 0
b = √c
```

Each iteration moves either `a` forward or `b` backward.

Therefore, there are at most `O(√c)` iterations.

## Time Complexity

```text
O(√c)
```

## Space Complexity

Only two pointers and a few variables are used:

```text
a
b
sum
```

Therefore:

```text
O(1)
```

---

# Key Takeaways

### 1. Two Pointer Pattern

When searching for two values that satisfy a condition and the search space is ordered, consider the **Two Pointer** technique.

### 2. Start at Both Ends

For this problem:

```text
a = 0
b = √c
```

Then move the pointers toward each other.

### 3. Control the Sum

```text
sum > c → b--
sum < c → a++
sum = c → true
```

### 4. Reduce the Search Space

A brute-force approach could try many combinations of `a` and `b`.

The Two Pointer approach reduces the search to:

```text
O(√c)
```

---

# Pattern to Remember

```text
a = 0
b = √c

while (a <= b):

    sum = a² + b²

    sum == c → Found
    sum > c  → b--
    sum < c  → a++
```

**Pattern:** Two Pointers + Mathematical Search Space

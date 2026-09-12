# Notes — Count Partitions with Even Sum Difference

## Approach

We need to count the number of ways to split the array into two non-empty parts such that:

```text
leftSum - rightSum
```

is even.

A partition can be made after every index except the last one.

The solution uses:

1. Calculate the total sum of the array.
2. Traverse the array from left to right.
3. Maintain the running `leftSum`.
4. Calculate `rightSum` using:

```text
rightSum = totalSum - leftSum
```

5. Check whether the difference is even.

---

## Step 1: Calculate the Total Sum

First, calculate the sum of all elements:

```js
let totalSum = 0;

for (let i = 0; i < arr.length; i++) {
  totalSum = totalSum + arr[i];
}
```

For example:

```text
arr = [10, 10, 3, 7, 6]
```

The total sum is:

```text
10 + 10 + 3 + 7 + 6 = 36
```

So:

```text
totalSum = 36
```

---

## Step 2: Maintain the Left Sum

We start with:

```js
let leftSum = 0;
```

For every possible partition, add the current element to `leftSum`:

```js
leftSum = leftSum + arr[i];
```

The loop runs only until:

```js
i < arr.length - 1;
```

because the partition must create two **non-empty** subarrays.

---

## Step 3: Calculate the Right Sum

Instead of calculating the right sum separately, we use the total sum:

```js
let rightSum = totalSum - leftSum;
```

Why does this work?

Because:

```text
totalSum = leftSum + rightSum
```

Therefore:

```text
rightSum = totalSum - leftSum
```

This avoids another loop.

---

## Step 4: Check Whether the Difference Is Even

For every partition:

```js
if ((leftSum - rightSum) % 2 === 0) {
  evenCount++;
}
```

If the difference is divisible by `2`, it is even.

---

# Dry Run

Consider:

```text
arr = [10, 10, 3, 7, 6]
```

Total sum:

```text
totalSum = 36
```

Initially:

```text
leftSum = 0
evenCount = 0
```

---

### Partition after index 0

Add `arr[0]`:

```text
leftSum = 0 + 10
        = 10
```

Calculate right sum:

```text
rightSum = 36 - 10
         = 26
```

Difference:

```text
10 - 26 = -16
```

`-16` is even.

So:

```text
evenCount = 1
```

Partition:

```text
[10] | [10,3,7,6]
```

---

### Partition after index 1

```text
leftSum = 10 + 10
        = 20
```

```text
rightSum = 36 - 20
         = 16
```

Difference:

```text
20 - 16 = 4
```

`4` is even.

So:

```text
evenCount = 2
```

Partition:

```text
[10,10] | [3,7,6]
```

---

### Partition after index 2

```text
leftSum = 20 + 3
        = 23
```

```text
rightSum = 36 - 23
         = 13
```

Difference:

```text
23 - 13 = 10
```

`10` is even.

So:

```text
evenCount = 3
```

Partition:

```text
[10,10,3] | [7,6]
```

---

### Partition after index 3

```text
leftSum = 23 + 7
        = 30
```

```text
rightSum = 36 - 30
         = 6
```

Difference:

```text
30 - 6 = 24
```

`24` is even.

So:

```text
evenCount = 4
```

Partition:

```text
[10,10,3,7] | [6]
```

---

### Final Answer

```text
4
```

---

# Complete Dry Run Table

For:

```text
arr = [10,10,3,7,6]
totalSum = 36
```

| Index | Left Sum | Right Sum | Difference | Even? | Count |
| ----: | -------: | --------: | ---------: | :---: | ----: |
|     0 |       10 |        26 |        -16 |  Yes  |     1 |
|     1 |       20 |        16 |          4 |  Yes  |     2 |
|     2 |       23 |        13 |         10 |  Yes  |     3 |
|     3 |       30 |         6 |         24 |  Yes  |     4 |

Final:

```text
4
```

---

# Important Observation

There is an interesting mathematical observation behind this problem.

We know:

```text
leftSum + rightSum = totalSum
```

We want:

```text
leftSum - rightSum
```

to be even.

Since subtraction and addition have the same parity:

```text
leftSum - rightSum
```

is even exactly when `leftSum` and `rightSum` have the same parity.

And because:

```text
totalSum = leftSum + rightSum
```

this happens exactly when the **total sum is even**.

Therefore:

- If `totalSum` is **odd**, every partition has an odd difference → answer is `0`.
- If `totalSum` is **even**, every valid partition has an even difference → answer is `n - 1`.

So this problem can actually be solved in `O(n)` time with a single sum calculation.

However, the implementation provided here directly checks every partition, which is also `O(n)`.

---

# Code Breakdown

## Calculate Total Sum

```js
let totalSum = 0;

for (let i = 0; i < arr.length; i++) {
  totalSum = totalSum + arr[i];
}
```

Calculates the sum of the entire array.

---

## Traverse Possible Partitions

```js
for (let i = 0; i < arr.length - 1; i++) {
```

We stop at `arr.length - 2` because the right subarray must contain at least one element.

---

## Update Left Sum

```js
leftSum = leftSum + arr[i];
```

Adds the current element to the left subarray.

---

## Calculate Right Sum

```js
let rightSum = totalSum - leftSum;
```

The remaining elements automatically form the right subarray.

---

## Check Even Difference

```js
if ((leftSum - rightSum) % 2 === 0) {
  evenCount++;
}
```

If the difference is even, increment the answer.

---

# Complexity

Let `n` be the length of the array.

## Time Complexity

There are two loops:

```text
Calculate total sum → O(n)
Check partitions    → O(n)
```

Therefore:

```text
O(n) + O(n) = O(n)
```

Overall:

```text
Time Complexity: O(n)
```

## Space Complexity

Only a few variables are used:

```js
totalSum;
evenCount;
leftSum;
rightSum;
```

No additional array or data structure is created.

Therefore:

```text
Space Complexity: O(1)
```

---

# Key Takeaways

### 1. Prefix/Running Sum

Maintain a running sum instead of recalculating the sum of the left part for every partition.

```js
leftSum = leftSum + arr[i];
```

### 2. Total Sum Trick

Once the total sum is known:

```text
rightSum = totalSum - leftSum
```

This avoids another traversal for every partition.

### 3. Non-Empty Partitions

The loop must stop at:

```js
i < arr.length - 1;
```

because splitting after the last element would leave the right subarray empty.

### 4. Parity Observation

If:

```text
totalSum = leftSum + rightSum
```

then the difference:

```text
leftSum - rightSum
```

is even exactly when the total sum is even.

This means an even total sum makes **every valid partition** satisfy the condition.

---

# Pattern to Remember

When a problem asks about splitting an array into:

```text
Left Part | Right Part
```

and asks about sums, immediately think about:

```text
Total Sum
Left Sum
Right Sum = Total Sum - Left Sum
```

This is a very useful **running sum + total sum** pattern.

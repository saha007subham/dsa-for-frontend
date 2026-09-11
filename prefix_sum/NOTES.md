# Notes — Left and Right Sum Differences

## Approach

For every index `i`, we need:

```text
leftSum[i]  = sum of elements to the left
rightSum[i] = sum of elements to the right
```

Then:

```text
answer[i] = |leftSum[i] - rightSum[i]|
```

In this solution, we create two separate arrays:

```js
leftArr;
rightArr;
```

and then create the final answer array.

The important pattern here is **Prefix Sum + Suffix Sum**.

---

## Step 1: Initialize Arrays

```js
const leftArr = [];
const rightArr = [];
let ansArr = [];
```

- `leftArr` stores the sum of elements on the left.
- `rightArr` stores the sum of elements on the right.
- `ansArr` stores the final result.

For the first element, there is nothing on its left:

```js
leftArr[0] = 0;
```

For the last element, there is nothing on its right:

```js
rightArr[arr.length - 1] = 0;
```

---

## Step 2: Build the Left Sum Array

The solution uses:

```js
for (let i = 1; i < arr.length; i++) {
  leftArr[i] = arr[i - 1] + leftArr[i - 1];
}
```

The idea is:

```text
leftArr[i] = previous left sum + previous element
```

### Example

```text
arr = [10, 4, 8, 3]
```

Initially:

```text
leftArr[0] = 0
```

For `i = 1`:

```text
leftArr[1] = arr[0] + leftArr[0]
           = 10 + 0
           = 10
```

For `i = 2`:

```text
leftArr[2] = arr[1] + leftArr[1]
           = 4 + 10
           = 14
```

For `i = 3`:

```text
leftArr[3] = arr[2] + leftArr[2]
           = 8 + 14
           = 22
```

So:

```text
leftArr = [0, 10, 14, 22]
```

---

## Step 3: Build the Right Sum Array

Now we calculate the sum of elements to the right.

The solution traverses from right to left:

```js
for (let i = arr.length - 2; i >= 0; i--) {
  rightArr[i] = arr[i + 1] + rightArr[i + 1];
}
```

The idea is:

```text
rightArr[i] = next element + right sum of next index
```

### Example

```text
arr = [10, 4, 8, 3]
```

Initially:

```text
rightArr[3] = 0
```

For `i = 2`:

```text
rightArr[2] = arr[3] + rightArr[3]
            = 3 + 0
            = 3
```

For `i = 1`:

```text
rightArr[1] = arr[2] + rightArr[2]
            = 8 + 3
            = 11
```

For `i = 0`:

```text
rightArr[0] = arr[1] + rightArr[1]
            = 4 + 11
            = 15
```

So:

```text
rightArr = [15, 11, 3, 0]
```

---

## Step 4: Build the Answer

Now we have:

```text
leftArr  = [0, 10, 14, 22]
rightArr = [15, 11, 3, 0]
```

We calculate:

```js
ansArr[i] = Math.abs(leftArr[i] - rightArr[i]);
```

For index `0`:

```text
|0 - 15| = 15
```

For index `1`:

```text
|10 - 11| = 1
```

For index `2`:

```text
|14 - 3| = 11
```

For index `3`:

```text
|22 - 0| = 22
```

Therefore:

```text
ansArr = [15, 1, 11, 22]
```

---

## Complete Dry Run

```text
arr = [10, 4, 8, 3]
```

### Left Sum

```text
Index:      0   1   2   3
arr:       10   4   8   3
leftArr:    0  10  14  22
```

### Right Sum

```text
Index:       0   1   2   3
arr:        10   4   8   3
rightArr:   15  11   3   0
```

### Final Answer

```text
Index 0 → |0  - 15| = 15
Index 1 → |10 - 11| = 1
Index 2 → |14 - 3 | = 11
Index 3 → |22 - 0 | = 22
```

Final:

```text
[15, 1, 11, 22]
```

---

## Why Does This Work?

For every index `i`:

```text
leftArr[i]
```

contains exactly the sum of all elements before `i`.

Similarly:

```text
rightArr[i]
```

contains exactly the sum of all elements after `i`.

Therefore:

```js
Math.abs(leftArr[i] - rightArr[i]);
```

gives the required answer for that index.

---

## Code Breakdown

### Build Left Sum

```js
leftArr[0] = 0;

for (let i = 1; i < arr.length; i++) {
  leftArr[i] = arr[i - 1] + leftArr[i - 1];
}
```

We move from left to right and reuse the previously calculated sum.

---

### Build Right Sum

```js
rightArr[arr.length - 1] = 0;

for (let i = arr.length - 2; i >= 0; i--) {
  rightArr[i] = arr[i + 1] + rightArr[i + 1];
}
```

We move from right to left and reuse the previously calculated sum.

---

### Build Answer

```js
for (let i = 0; i < arr.length; i++) {
  ansArr[i] = Math.abs(leftArr[i] - rightArr[i]);
}
```

For each index, calculate the absolute difference between the left and right sums.

---

## Complexity

Let `n` be the length of the array.

### Time Complexity

There are three loops:

```text
Build leftArr  → O(n)
Build rightArr → O(n)
Build ansArr   → O(n)
```

Therefore:

```text
O(n) + O(n) + O(n) = O(n)
```

Overall:

```text
Time: O(n)
```

### Space Complexity

We create three arrays:

```text
leftArr  → O(n)
rightArr → O(n)
ansArr   → O(n)
```

Therefore:

```text
Space: O(n)
```

---

## Key Takeaways

### 1. Prefix Sum

When a problem asks for the sum of elements before every index, think:

```text
Prefix Sum
```

Pattern:

```js
leftArr[i] = leftArr[i - 1] + arr[i - 1];
```

### 2. Suffix Sum

When a problem asks for the sum of elements after every index, think:

```text
Suffix Sum
```

Pattern:

```js
rightArr[i] = rightArr[i + 1] + arr[i + 1];
```

### 3. Avoid Recalculating

A brute-force solution could calculate the left and right sums independently for every index, resulting in:

```text
O(n²)
```

By reusing previously calculated sums, we reduce the time complexity to:

```text
O(n)
```

### Pattern to Remember

```text
Left side  → Traverse from left to right
Right side → Traverse from right to left
```

This is a very common **Prefix Sum / Suffix Sum** pattern in array problems.

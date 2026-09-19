# Notes — Defuse the Bomb

## Approach

The array is **circular**, and for every index we need the sum of a fixed number of neighboring elements.

This makes the problem a perfect candidate for the **Sliding Window** technique.

The solution handles three cases:

```text
k == 0
k > 0
k < 0
```

For positive `k`, we maintain a window of the **next `k` elements**.

For negative `k`, we maintain a window of the **previous `|k|` elements**.

Instead of calculating each sum from scratch, we update the current window by:

```text
remove the element leaving the window
+
add the element entering the window
```

This reduces the solution to `O(n)` time.

---

# Step 1: Handle `k == 0`

If:

```js
if (k === 0) {
  return new Array(n).fill(0);
}
```

When `k` is zero, every number must be replaced with `0`.

For example:

```text
code = [1,2,3,4]
k = 0
```

Result:

```text
[0,0,0,0]
```

No sliding window is required.

---

# Step 2: Initialize the Result Array

For non-zero `k`:

```js
const res = new Array(n).fill(0);
const len = Math.abs(k);

let sum = 0;
```

Here:

```text
res → stores the decrypted code
len → number of elements in the window
sum → current sliding-window sum
```

For example, if:

```text
k = -3
```

then:

```text
len = Math.abs(-3)
    = 3
```

---

# Positive `k`

Suppose:

```text
k > 0
```

We need the sum of the **next `k` elements** for every index.

---

## Step 3: Build the Initial Window

The solution uses:

```js
for (let i = 1; i <= k; i++) {
  sum += code[i % n];
}
```

For index `0`, the next `k` elements are:

```text
code[1], code[2], ..., code[k]
```

The `% n` handles circular wrapping.

For example:

```text
code = [5,7,1,4]
k = 3
```

For index `0`, the next 3 elements are:

```text
7 + 1 + 4 = 12
```

The loop calculates:

```text
sum = 12
```

Then:

```js
res[0] = sum;
```

So:

```text
res = [12,0,0,0]
```

---

# Step 4: Slide the Positive Window

After calculating the first window, we move to index `1`.

The solution uses:

```js
for (let i = 1; i < n; i++) {
  sum -= code[i % n];
  sum += code[(i + k) % n];

  res[i] = sum;
}
```

The important idea is:

```text
remove the old first element
add the new last element
```

---

## Positive `k` Dry Run

Consider:

```text
code = [5,7,1,4]
k = 3
```

Initial window for index `0`:

```text
7 + 1 + 4 = 12
```

So:

```text
res[0] = 12
```

---

### Move to Index 1

The previous window was:

```text
[7, 1, 4]
```

For index `1`, we need:

```text
[1, 4, 5]
```

Remove:

```text
7
```

Add:

```text
5
```

So:

```text
sum = 12 - 7 + 5
    = 10
```

Therefore:

```text
res[1] = 10
```

---

### Move to Index 2

Previous window:

```text
[1, 4, 5]
```

New window:

```text
[4, 5, 7]
```

Remove:

```text
1
```

Add:

```text
7
```

Therefore:

```text
sum = 10 - 1 + 7
    = 16
```

So:

```text
res[2] = 16
```

---

### Move to Index 3

Previous window:

```text
[4, 5, 7]
```

New window:

```text
[5, 7, 1]
```

Remove:

```text
4
```

Add:

```text
1
```

Therefore:

```text
sum = 16 - 4 + 1
    = 13
```

So:

```text
res[3] = 13
```

Final:

```text
[12,10,16,13]
```

---

# Positive `k` Dry Run Table

```text
code = [5,7,1,4]
k = 3
```

| Index | Window    | Remove | Add | Sum |
| ----: | --------- | ------ | --- | --: |
|     0 | `[7,1,4]` | —      | —   |  12 |
|     1 | `[1,4,5]` | 7      | 5   |  10 |
|     2 | `[4,5,7]` | 1      | 7   |  16 |
|     3 | `[5,7,1]` | 4      | 1   |  13 |

Result:

```text
[12,10,16,13]
```

---

# Why `% n` Is Used

Because the array is circular.

Suppose:

```text
code = [5,7,1,4]
```

The next element after index `3` is index `0`.

So:

```text
next of index 3 → index 0
```

Modulo gives us exactly this behavior:

```text
(3 + 1) % 4 = 0
```

Similarly:

```text
(3 + 2) % 4 = 1
```

Therefore, modulo arithmetic allows us to wrap around the circular array.

---

# Negative `k`

Now consider:

```text
k < 0
```

In this case, we need the sum of the **previous `-k` elements**.

The solution first calculates:

```js
const len = Math.abs(k);
```

For example:

```text
k = -2

len = 2
```

So we need the previous `2` elements.

---

# Step 5: Build the Initial Negative Window

For index `0`, the previous `len` elements are located at the end of the array.

The solution uses:

```js
for (let i = 1; i <= len; i++) {
  sum += code[(n - i) % n];
}
```

For:

```text
code = [2,4,9,3]
k = -2
```

The previous two elements of index `0` are:

```text
3 and 9
```

Therefore:

```text
sum = 3 + 9
    = 12
```

So:

```text
res[0] = 12
```

---

# Step 6: Slide the Negative Window

The solution uses:

```js
for (let i = 1; i < n; i++) {
  sum -= code[(i - len - 1 + n) % n];
  sum += code[(i - 1 + n) % n];

  res[i] = sum;
}
```

The same sliding-window idea is used:

```text
remove the element leaving the window
add the element entering the window
```

The difference is that the window moves through the **previous elements** instead of the next elements.

---

# Negative `k` Dry Run

Consider:

```text
code = [2,4,9,3]
k = -2
```

Therefore:

```text
len = 2
```

---

### Index 0

Previous two elements:

```text
3 + 9 = 12
```

So:

```text
res[0] = 12
```

---

### Index 1

Previous two elements:

```text
2 + 3 = 5
```

The previous window was:

```text
[3,9]
```

Remove:

```text
9
```

Add:

```text
2
```

Therefore:

```text
sum = 12 - 9 + 2
    = 5
```

So:

```text
res[1] = 5
```

---

### Index 2

Previous two elements:

```text
4 + 2 = 6
```

Remove:

```text
3
```

Add:

```text
4
```

Therefore:

```text
sum = 5 - 3 + 4
    = 6
```

So:

```text
res[2] = 6
```

---

### Index 3

Previous two elements:

```text
9 + 4 = 13
```

Remove:

```text
2
```

Add:

```text
9
```

Therefore:

```text
sum = 6 - 2 + 9
    = 13
```

So:

```text
res[3] = 13
```

Final:

```text
[12,5,6,13]
```

---

# Negative `k` Dry Run Table

```text
code = [2,4,9,3]
k = -2
```

| Index | Previous Elements | Remove | Add | Sum |
| ----: | ----------------- | ------ | --- | --: |
|     0 | `[3,9]`           | —      | —   |  12 |
|     1 | `[2,3]`           | 9      | 2   |   5 |
|     2 | `[4,2]`           | 3      | 4   |   6 |
|     3 | `[9,4]`           | 2      | 9   |  13 |

Result:

```text
[12,5,6,13]
```

---

# Code Breakdown

## Handle `k == 0`

```js
if (k === 0) {
  return new Array(n).fill(0);
}
```

Every value becomes zero.

---

## Calculate Window Length

```js
const len = Math.abs(k);
```

This gives the number of elements in the sliding window.

---

## Positive `k`

Initial window:

```js
for (let i = 1; i <= k; i++) {
  sum += code[i % n];
}
```

Then slide:

```js
for (let i = 1; i < n; i++) {
  sum -= code[i % n];
  sum += code[(i + k) % n];

  res[i] = sum;
}
```

---

## Negative `k`

Initial previous-elements window:

```js
for (let i = 1; i <= len; i++) {
  sum += code[(n - i) % n];
}
```

Then slide:

```js
for (let i = 1; i < n; i++) {
  sum -= code[(i - len - 1 + n) % n];
  sum += code[(i - 1 + n) % n];

  res[i] = sum;
}
```

---

# Why Sliding Window Is Better

A straightforward solution could calculate the required `k` elements separately for every index.

That would repeatedly calculate overlapping sums.

For example:

```text
Window 1 → [7,1,4]
Window 2 → [1,4,5]
```

Most elements are shared.

Instead of calculating:

```text
7 + 1 + 4
1 + 4 + 5
```

from scratch, we use:

```text
previous sum - removed element + added element
```

For example:

```text
12 - 7 + 5 = 10
```

This makes the algorithm much more efficient.

---

# Complexity

Let `n` be the length of `code`.

## Time Complexity

The initial window takes:

```text
O(|k|)
```

Then we process every index once:

```text
O(n)
```

Therefore:

```text
O(|k| + n)
```

Since the constraints guarantee:

```text
|k| <= n - 1
```

this simplifies to:

```text
O(n)
```

## Space Complexity

The solution creates:

```js
res;
```

which contains `n` elements.

Therefore:

```text
Space Complexity: O(n)
```

The sliding-window variables themselves use:

```text
O(1)
```

additional working space.

So:

```text
Output space: O(n)
Extra auxiliary space: O(1)
```

---

# Key Takeaways

### 1. Circular Array

When an array is circular, modulo is useful:

```js
index % n;
```

It allows indices to wrap around.

---

### 2. Sliding Window

When every answer requires the sum of a fixed number of neighboring elements, think:

```text
Sliding Window
```

Instead of recalculating:

```text
new sum = sum of entire window
```

use:

```text
new sum = old sum - outgoing + incoming
```

---

### 3. Positive `k`

For:

```text
k > 0
```

use the **next `k` elements**.

```text
current → [next k elements]
```

---

### 4. Negative `k`

For:

```text
k < 0
```

use the **previous `|k|` elements**.

```text
[previous |k| elements] ← current
```

---

### 5. Zero `k`

For:

```text
k == 0
```

the answer is immediately:

```text
[0,0,...,0]
```

---

# Pattern to Remember

```text
k == 0
    ↓
return all zeros

k > 0
    ↓
next k elements
    ↓
sliding window

k < 0
    ↓
previous |k| elements
    ↓
sliding window

Circular array
    ↓
use modulo (% n)
```

**Pattern:** Circular Array + Sliding Window

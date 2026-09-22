# Notes — Buy Two Chocolates

## Approach

We need to buy **exactly two chocolates** while minimizing the total amount spent.

To minimize the total price, we simply need to find the:

```text
1st smallest price
2nd smallest price
```

The solution does this in a **single traversal** using two variables:

```js
first;
second;
```

Then:

```text
total cost = first + second
```

If we can afford the two chocolates:

```text
leftover = money - total cost
```

Otherwise, return the original `money`.

---

## Step 1: Find the Two Minimum Prices

The solution calls:

```js
let { first, second } = findTwoMinimum(prices);
```

The helper function maintains:

```js
let first = 101;
let second = 101;
```

Why `101`?

Because the constraints say:

```text
1 <= prices[i] <= 100
```

So `101` is larger than every possible chocolate price and works as an initial value.

---

# Step 2: Traverse the Array

The helper function loops through every price:

```js
for (let i = 0; i < arr.length; i++) {
```

For every price, there are two important cases.

---

## Case 1: Current Price Is Smaller Than `first`

```js
if (arr[i] < first) {
  second = first;
  first = arr[i];
}
```

If the current price becomes the new smallest price:

1. The previous `first` becomes `second`.
2. The current price becomes the new `first`.

For example:

```text
first = 5
second = 8
current = 2
```

After processing `2`:

```text
first = 2
second = 5
```

---

## Case 2: Current Price Is Between `first` and `second`

```js
else if (arr[i] < second) {
    second = arr[i];
}
```

If the current price is not smaller than `first`, but is smaller than `second`, it becomes the new second minimum.

For example:

```text
first = 2
second = 8
current = 5
```

After processing:

```text
first = 2
second = 5
```

---

# Dry Run

Consider:

```text
prices = [1,2,2]
money = 3
```

Initially:

```text
first = 101
second = 101
```

---

### i = 0

Current price:

```text
1
```

Since:

```text
1 < 101
```

we execute:

```js
second = first;
first = 1;
```

Now:

```text
first = 1
second = 101
```

---

### i = 1

Current price:

```text
2
```

Check:

```text
2 < first?
2 < 1 → false
```

Then:

```text
2 < second?
2 < 101 → true
```

So:

```text
second = 2
```

Now:

```text
first = 1
second = 2
```

---

### i = 2

Current price:

```text
2
```

Check:

```text
2 < first?
2 < 1 → false
```

Then:

```text
2 < second?
2 < 2 → false
```

Nothing changes.

Final:

```text
first = 1
second = 2
```

---

# Step 3: Calculate Total Cost

The main function calculates:

```js
let totalSum = first + second;
```

Therefore:

```text
totalSum = 1 + 2
         = 3
```

---

# Step 4: Check Whether We Can Afford Them

We compare:

```js
if (totalSum > money) return money;
```

Here:

```text
3 > 3
```

is false.

So we can afford the chocolates.

Return:

```js
return money - totalSum;
```

Therefore:

```text
3 - 3 = 0
```

Final answer:

```text
0
```

---

# Complete Dry Run

```text
prices = [1,2,2]
money = 3
```

| Current Price | `first` | `second` | Action             |
| ------------: | ------: | -------: | ------------------ |
|             1 |       1 |      101 | New minimum        |
|             2 |       1 |        2 | New second minimum |
|             2 |       1 |        2 | No change          |

Final:

```text
first = 1
second = 2
```

Cost:

```text
1 + 2 = 3
```

Leftover:

```text
3 - 3 = 0
```

---

# Example Where We Cannot Afford Two Chocolates

Consider:

```text
prices = [3,2,3]
money = 3
```

The two smallest prices are:

```text
first = 2
second = 3
```

Total cost:

```text
2 + 3 = 5
```

But:

```text
5 > 3
```

Therefore, we cannot buy two chocolates.

The solution returns:

```text
money
```

which is:

```text
3
```

---

# Code Breakdown

## Find Two Minimum Values

```js
function findTwoMinimum(arr) {
  let first = 101;
  let second = 101;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < first) {
      second = first;
      first = arr[i];
    } else if (arr[i] < second) {
      second = arr[i];
    }
  }

  return { first, second };
}
```

This function finds the two smallest values without sorting the array.

---

## Calculate Total Cost

```js
let { first, second } = findTwoMinimum(prices);

let totalSum = first + second;
```

The two minimum prices give us the minimum possible cost of buying exactly two chocolates.

---

## Check the Budget

```js
if (totalSum > money) return money;
```

If the cheapest possible pair is still too expensive, no valid purchase exists.

---

## Calculate Leftover

```js
return money - totalSum;
```

If we can afford the chocolates, subtract their total cost from the available money.

---

# Why Don't We Sort the Array?

A simple approach would be:

```js
prices.sort((a, b) => a - b);
```

and then:

```text
prices[0] + prices[1]
```

But sorting takes:

```text
O(n log n)
```

We don't need the entire array sorted.

We only need the **two smallest values**.

Therefore, we can find them in one traversal:

```text
O(n)
```

This is more efficient.

---

# Complexity

Let `n` be the number of chocolate prices.

## Time Complexity

We traverse the array once:

```text
O(n)
```

The remaining operations are constant time.

Therefore:

```text
Time Complexity: O(n)
```

## Space Complexity

We only use:

```text
first
second
totalSum
```

No additional array or data structure is created.

Therefore:

```text
Space Complexity: O(1)
```

---

# Key Takeaways

### 1. Need Two Smallest Values?

Don't automatically sort.

If you only need the smallest two values, maintain:

```text
first minimum
second minimum
```

in one pass.

---

### 2. Update Both Minimums

When a new smallest value is found:

```js
second = first;
first = current;
```

The old smallest value becomes the second smallest.

---

### 3. Minimize Cost

Because we must buy exactly two chocolates, the minimum possible cost is always:

```text
smallest price + second smallest price
```

---

### 4. No Need for Sorting

Instead of:

```text
O(n log n)
```

sorting, we can find the required values in:

```text
O(n)
```

---

# Pattern to Remember

```text
Traverse array
      ↓
Find smallest
      ↓
Find second smallest
      ↓
Calculate total cost
      ↓
Can afford?
  ↙          ↘
Yes           No
 ↓             ↓
money-cost    return money
```

**Pattern:** Find Two Minimum Values in One Pass

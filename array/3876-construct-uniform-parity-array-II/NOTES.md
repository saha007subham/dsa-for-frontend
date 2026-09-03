# Notes — 3876. Construct Uniform Parity Array II

## Approach

The key idea is to work with the **parity** of the numbers.

A number is:

- **Even** if `number % 2 === 0`
- **Odd** if `number % 2 !== 0`

We need to construct `nums2` such that **all elements have the same parity**.

The allowed operations are:

1. Keep `nums1[i]`
2. Replace it with `nums1[i] - nums1[j]`, where `i !== j` and the difference is at least `1`.

---

## Key Observation

First, sort the array:

```javascript
nums1.sort((a, b) => a - b);
```

After sorting:

```text
nums1[0]
```

is the **smallest element**.

We use this smallest element as the number to subtract whenever the current element has a different parity from the smallest element.

Why is this safe?

Because:

```text
nums1[i] >= nums1[0]
```

and because all numbers are distinct:

```text
nums1[i] > nums1[0]
```

for every `i > 0`.

Therefore:

```text
nums1[i] - nums1[0] >= 1
```

So the subtraction is always a valid operation.

---

## Choosing the Target Parity

We choose the parity of the smallest element as our target:

```javascript
let smallestParity = nums1[0] % 2;
```

For example:

```text
nums1 = [1, 4, 7]
```

After sorting:

```text
[1, 4, 7]
```

The smallest element is:

```text
1 → Odd
```

Therefore, our target parity is **odd**.

---

## Processing Each Element

For every element after the first one, we have two options.

### Option 1 — Keep the Element

If its parity already matches the smallest element:

```javascript
if (nums1[i] % 2 === smallestParity) {
    continue;
}
```

There is nothing to change.

For example:

```text
smallestParity = 1
nums1[i] = 7

7 % 2 = 1
```

Both are odd, so we can simply keep `7`.

---

### Option 2 — Subtract the Smallest Element

If the current element has a different parity, we try:

```javascript
let difference = nums1[i] - nums1[0];
```

The important parity rule is:

```text
Same parity - Same parity = Even
Different parity - Different parity = Odd
```

More specifically:

```text
Odd - Odd   = Even
Even - Even = Even

Odd - Even  = Odd
Even - Odd  = Odd
```

So we calculate the difference and check whether its parity matches our target:

```javascript
if (difference % 2 === smallestParity) {
    continue;
}
```

If it matches, we can use the subtraction operation.

---

## When Do We Return False?

If:

1. The current element does not have the target parity, and
2. Subtracting the smallest element also does not produce the target parity,

then there is no valid way to make this element have the required parity.

Therefore:

```javascript
return false;
```

---

## Dry Run

### Example 1

```text
nums1 = [1, 4, 7]
```

### Step 1 — Sort

```text
[1, 4, 7]
```

### Step 2 — Get Smallest Parity

```text
nums1[0] = 1

1 % 2 = 1
```

So:

```text
smallestParity = 1
```

Target parity = **Odd**

### Step 3 — Process `4`

```text
4 % 2 = 0
```

`4` is even, so its parity doesn't match.

Subtract the smallest element:

```text
4 - 1 = 3
```

Now:

```text
3 % 2 = 1
```

The result is odd, which matches the target.

So we can use:

```text
4 → 4 - 1 = 3
```

### Step 4 — Process `7`

```text
7 % 2 = 1
```

`7` is already odd.

Keep it as it is:

```text
7 → 7
```

Therefore, we can construct:

```text
nums2 = [1, 3, 7]
```

All elements are odd.

Result:

```text
true
```

---

## Dry Run — Example 2

```text
nums1 = [2, 3]
```

The array is already sorted:

```text
[2, 3]
```

Smallest element:

```text
2
```

Therefore:

```text
smallestParity = 2 % 2 = 0
```

Target parity = **Even**

### Process `3`

`3` is odd:

```text
3 % 2 = 1
```

So we try subtracting the smallest element:

```text
3 - 2 = 1
```

Check its parity:

```text
1 % 2 = 1
```

It is still odd.

The target parity is even:

```text
1 !== 0
```

Therefore:

```javascript
return false;
```

Result:

```text
false
```

---

## Dry Run — Example 3

```text
nums1 = [4, 6]
```

Already sorted:

```text
[4, 6]
```

Smallest element:

```text
4
```

Target parity:

```text
4 % 2 = 0
```

So the target is even.

Process `6`:

```text
6 % 2 = 0
```

`6` already has the target parity.

Therefore, we keep it.

We can simply construct:

```text
nums2 = [4, 6]
```

Result:

```text
true
```

---

## Why Sorting Is Important

Without sorting, the first element may not be the smallest.

Consider:

```text
[4, 1, 7]
```

If we directly used `nums1[0] = 4`, then for `1`:

```text
1 - 4 = -3
```

which is invalid because the difference must be at least `1`.

After sorting:

```text
[1, 4, 7]
```

Now the smallest element is always available:

```text
1
```

and every other element can safely subtract it.

Therefore, sorting allows us to use:

```javascript
nums1[0];
```

as a valid subtraction candidate for every other element.

---

## Complete Solution

The implementation is available in [`solution.js`](./solution.js).

```javascript
/**
 * @param {number[]} nums1
 * @return {boolean}
 */
var uniformArray = function (nums1) {
  nums1.sort((a, b) => a - b);

  let smallestParity = nums1[0] % 2;

  for (let i = 1; i < nums1.length; i++) {
    // Keep nums1[i]
    if (nums1[i] % 2 === smallestParity) {
      continue;
    }

    // Subtract the smallest element
    let difference = nums1[i] - nums1[0];

    if (difference % 2 === smallestParity) {
      continue;
    }

    return false;
  }

  return true;
};
```

---

## Code Breakdown

### Sort the Array

```javascript
nums1.sort((a, b) => a - b);
```

This ensures that:

```text
nums1[0]
```

is the smallest element.

---

### Store the Target Parity

```javascript
let smallestParity = nums1[0] % 2;
```

We use the smallest element's parity as the parity that every element should eventually have.

---

### Check the Current Element

```javascript
if (nums1[i] % 2 === smallestParity) {
    continue;
}
```

If the current element already has the required parity, no operation is needed.

---

### Try Subtraction

```javascript
let difference = nums1[i] - nums1[0];
```

Because `nums1[0]` is the smallest element, this difference is always positive for `i > 0`.

Then:

```javascript
if (difference % 2 === smallestParity) {
    continue;
}
```

If the difference has the required parity, this element can be transformed successfully.

---

### Impossible Case

If neither keeping the number nor subtracting the smallest number works:

```javascript
return false;
```

If every element passes these checks:

```javascript
return true;
```

---

## Complexity

Let `n` be the length of `nums1`.

### Time Complexity

```text
O(n log n)
```

Sorting takes:

```text
O(n log n)
```

The subsequent loop takes:

```text
O(n)
```

Therefore, the overall complexity is:

```text
O(n log n)
```

### Space Complexity

```text
O(log n)
```

The algorithm itself uses `O(1)` additional variables. The sorting implementation may use additional stack/temporary space depending on the JavaScript engine.

---

## Key Takeaway

The important ideas in this problem are:

1. **Sort the array** so the smallest element is known.
2. Use the smallest element's parity as the **target parity**.
3. If an element already has the target parity, keep it.
4. Otherwise, subtract the smallest element.
5. Check whether the resulting difference has the target parity.
6. If neither option works, return `false`.

### Pattern to Remember

For problems involving **odd/even transformations**, focus on:

```javascript
number % 2;
```

And for subtraction:

```text
Same parity → Even difference
Different parity → Odd difference
```

The combination of **sorting + parity analysis** makes this problem straightforward.

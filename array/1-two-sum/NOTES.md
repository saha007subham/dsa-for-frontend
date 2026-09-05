# Notes — 1. Two Sum

## Approach

The brute-force approach checks every possible pair of numbers, which takes `O(n²)` time.

We can do better using a **HashMap**.

The key idea is:

> For every number, calculate the value we need to reach the target and check whether that value has already been seen.

If:

```text
current + required = target
```

then:

```text
required = target - current
```

So for every `nums[i]`, we calculate:

```javascript
let complement = target - nums[i];
```

Then we check whether `complement` exists in our HashMap.

---

## Why HashMap?

A JavaScript `Map` allows us to:

- Store a number as a key.
- Store its index as the value.
- Check whether a number exists in approximately `O(1)` time.

For example:

```text
nums = [2, 7, 11, 15]
target = 9
```

When we process `7`:

```text
complement = 9 - 7
           = 2
```

We already saw `2`, so we immediately know:

```text
2 + 7 = 9
```

Therefore, the answer is:

```text
[0, 1]
```

---

## Algorithm

Create an empty `Map`:

```javascript
let map = new Map();
```

Traverse the array.

For every element:

### Step 1 — Calculate Complement

```javascript
let complement = target - nums[i];
```

The complement is the number we need to find.

---

### Step 2 — Check the Map

```javascript
if (map.has(complement)) {
  return [map.get(complement), i];
}
```

If the complement already exists:

- `map.get(complement)` gives us its index.
- `i` is the current index.

So we return both indices.

---

### Step 3 — Store Current Number

If the complement hasn't been found yet:

```javascript
map.set(nums[i], i);
```

We store the current number and its index for future elements.

---

## Dry Run

Consider:

```text
nums = [2,7,11,15]
target = 9
```

Initially:

```text
map = {}
```

### i = 0

Current value:

```text
nums[0] = 2
```

Calculate complement:

```text
9 - 2 = 7
```

Check:

```text
7 exists in map?
No
```

Store `2`:

```text
map = {
    2 → 0
}
```

---

### i = 1

Current value:

```text
nums[1] = 7
```

Calculate complement:

```text
9 - 7 = 2
```

Check:

```text
2 exists in map?
Yes
```

We stored:

```text
2 → 0
```

Therefore:

```text
return [0, 1]
```

Because:

```text
nums[0] + nums[1]
= 2 + 7
= 9
```

---

## Example With Duplicate Values

Consider:

```text
nums = [3,3]
target = 6
```

### i = 0

Current:

```text
3
```

Complement:

```text
6 - 3 = 3
```

`3` isn't in the map yet.

Store:

```text
map = {
    3 → 0
}
```

### i = 1

Current:

```text
3
```

Complement:

```text
6 - 3 = 3
```

Now `3` exists in the map.

```text
map.get(3) = 0
```

Therefore:

```text
return [0,1]
```

This also ensures we don't use the **same element twice**, because we check the map before storing the current element.

---

## JavaScript Solution

The implementation is available in [`solution.js`](./solution.js).

```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  let map = new Map();

  for (let i = 0; i < nums.length; i++) {
    let complement = target - nums[i];

    if (map.has(complement)) {
      return [map.get(complement), i];
    }

    map.set(nums[i], i);
  }
};
```

---

## Code Breakdown

### Create the Map

```javascript
let map = new Map();
```

The map stores:

```text
number → index
```

For example:

```text
2 → 0
7 → 1
```

---

### Calculate Complement

```javascript
let complement = target - nums[i];
```

If the current number is `7` and the target is `9`:

```text
complement = 9 - 7
           = 2
```

We need to find `2`.

---

### Check Whether Complement Exists

```javascript
if (map.has(complement))
```

If it exists, we've found the required pair.

---

### Get the Previous Index

```javascript
map.get(complement);
```

This gives us the index where the complement appeared.

For example:

```text
map = {
    2 → 0
}
```

Then:

```javascript
map.get(2);
```

returns:

```text
0
```

So we return:

```javascript
[map.get(complement), i];
```

---

### Store the Current Number

```javascript
map.set(nums[i], i);
```

This allows future elements to find the current number as their complement.

---

## Why We Don't Store First

An important detail is that we check for the complement **before** storing the current number:

```javascript
if (map.has(complement)) {
  return [map.get(complement), i];
}

map.set(nums[i], i);
```

This prevents using the same element twice.

For example:

```text
nums = [3]
target = 6
```

If we stored `3` first and then checked the map, we might incorrectly use index `0` twice.

By checking first, the current element can only match a number that appeared **before it**.

---

## Complexity

Let `n` be the length of `nums`.

### Time Complexity

```text
O(n)
```

We traverse the array once.

`Map.has()` and `Map.get()` take average `O(1)` time.

Therefore:

```text
O(n)
```

---

### Space Complexity

```text
O(n)
```

In the worst case, we may store almost every element in the HashMap.

---

## Key Takeaway

The important pattern is:

```text
complement = target - current
```

Then:

```text
Does complement exist in the HashMap?
        ↓
      Yes → Return indices
        ↓
       No → Store current number
```

### General HashMap Pattern

For problems where you need to find two values satisfying a relationship, consider:

```javascript
let map = new Map();

for (let i = 0; i < nums.length; i++) {
    let required = /* calculate what is needed */;

    if (map.has(required)) {
        // Found the answer
    }

    map.set(nums[i], i);
}
```

For **Two Sum**, the required value is:

```javascript
target - nums[i];
```

This converts the brute-force `O(n²)` solution into an `O(n)` solution.

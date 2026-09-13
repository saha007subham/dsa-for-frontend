# Notes — Two Sum II - Input Array Is Sorted

## Approach

The array is already sorted in **non-decreasing order**.

This is the key observation that allows us to use the **Two Pointer** technique instead of a HashMap.

We maintain two pointers:

```text
leftPointer  → beginning of the array
rightPointer → end of the array
```

At every step, calculate:

```text
arr[leftPointer] + arr[rightPointer]
```

Then decide which pointer to move.

---

## Why Two Pointers Work

Because the array is sorted:

```text
smallest ---------------------- largest
   ↑                                ↑
 left                            right
```

Suppose:

```text
arr[left] + arr[right] > target
```

The sum is too large.

Since `right` points to the largest current value, moving `left` forward would make the sum even larger.

So we must decrease the sum by moving:

```text
rightPointer--
```

Similarly, if:

```text
arr[left] + arr[right] < target
```

the sum is too small.

Moving `right` backward would make the sum even smaller.

So we increase the sum by moving:

```text
leftPointer++
```

---

## Step 1: Initialize Two Pointers

```js
let leftPointer = 0;
let rightPointer = arr.length - 1;
```

For:

```text
arr = [2,7,11,15]
```

we start with:

```text
leftPointer  = 0 → 2
rightPointer = 3 → 15
```

Visually:

```text
[2, 7, 11, 15]
 ↑           ↑
left        right
```

---

## Step 2: Compare the Sum With Target

The main loop is:

```js
while(leftPointer < rightPointer)
```

This ensures that we never use the same element twice.

Inside the loop:

```js
arr[leftPointer] + arr[rightPointer];
```

is compared with `target`.

There are three possibilities.

---

## Case 1: Sum Equals Target

```js
if (arr[leftPointer] + arr[rightPointer] === target) {
  return [leftPointer + 1, rightPointer + 1];
}
```

We found the required pair.

The problem uses **1-based indexing**, while JavaScript arrays use **0-based indexing**.

Therefore:

```text
index + 1
```

is required.

---

## Case 2: Sum Is Greater Than Target

```js
else if(arr[leftPointer] + arr[rightPointer] > target){
    rightPointer--;
}
```

Since the array is sorted, we need to make the sum smaller.

So we move the right pointer to the left.

```text
rightPointer--
```

---

## Case 3: Sum Is Smaller Than Target

```js
else{
    leftPointer++;
}
```

The sum is too small.

Because the array is sorted, moving the left pointer to the right gives us a larger number.

Therefore, the sum increases.

```text
leftPointer++
```

---

# Dry Run

Consider:

```text
numbers = [2,7,11,15]
target = 9
```

Initial state:

```text
leftPointer = 0
rightPointer = 3
```

Array:

```text
[2, 7, 11, 15]
 ↑           ↑
left        right
```

### Step 1

```text
2 + 15 = 17
```

We need:

```text
9
```

Since:

```text
17 > 9
```

the sum is too large.

Move the right pointer:

```text
rightPointer--
```

Now:

```text
leftPointer = 0
rightPointer = 2
```

---

### Step 2

```text
2 + 11 = 13
```

Again:

```text
13 > 9
```

Move the right pointer:

```text
rightPointer--
```

Now:

```text
leftPointer = 0
rightPointer = 1
```

---

### Step 3

```text
2 + 7 = 9
```

We found the target.

Current zero-based indices:

```text
leftPointer  = 0
rightPointer = 1
```

The problem requires 1-based indices:

```text
0 + 1 = 1
1 + 1 = 2
```

Return:

```text
[1,2]
```

---

# Complete Dry Run

```text
numbers = [2,7,11,15]
target = 9
```

| Left | Right | Sum | Action                     |
| ---: | ----: | --: | -------------------------- |
|    2 |    15 |  17 | Sum too large → move right |
|    2 |    11 |  13 | Sum too large → move right |
|    2 |     7 |   9 | Found → return `[1,2]`     |

---

# Another Example

Consider:

```text
numbers = [2,3,4]
target = 6
```

Initial:

```text
[2, 3, 4]
 ↑     ↑
left  right
```

### Step 1

```text
2 + 4 = 6
```

We found the target immediately.

Zero-based indices:

```text
[0,2]
```

Convert to 1-based:

```text
[1,3]
```

Return:

```text
[1,3]
```

---

# Why We Don't Use a HashMap

For the classic **Two Sum** problem, a HashMap is a common solution:

```text
Time  → O(n)
Space → O(n)
```

But this problem specifically says:

```text
Your solution must use only constant extra space.
```

Also, the array is already sorted.

Therefore, a HashMap is unnecessary.

The sorted property gives us a better approach:

```text
Two Pointers
Time  → O(n)
Space → O(1)
```

---

# Code Breakdown

## Initialize Pointers

```js
let leftPointer = 0;
let rightPointer = arr.length - 1;
```

One pointer starts at the beginning and the other at the end.

---

## Continue Until Pointers Meet

```js
while(leftPointer < rightPointer)
```

We require two different elements, so the pointers must satisfy:

```text
leftPointer < rightPointer
```

---

## Check for Target

```js
if (arr[leftPointer] + arr[rightPointer] === target) {
  return [leftPointer + 1, rightPointer + 1];
}
```

If the sum equals the target, return the 1-based indices.

---

## Decrease the Sum

```js
else if(arr[leftPointer] + arr[rightPointer] > target){
    rightPointer--;
}
```

The sum is too large, so move the right pointer left.

---

## Increase the Sum

```js
else{
    leftPointer++;
}
```

The sum is too small, so move the left pointer right.

---

# Complexity

Let `n` be the length of the array.

## Time Complexity

Both pointers move only in one direction.

The `leftPointer` can move from:

```text
0 → n - 1
```

The `rightPointer` can move from:

```text
n - 1 → 0
```

They never move backward.

Therefore, the total number of pointer movements is at most `n`.

```text
Time Complexity: O(n)
```

## Space Complexity

We only use two variables:

```js
leftPointer;
rightPointer;
```

No HashMap, array, or other data structure is created.

Therefore:

```text
Space Complexity: O(1)
```

---

# Key Takeaways

### 1. Sorted Array + Pair Sum → Think Two Pointers

Whenever an array is sorted and you need to find a pair satisfying some sum condition, consider:

```text
Two Pointer
```

### 2. Sum Too Large

```text
arr[left] + arr[right] > target
```

Move:

```text
right--
```

because we need a smaller value.

### 3. Sum Too Small

```text
arr[left] + arr[right] < target
```

Move:

```text
left++
```

because we need a larger value.

### 4. 1-Based Indexing

The problem asks for 1-based indices.

JavaScript arrays are 0-based.

Therefore:

```js
leftPointer + 1;
rightPointer + 1;
```

### 5. Constant Space

Unlike the original Two Sum problem, we don't need a HashMap here.

The sorted property lets us achieve:

```text
O(n) Time
O(1) Space
```

---

# Pattern to Remember

```text
Sorted Array
     ↓
Two Pointers
     ↓
left + right
     ↓
sum == target → return
sum > target  → right--
sum < target  → left++
```

# Notes — Minimum Operations to Reduce X to Zero

## Approach

We can only remove elements from the **left end** or the **right end** of `nums`, never from the middle. That means whatever elements we _don't_ remove always form a single **contiguous subarray in the middle** of `nums`.

If we remove a prefix and a suffix whose values sum to `x`, then the remaining middle subarray must sum to:

```text
target = total - x
```

where `total` is the sum of all elements in `nums`.

So instead of thinking about "which prefix + suffix to remove," we can reframe the problem as:

```text
Find the longest subarray whose sum equals target.
```

Once we know the length of that longest subarray (`maxLength`), the number of elements we removed (from both ends combined) is simply:

```text
n - maxLength
```

which is exactly the minimum number of operations.

---

## Step 1: Compute the Total and the Target

```js
const n = nums.length;

const total = nums.reduce((sum, num) => sum + num, 0);
const target = total - x;
```

- `total` is the sum of the entire array.
- `target` is what the **kept middle subarray** must sum to.

---

## Step 2: Handle the Trivial Cases

```js
if (target === 0) return n;

if (target < 0) return -1;
```

- If `target === 0`, that means `total === x`, so removing **everything** (all `n` elements) reduces `x` to zero. The answer is `n`.
- If `target < 0`, that means `x` is larger than the sum of the entire array. There's no way to reach exactly `0` since we can never subtract more than `total`. Return `-1` immediately.

---

## Step 3: Slide the Window to Find the Longest Subarray Summing to `target`

```js
let left = 0;
let sum = 0;
let maxLength = -1;

for (let right = 0; right < n; right++) {
  sum += nums[right];

  while (sum > target) {
    sum -= nums[left];
    left++;
  }

  if (sum === target) {
    maxLength = Math.max(maxLength, right - left + 1);
  }
}
```

This is a standard **sliding window** for positive numbers:

1. **Expand** the window by moving `right` forward and adding `nums[right]` to `sum`.
2. **Shrink** the window from the left (`left++`, subtracting `nums[left]`) whenever `sum` exceeds `target`. This is only safe because every value in `nums` is **positive** — the sum is guaranteed to be monotonic as the window grows or shrinks.
3. Whenever `sum` exactly equals `target`, record the window length `right - left + 1` if it's the largest seen so far.

---

## Step 4: Convert Window Length Back to Operation Count

```js
if (maxLength === -1) return -1;

return n - maxLength;
```

- If no window ever summed to exactly `target`, `maxLength` stays `-1`, meaning it's impossible — return `-1`.
- Otherwise, the minimum operations is the total length minus the longest "keep" window.

---

# Dry Run

Consider:

```text
nums = [1,1,4,2,3]
x = 5
```

```text
total = 1+1+4+2+3 = 11
target = 11 - 5 = 6
```

Since `target !== 0` and `target > 0`, we run the sliding window.

Initial state:

```text
left = 0, sum = 0, maxLength = -1
```

| `right` | `nums[right]` | `sum` after add | Shrink? (`sum > 6`) | `sum` after shrink | `left` |                 `sum === 6`?                 | `maxLength` |
| ------: | :-----------: | --------------: | :-----------------: | -----------------: | -----: | :------------------------------------------: | ----------: | --- |
|       0 |       1       |               1 |         no          |                  1 |      0 |                      no                      |          -1 |
|       1 |       1       |               2 |         no          |                  2 |      0 |                      no                      |          -1 |
|       2 |       4       |               6 |         no          |                  6 |      0 |                   **yes**                    |           3 |
|       3 |       2       |               8 | yes → `-nums[0]=1`  |                  7 |      1 | still > 6 → `-nums[1]=1` → `sum=6`, `left=2` |     **yes** | 2   |
|       4 |       3       |               9 | yes → `-nums[2]=4`  |                  5 |      3 |                      no                      |           3 |

_(Row for `right = 3`: after the first shrink `sum = 7` is still `> 6`, so we shrink again, landing at `sum = 6`, `left = 2`. Window is `[2,3]`, length `2`, which does **not** beat the existing `maxLength = 3`.)_

Final:

```text
maxLength = 3   (the subarray [1,1,4] at indices 0..2)
```

Answer:

```text
n - maxLength = 5 - 3 = 2
```

This matches removing the last two elements (`2` and `3`), whose sum is `5 = x`.

---

# Example: Multiple Valid Windows

Consider:

```text
nums = [3,2,20,1,1,3]
x = 10
```

```text
total = 3+2+20+1+1+3 = 30
target = 30 - 10 = 20
```

| `right` | `nums[right]` | `sum` after add | Shrink? | `sum` after shrink | `left` | `sum === 20`? | `maxLength` |
| ------: | :-----------: | --------------: | :-----: | -----------------: | -----: | :-----------: | ----------: |
|       0 |       3       |               3 |   no    |                  3 |      0 |      no       |          -1 |
|       1 |       2       |               5 |   no    |                  5 |      0 |      no       |          -1 |
|       2 |      20       |              25 |   yes   |   `-3=22`, `-2=20` |      2 |    **yes**    |           1 |
|       3 |       1       |              21 |   yes   |            `-20=1` |      3 |      no       |           1 |
|       4 |       1       |               2 |   no    |                  2 |      3 |      no       |           1 |
|       5 |       3       |               5 |   no    |                  5 |      3 |      no       |           1 |

Final:

```text
maxLength = 1   (just [20] at index 2)
```

Answer:

```text
n - maxLength = 6 - 1 = 5
```

This matches removing the last three elements (`1,1,3`) and the first two elements (`3,2`) — `5` operations total.

---

# Example Where It's Impossible

Consider:

```text
nums = [5,6,7,8,9]
x = 4
```

```text
total = 35
target = 35 - 4 = 31
```

No contiguous subarray of `[5,6,7,8,9]` sums to exactly `31` (the closest sums around it skip over `31` entirely because every element is larger than `x`). The sliding window never sets `maxLength`, so it stays `-1`, and the function returns:

```text
-1
```

---

# Code Breakdown

## Full Solution

```js
var minOperations = function (nums, x) {
  const n = nums.length;

  const total = nums.reduce((sum, num) => sum + num, 0);
  const target = total - x;

  if (target === 0) return n;

  if (target < 0) return -1;

  let left = 0;
  let sum = 0;
  let maxLength = -1;

  for (let right = 0; right < n; right++) {
    sum += nums[right];

    while (sum > target) {
      sum -= nums[left];
      left++;
    }

    if (sum === target) {
      maxLength = Math.max(maxLength, right - left + 1);
    }
  }

  if (maxLength === -1) return -1;

  return n - maxLength;
};
```

## Why Reframe as "Longest Subarray"?

Directly trying every combination of prefix length + suffix length is `O(n²)`. By converting the problem into "find the longest middle subarray summing to `target`," we reduce it to a single linear pass with a sliding window — something a two-pointer approach handles naturally because all values are positive.

## Why Does the Sliding Window Work Here?

The window shrink step (`while (sum > target)`) relies on the fact that removing an element from the left **always decreases** the sum, and adding an element on the right **always increases** it. This monotonic behavior only holds because every `nums[i] >= 1` (no negative or zero values to complicate things).

---

# Complexity

Let `n` be the length of `nums`.

## Time Complexity

Both `left` and `right` traverse the array at most once each:

```text
Time Complexity: O(n)
```

## Space Complexity

Only a constant number of extra variables are used:

```text
Space Complexity: O(1)
```

---

# Key Takeaways

### 1. Reframe "Remove From Both Ends" as "Keep a Middle Subarray"

Whenever a problem only allows removing from the front/back, flip the framing: what remains in the middle is a single contiguous block, which is often much easier to reason about.

---

### 2. Turn It Into a Sum-Target Sliding Window Problem

Once reframed, the task became "find the longest subarray with a given sum" — a well-known sliding window pattern that works cleanly with **positive-only** arrays.

---

### 3. Handle Trivial Cases Before the Main Loop

Checking `target === 0` (remove everything) and `target < 0` (impossible) up front avoids wasted work and edge-case bugs inside the sliding window.

---

### 4. Positive Values Enable Monotonic Sliding Windows

The `while (sum > target)` shrink step is only valid because every element is positive — this guarantees the sum moves predictably as the window expands or contracts.

---

# Pattern to Remember

```text
Compute total sum
        ↓
target = total - x
        ↓
target == 0? → return n
target < 0?  → return -1
        ↓
Slide window to find
longest subarray == target
        ↓
Found one?
   ↙          ↘
 Yes           No
  ↓             ↓
n - maxLength   return -1
```

**Pattern:** Remove-From-Both-Ends → Longest Middle Subarray With Target Sum (Sliding Window)

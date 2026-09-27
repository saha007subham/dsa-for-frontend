# Notes — Rearrange Array by Removing Distinct Values

## Approach

The operation described in the problem — "remove one occurrence of every distinct value, in ascending order, repeatedly until empty" — is really just simulation over **frequency counts**.

Instead of manipulating the actual array on every step, we track how many times each value still remains using a:

```js
freq = new Map(); // value -> remaining count
```

Then we simulate "rounds":

- Each round, we look at every **distinct value still in the map**, sorted ascending.
- We push each one to `ans` exactly once, and decrement its count by `1` (removing it from the map entirely once it hits `0`).
- We keep running rounds until the map is empty.

A value with an original frequency of `c` will show up in exactly the first `c` rounds, then disappear. This means the **total number of rounds equals the maximum frequency** of any value in `nums`.

---

## Step 1: Build the Frequency Map

```js
const freq = new Map();

for (const num of nums) {
  freq.set(num, (freq.get(num) || 0) + 1);
}
```

This counts how many times each value appears in the original array, in a single pass.

---

## Step 2: Simulate Rounds Until the Map Is Empty

```js
const ans = [];

while (freq.size > 0) {
  const values = [...freq.keys()].sort((a, b) => a - b);

  for (const value of values) {
    ans.push(value);

    const count = freq.get(value);

    if (count === 1) {
      freq.delete(value);
    } else {
      freq.set(value, count - 1);
    }
  }
}

return ans;
```

For every round:

1. **Snapshot the current distinct values** and sort them ascending — this mirrors "identify all distinct values currently present."
2. **Push each value once** to `ans`, in that sorted order.
3. **Decrement its count.** If the count drops to `0`, the value is fully used up and removed from the map (it won't appear in future rounds).

The `while (freq.size > 0)` loop keeps running rounds until every value has been fully consumed.

---

# Dry Run

Consider:

```text
nums = [3,1,3,2,1,3]
```

Initial frequency map:

```text
{ 3: 3, 1: 2, 2: 1 }
```

### Round 1

Sorted distinct values: `[1, 2, 3]`

| value | pushed to `ans` | count before |    count after    |
| :---: | :-------------: | :----------: | :---------------: |
|   1   |       yes       |      2       | `1` (decremented) |
|   2   |       yes       |      1       | removed (hit `0`) |
|   3   |       yes       |      3       | `2` (decremented) |

```text
ans = [1, 2, 3]
freq = { 3: 2, 1: 1 }
```

### Round 2

Sorted distinct values: `[1, 3]`

| value | pushed to `ans` | count before |    count after    |
| :---: | :-------------: | :----------: | :---------------: |
|   1   |       yes       |      1       | removed (hit `0`) |
|   3   |       yes       |      2       | `1` (decremented) |

```text
ans = [1, 2, 3, 1, 3]
freq = { 3: 1 }
```

### Round 3

Sorted distinct values: `[3]`

| value | pushed to `ans` | count before |    count after    |
| :---: | :-------------: | :----------: | :---------------: |
|   3   |       yes       |      1       | removed (hit `0`) |

```text
ans = [1, 2, 3, 1, 3, 3]
freq = {}
```

The map is now empty, so the loop stops. Final result:

```text
[1, 2, 3, 1, 3, 3]
```

which matches the expected output.

---

# Second Example

Consider:

```text
nums = [7,7,4,4,4]
```

Initial frequency map:

```text
{ 7: 2, 4: 3 }
```

| Round | Sorted values | Pushed to `ans` | `freq` after round |
| :---: | :-----------: | :-------------: | :----------------: |
|   1   |   `[4, 7]`    |      4, 7       |  `{ 4: 2, 7: 1 }`  |
|   2   |   `[4, 7]`    |      4, 7       |     `{ 4: 1 }`     |
|   3   |     `[4]`     |        4        |        `{}`        |

Final result:

```text
[4, 7, 4, 7, 4]
```

which matches the expected output. Notice the number of rounds (`3`) equals the highest original frequency — `4` appeared `3` times in `nums`.

---

# Code Breakdown

## Full Solution

```js
var rearrangeArray = function (nums) {
  const freq = new Map();

  for (const num of nums) {
    freq.set(num, (freq.get(num) || 0) + 1);
  }

  const ans = [];

  while (freq.size > 0) {
    const values = [...freq.keys()].sort((a, b) => a - b);

    for (const value of values) {
      ans.push(value);

      const count = freq.get(value);

      if (count === 1) {
        freq.delete(value);
      } else {
        freq.set(value, count - 1);
      }
    }
  }

  return ans;
};
```

## Why a Frequency Map Instead of Mutating the Array?

Repeatedly scanning and removing elements from the actual array on every round would mean re-deriving "distinct values" from scratch each time (and dealing with shifting indices). Tracking just the **counts** is simpler and cheaper — a round is just "iterate the map, push, decrement."

## Why Re-Sort on Every Round?

Values get **removed** from the map over time (once their count hits `0`), so the set of distinct keys shrinks between rounds. Re-sorting `[...freq.keys()]` each round guarantees we always push in ascending order relative to whatever is currently left — sorting only the survivors, not the full original array.

---

# Complexity

Let `n` be the length of `nums`, `d` be the number of **distinct** values, and `maxFreq` be the **highest frequency** of any single value.

## Time Complexity

- Building the frequency map: `O(n)`.
- The number of rounds is `maxFreq`, and each round sorts at most `d` remaining keys: `O(d log d)` per round.

```text
Time Complexity: O(n + maxFreq · d log d)
```

Since the constraints here are small (`n <= 100`), this is efficient in practice. Note that this can be optimized further: the sorted order of _surviving_ keys never actually changes between rounds (values only disappear, they never reorder), so instead of re-sorting from scratch every round, you could sort the distinct values **once** up front and simply skip values that have already been removed. That reduces the repeated work to a single `O(d log d)` sort overall.

## Space Complexity

The frequency map holds at most one entry per distinct value, and `ans` holds exactly `n` values:

```text
Space Complexity: O(n)
```

---

# Key Takeaways

### 1. Simulate With Counts, Not With the Actual Array

When a problem describes repeatedly "removing one of each distinct value," it's almost always cleaner to track **frequencies** in a map than to mutate an array and re-scan it for distinct values every round.

---

### 2. The Number of Rounds Equals the Maximum Frequency

A value with frequency `c` participates in exactly the first `c` rounds. The value with the **highest** frequency determines how many total rounds the simulation takes.

---

### 3. Watch for Redundant Sorting

Re-sorting the same (shrinking) set of keys every round is correct but not optimal. If a value's relative order never changes once established, sort once and reuse that order instead of recomputing it each time.

---

### 4. `Map` Size as a Natural Loop Condition

`while (freq.size > 0)` is a clean way to express "keep going until everything has been fully consumed," without needing a separate counter or flag.

---

# Pattern to Remember

```text
Count frequency of every value
        ↓
While values remain:
        ↓
  Sort remaining distinct values
        ↓
  Push each once, decrement count
        ↓
  Remove value when count hits 0
        ↓
Repeat until map is empty
```

**Pattern:** Frequency-Map Simulation — Round-by-Round Consumption of Distinct Values

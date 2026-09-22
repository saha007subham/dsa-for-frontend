# Notes — Longest Substring Without Repeating Characters

## Approach

We need to find the length of the **longest substring** of `s` that contains **no repeating characters**.

A brute-force approach would check every possible substring, which is `O(n²)` or worse. Instead, we use a **sliding window**:

```text
i → start of the window
j → end of the window
```

The window `[i, j]` always represents a substring with **no duplicate characters**. We expand `j` one step at a time, and whenever a duplicate is found inside the window, we shrink the window by moving `i` forward — never backward.

To detect duplicates instantly (without scanning the window), we keep a:

```js
map = new Map(); // character -> last seen index
```

---

## Step 1: Initialize Pointers and State

```js
let i = 0;
let j = 0;
let len = s.length;
let maxWindow = 0;
let map = new Map();
```

- `i` and `j` both start at `0` — the window begins empty.
- `maxWindow` tracks the best (longest) window length found so far.
- `map` will store, for each character, the **most recent index** at which it appeared.

---

## Step 2: Slide the Window

```js
while (j < len) {
  if (map.has(s[j]) && map.get(s[j]) >= i) {
    i = map.get(s[j]) + 1;
  }

  map.set(s[j], j);
  let curr = j - i + 1;
  maxWindow = Math.max(maxWindow, curr);

  j++;
}
```

For every character `s[j]`, there are two cases.

---

### Case 1: Character Already Seen Inside the Current Window

```js
if (map.has(s[j]) && map.get(s[j]) >= i) {
  i = map.get(s[j]) + 1;
}
```

If `s[j]` was seen before **and** that earlier occurrence is still inside the window (`>= i`), the window now contains a duplicate. We fix this by moving `i` to **one position after** that earlier occurrence, which excludes the duplicate from the window.

For example:

```text
s = "abca"
i = 0
map = { a: 0, b: 1, c: 2 }
j = 3, s[j] = "a"
```

Since `map.get("a") = 0` and `0 >= i (0)`, we move:

```text
i = 0 + 1 = 1
```

---

### Case 2: Character Not in the Window (New or Outside Range)

If `s[j]` has never been seen, **or** its last occurrence is _before_ `i` (already outside the current window), we do nothing to `i` — the window simply keeps growing.

---

### Update the Map and the Window Size

```js
map.set(s[j], j);
let curr = j - i + 1;
maxWindow = Math.max(maxWindow, curr);
```

Regardless of which case we hit, we always:

1. Record/update the current character's latest index.
2. Compute the current window size `j - i + 1`.
3. Update `maxWindow` if the current window is larger.

---

# Dry Run

Consider:

```text
s = "abcabcbb"
```

Initially:

```text
i = 0, j = 0, maxWindow = 0, map = {}
```

| `j` | `s[j]` | Duplicate in window? | `i` after | `map` after set   | `curr = j - i + 1` | `maxWindow` |
| --: | :----: | :------------------: | --------: | ----------------- | -----------------: | ----------: |
|   0 |  `a`   |          no          |         0 | `{a:0}`           |                  1 |           1 |
|   1 |  `b`   |          no          |         0 | `{a:0, b:1}`      |                  2 |           2 |
|   2 |  `c`   |          no          |         0 | `{a:0, b:1, c:2}` |                  3 |           3 |
|   3 |  `a`   |  yes (`a` at 0 ≥ 0)  |         1 | `{a:3, b:1, c:2}` |                  3 |           3 |
|   4 |  `b`   |  yes (`b` at 1 ≥ 1)  |         2 | `{a:3, b:4, c:2}` |                  3 |           3 |
|   5 |  `c`   |  yes (`c` at 2 ≥ 2)  |         3 | `{a:3, b:4, c:5}` |                  3 |           3 |
|   6 |  `b`   |  yes (`b` at 4 ≥ 3)  |         5 | `{a:3, b:6, c:5}` |                  2 |           3 |
|   7 |  `b`   |  yes (`b` at 6 ≥ 5)  |         7 | `{a:3, b:7, c:5}` |                  1 |           3 |

Final:

```text
maxWindow = 3
```

which matches the substring `"abc"` (length `3`).

---

# Example With All Same Characters

Consider:

```text
s = "bbbbb"
```

Every new `b` is a duplicate of the previous one, so `i` is pushed forward to right after the last `b` on every step. The window size never exceeds `1`.

```text
maxWindow = 1
```

---

# Example Where the Window Shrinks Mid-String

Consider:

```text
s = "pwwkew"
```

| `j` | `s[j]` | Action                                     | `i` | `curr` | `maxWindow` |
| --: | :----: | ------------------------------------------ | --: | -----: | ----------: |
|   0 |  `p`   | new                                        |   0 |      1 |           1 |
|   1 |  `w`   | new                                        |   0 |      2 |           2 |
|   2 |  `w`   | duplicate (`w` at 1 ≥ 0) → `i = 2`         |   2 |      1 |           2 |
|   3 |  `k`   | new                                        |   2 |      2 |           2 |
|   4 |  `e`   | new                                        |   2 |      3 |           3 |
|   5 |  `w`   | duplicate (`w` at 2 < 2 → _not_ in window) |   2 |      4 |           4 |

Wait — here `w`'s last recorded index is `2` (from step `j = 2`), and `i` is also `2`, so `2 >= i` **is true**, meaning `w` at index 2 is still inside the window. So `i` moves to `3`.

Corrected final row:

| `j` | `s[j]` | Action                             | `i` | `curr` | `maxWindow` |
| --: | :----: | ---------------------------------- | --: | -----: | ----------: |
|   5 |  `w`   | duplicate (`w` at 2 ≥ 2) → `i = 3` |   3 |      3 |           3 |

Final:

```text
maxWindow = 3
```

which matches the substring `"wke"` (length `3`). Note that `i` never moves backward — it only ever advances, which keeps the algorithm `O(n)` overall even though it looks like we "restart" the window.

---

# Code Breakdown

## Full Solution

```js
var lengthOfLongestSubstring = function (s) {
  let i = 0;
  let j = 0;
  let len = s.length;
  let maxWindow = 0;
  let map = new Map();

  while (j < len) {
    if (map.has(s[j]) && map.get(s[j]) >= i) {
      i = map.get(s[j]) + 1;
    }

    map.set(s[j], j);
    let curr = j - i + 1;
    maxWindow = Math.max(maxWindow, curr);

    j++;
  }

  return maxWindow;
};
```

## Why Check `map.get(s[j]) >= i`?

A character might have been seen **before the current window started** (its last index is less than `i`). In that case it's not actually a duplicate _within_ the window, so we must **not** move `i`. This check is what prevents `i` from ever moving backward.

## Why `i = map.get(s[j]) + 1` and Not `i = j`?

We only need to skip past the **earlier occurrence** of the repeated character, not discard the entire window. Everything between the old occurrence and `j` (exclusive of the duplicate) may still be duplicate-free and worth keeping.

---

# Why Not Brute Force?

A brute-force approach checks every substring and verifies uniqueness with a `Set`:

```text
O(n²) or O(n³)
```

By using a single pass with a map that remembers _where_ each character last appeared, we avoid re-scanning the window entirely. Both pointers `i` and `j` only ever move forward, so the total work across the whole run is bounded by the length of the string.

---

# Complexity

Let `n` be the length of `s`.

## Time Complexity

Both `i` and `j` traverse the string at most once each:

```text
Time Complexity: O(n)
```

## Space Complexity

The map stores at most one entry per **unique character** in `s`. In the worst case (all unique characters, or a bounded alphabet), this is:

```text
Space Complexity: O(min(n, charset size))
```

---

# Key Takeaways

### 1. "Longest / Shortest Substring With Condition" → Sliding Window

Whenever a problem asks for the longest (or shortest) substring/subarray satisfying some constraint, think **sliding window** with two pointers before reaching for brute force.

---

### 2. Use a Map to Avoid Re-Scanning the Window

Storing the **last seen index** of each character lets you jump `i` directly to the correct position in `O(1)`, instead of shrinking the window one character at a time.

---

### 3. Guard Against Stale Map Entries

Always check that a character's last seen index is `>= i` before treating it as a duplicate — otherwise you'll incorrectly shrink a window because of a character that's no longer actually in it.

---

### 4. Pointers Only Move Forward

Neither `i` nor `j` ever decreases. This one-directional movement is what keeps the algorithm linear, even though the window appears to "reset" at times.

---

# Pattern to Remember

```text
Expand window (move j)
        ↓
Seen s[j] inside window?
   ↙            ↘
 Yes             No
  ↓               ↓
Shrink window   Keep window
(move i)        as is
        ↓
Record s[j]'s index
        ↓
Update maxWindow
```

**Pattern:** Sliding Window with a Last-Seen-Index Map

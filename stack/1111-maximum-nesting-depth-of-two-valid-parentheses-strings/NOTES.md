# Notes — Maximum Nesting Depth of Two Valid Parentheses Strings

## Approach

At first glance this looks like it requires actually constructing two strings `A` and `B` and checking their depths — but we never need to build them explicitly. We only need to **label** each character `0` or `1`, and the labeling rule falls out of a simple observation:

> If we alternate which group gets each "level" of nesting, neither group ever goes as deep as the original string.

Concretely, we track the running `depth` of `seq` as we scan left to right (the same way you'd validate parentheses), and assign each character to a group based on whether the **current depth is even or odd**:

```text
even depth → group 0
odd depth  → group 1
```

The order of the depth update relative to the push matters, and differs for `(` vs `)`:

- For `(` — this opens a **new** level, so we bump `depth` **before** deciding the group.
- For `)` — this closes the **current** level, so we decide the group **before** dropping `depth`.

---

## Step 1: Initialize State

```js
let ans = [];
let depth = 0;
```

- `ans` will hold the `0`/`1` label for each character.
- `depth` tracks how deeply nested we currently are in the original string.

---

## Step 2: Scan the String and Assign Groups by Depth Parity

```js
for (let i = 0; i < seq.length; i++) {
  if (seq[i] == "(") {
    depth++;
  }

  ans.push(depth % 2);

  if (seq[i] == ")") {
    depth--;
  }
}
```

For every character:

### Case 1: `(`

```js
if (seq[i] == "(") {
  depth++;
}
ans.push(depth % 2);
```

We're opening a new level, so `depth` increases **first**, and then we record `depth % 2`. This means the **outermost** `(` of any nested block (depth becomes `1`) is labeled `1 % 2 = 1`, the next one in (depth becomes `2`) is labeled `0`, and so on — alternating with each additional level of nesting.

### Case 2: `)`

```js
ans.push(depth % 2);
if (seq[i] == ")") {
  depth--;
}
```

We're closing the **current** level, so we record `depth % 2` **before** decrementing — the closing bracket must get the **same label** as the matching opening bracket, since they belong to the same level.

---

## Step 3: Return the Labels

```js
return ans;
```

`ans[i]` is `0` if `seq[i]` belongs to subsequence `A`, or `1` if it belongs to subsequence `B`.

---

# Dry Run

Consider:

```text
seq = "(()())"
```

Initial state:

```text
depth = 0
```

| `i` | `seq[i]` | Depth update                | `depth` used for label | `ans[i]` | `depth` after |
| --: | :------: | --------------------------- | ---------------------: | :------: | ------------- |
|   0 |   `(`    | `depth++` → `1`             |                      1 |   `1`    | `1`           |
|   1 |   `(`    | `depth++` → `2`             |                      2 |   `0`    | `2`           |
|   2 |   `)`    | label first, then `depth--` |                      2 |   `0`    | `1`           |
|   3 |   `(`    | `depth++` → `2`             |                      2 |   `0`    | `2`           |
|   4 |   `)`    | label first, then `depth--` |                      2 |   `0`    | `1`           |
|   5 |   `)`    | label first, then `depth--` |                      1 |   `1`    | `0`           |

Final:

```text
ans = [1, 0, 0, 0, 0, 1]
```

**Verifying correctness:**

- Group `0` (indices `1, 2, 3, 4`): characters `(`, `)`, `(`, `)` → `"()()"` — a valid VPS with `depth = 1`.
- Group `1` (indices `0, 5`): characters `(`, `)` → `"()"` — a valid VPS with `depth = 1`.

```text
max(depth(A), depth(B)) = max(1, 1) = 1
```

The original string had a max depth of `2` (the innermost `(` is nested two levels deep), and we successfully split it so **neither** group exceeds depth `1`. Since the problem allows any valid split achieving the minimum, this is a correct answer even though it differs character-for-character from the example's sample output.

---

# Second Example

Consider:

```text
seq = "()(())()"
```

| `i` | `seq[i]` | `depth` used for label | `ans[i]` |
| --: | :------: | ---------------------: | :------: |
|   0 |   `(`    |                      1 |   `1`    |
|   1 |   `)`    |                      1 |   `1`    |
|   2 |   `(`    |                      1 |   `1`    |
|   3 |   `(`    |                      2 |   `0`    |
|   4 |   `)`    |                      2 |   `0`    |
|   5 |   `)`    |                      1 |   `1`    |
|   6 |   `(`    |                      1 |   `1`    |
|   7 |   `)`    |                      1 |   `1`    |

Final:

```text
ans = [1, 1, 1, 0, 0, 1, 1, 1]
```

**Verifying correctness:**

- Group `0` (indices `3, 4`): `"()"` — valid VPS, `depth = 1`.
- Group `1` (indices `0, 1, 2, 5, 6, 7`): `"()()()"` — valid VPS, `depth = 1`.

```text
max(depth(A), depth(B)) = 1
```

Again, neither group exceeds depth `1`, even though the original string reached depth `2` at index `3` (`"(())"` nested two deep).

---

# Code Breakdown

## Full Solution

```js
var maxDepthAfterSplit = function (seq) {
  let ans = [];
  let depth = 0;

  for (let i = 0; i < seq.length; i++) {
    if (seq[i] == "(") {
      depth++;
    }

    ans.push(depth % 2);

    if (seq[i] == ")") {
      depth--;
    }
  }

  return ans;
};
```

## Why Does Splitting by Depth Parity Work?

Every matching `(...)` pair at a given nesting level shares the same depth value at the moment each bracket is processed (the opening bracket's depth **after** incrementing equals the closing bracket's depth **before** decrementing). So assigning by `depth % 2` guarantees that a matched pair always gets the **same label** — which is required for each group to remain a valid, properly nested VPS on its own.

Because consecutive nesting levels alternate between even and odd, the two groups end up splitting the "depth budget" between them: group `0` only ever sees even-depth levels, and group `1` only ever sees odd-depth levels. If the original max depth is `D`, the deepest either group can go is roughly `⌈D / 2⌉` — which is the best possible outcome, since you can't do better than evenly dividing the nesting between two strings.

## Why the Order Differs for `(` vs `)`

`(` opens a level that didn't exist yet, so the depth must be updated **before** labeling (the new, deeper level is what gets recorded). `)` closes the level it belongs to, so the depth must be read **before** it's decremented — otherwise you'd record the label of the level _outside_ the one actually being closed, breaking the match between opening and closing brackets.

---

# Complexity

Let `n` be the length of `seq`.

## Time Complexity

We scan the string once, doing constant work per character:

```text
Time Complexity: O(n)
```

## Space Complexity

We only maintain `ans` (required for the output) and a constant-size `depth` counter, with no extra data structures:

```text
Space Complexity: O(1) auxiliary (excluding the required O(n) output array)
```

---

# Key Takeaways

### 1. You Don't Always Need to Build the Actual Subsequences

The problem asks for two valid subsequences, but the solution never constructs `A` or `B` as strings — it only needs to decide a **label** per character. Recognizing that the output format (`0`/`1` array) is all that's required simplifies the whole problem.

---

### 2. Depth Parity Is a Simple but Powerful Splitting Trick

Alternating assignment based on `depth % 2` is a reusable pattern any time you need to divide nested structure "evenly" between two halves while preserving validity at each level.

---

### 3. Order of Operations Matters for Matching Brackets

Updating `depth` **before** vs **after** labeling is what keeps a `(` and its matching `)` on the **same** side of the split. Getting this order backwards would break the VPS property of the resulting groups.

---

### 4. Multiple Correct Answers Can Exist

Since the problem only requires minimizing `max(depth(A), depth(B))` — not matching a specific split — different valid strategies (or even different depth-parity conventions) can produce different but equally correct outputs.

---

# Pattern to Remember

```text
Scan seq, track running depth
        ↓
'(' → depth++ → label = depth % 2
')' → label = depth % 2 → depth--
        ↓
Same label for matched pairs
        ↓
Even-depth levels → group 0
Odd-depth levels  → group 1
        ↓
Max depth of either group ≈ half of original
```

**Pattern:** Depth-Parity Split — Alternate Nesting Levels Between Two Groups

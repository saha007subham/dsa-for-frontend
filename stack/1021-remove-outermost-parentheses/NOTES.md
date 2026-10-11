# Notes — Remove Outermost Parentheses

## Approach

A **primitive** valid parentheses string is one that cannot be split into two smaller non-empty valid strings. In terms of nesting, that means:

```text
It starts when the nesting level goes 0 → 1
It ends when the nesting level goes 1 → 0
In between, the level never returns to 0
```

So the **outermost parentheses** of each primitive are exactly:

- the `(` that takes `level` from `0` to `1`, and
- the `)` that takes `level` from `1` to `0`.

We don't need to explicitly split the string into primitives. We just walk through `s`, track the current nesting `level`, and **skip** those two boundary characters while keeping everything else.

---

## Step 1: Initialize State

```js
let level = 0;
let ans = "";
```

- `level` tracks how deeply nested we currently are.
- `ans` collects the characters we decide to keep.

---

## Step 2: Scan the String

```js
for (let i = 0; i < s.length; i++) {
  if (s[i] === "(") {
    level++;
    if (level > 1) {
      ans = ans + s[i];
    }
  } else {
    if (level > 1) {
      ans = ans + s[i];
    }
    level--;
  }
}
```

For every character, there are two cases.

---

### Case 1: Opening Bracket `(`

```js
if (s[i] === "(") {
  level++;
  if (level > 1) {
    ans = ans + s[i];
  }
}
```

We increase `level` **first**, then check it.

- If `level` becomes `1`, this `(` is the **outermost opening** of a primitive → skip it.
- If `level` becomes `2` or more, it's an inner bracket → keep it.

---

### Case 2: Closing Bracket `)`

```js
else {
  if (level > 1) {
    ans = ans + s[i];
  }
  level--;
}
```

We check `level` **first**, then decrease it.

- If `level` is `1` right now, this `)` closes the primitive's outermost wrapper → skip it.
- If `level` is `2` or more, it closes an inner pair → keep it.

The order is opposite to the `(` case because a `)` belongs to the level **it is closing**, which is the level _before_ decrementing.

---

## Step 3: Return the Result

```js
return ans;
```

---

# Dry Run

Consider:

```text
s = "(()())(())"
```

Primitive decomposition:

```text
"(()())" + "(())"
```

Initially:

```text
level = 0
ans = ""
```

| `i` | `s[i]` | `level` used for check | Keep? | `ans` after | `level` after |
| --: | :----: | ---------------------: | :---: | ----------- | ------------: |
|   0 |  `(`   |         1 (after `++`) |  no   | `""`        |             1 |
|   1 |  `(`   |         2 (after `++`) |  yes  | `"("`       |             2 |
|   2 |  `)`   |        2 (before `--`) |  yes  | `"()"`      |             1 |
|   3 |  `(`   |         2 (after `++`) |  yes  | `"()("`     |             2 |
|   4 |  `)`   |        2 (before `--`) |  yes  | `"()()"`    |             1 |
|   5 |  `)`   |        1 (before `--`) |  no   | `"()()"`    |             0 |
|   6 |  `(`   |         1 (after `++`) |  no   | `"()()"`    |             1 |
|   7 |  `(`   |         2 (after `++`) |  yes  | `"()()("`   |             2 |
|   8 |  `)`   |        2 (before `--`) |  yes  | `"()()()"`  |             1 |
|   9 |  `)`   |        1 (before `--`) |  no   | `"()()()"`  |             0 |

Final:

```text
ans = "()()()"
```

which matches the expected output. Notice how `level` returns to `0` at index `5` and index `9` — those are exactly the boundaries between primitives.

---

# Example Where Everything Is Removed

Consider:

```text
s = "()()"
```

| `i` | `s[i]` | `level` used for check | Keep? | `ans` after | `level` after |
| --: | :----: | ---------------------: | :---: | ----------- | ------------: |
|   0 |  `(`   |         1 (after `++`) |  no   | `""`        |             1 |
|   1 |  `)`   |        1 (before `--`) |  no   | `""`        |             0 |
|   2 |  `(`   |         1 (after `++`) |  no   | `""`        |             1 |
|   3 |  `)`   |        1 (before `--`) |  no   | `""`        |             0 |

Every character sits at level `1`, so every character is skipped:

```text
ans = ""
```

---

# Code Breakdown

## Full Solution

```js
var removeOuterParentheses = function (s) {
  let level = 0;
  let ans = "";

  for (let i = 0; i < s.length; i++) {
    if (s[i] === "(") {
      level++;
      if (level > 1) {
        ans = ans + s[i];
      }
    } else {
      if (level > 1) {
        ans = ans + s[i];
      }
      level--;
    }
  }

  return ans;
};
```

## Why Not Explicitly Split Into Primitives?

We could first split `s` into primitives (cutting whenever `level` returns to `0`) and then trim the first and last character of each one. That works, but it needs two passes and extra substrings. Since the outermost brackets are fully determined by the `level` value, we can filter them out in a **single pass** with no splitting.

## Why Is the Check Order Different for `(` and `)`?

- `(` opens a **new** level, so we increment first and then ask "is the new level deeper than 1?"
- `)` closes the **current** level, so we ask "is the level I'm closing deeper than 1?" first and decrement after.

Getting this order wrong shifts the check by one and would keep or drop the wrong characters.

---

# Complexity

Let `n` be the length of `s`.

## Time Complexity

We traverse the string once with constant work per character:

```text
Time Complexity: O(n)
```

Note: repeated `ans = ans + s[i]` is fine in modern JavaScript engines (they optimize string concatenation internally). In an interview, you can mention that collecting characters in an array and calling `join("")` at the end is the safer pattern in languages where strings are immutable (like Java, where you would use a `StringBuilder`).

## Space Complexity

The output string holds up to `n - 2` characters:

```text
Space Complexity: O(n)
```

The extra state beyond the output is just the `level` counter, which is `O(1)`.

---

# Key Takeaways

### 1. Track Nesting With a Single Counter

For valid parentheses problems, you rarely need a stack. A simple integer `level` that goes up on `(` and down on `)` captures all the nesting information you need.

---

### 2. Primitive Boundaries = Level Returns to Zero

A primitive string starts when `level` goes `0 → 1` and ends when it goes `1 → 0`. Recognizing this lets you find boundaries without splitting the string.

---

### 3. Order of Update vs Check Matters

For `(`, update the counter first and then check. For `)`, check first and then update. This asymmetry keeps opening and closing brackets of the same pair on the same level.

---

### 4. Single Pass Beats Split-and-Trim

Instead of decomposing into primitives and trimming each one, filtering by `level > 1` gives the same result in one pass with less memory.

---

# Pattern to Remember

```text
Scan s, track level
        ↓
'(' → level++ → keep if level > 1
')' → keep if level > 1 → level--
        ↓
level == 1 characters are the outer wrapper
        ↓
Skip those, keep everything deeper
```

**Pattern:** Nesting-Level Counter — Filter Characters by Depth

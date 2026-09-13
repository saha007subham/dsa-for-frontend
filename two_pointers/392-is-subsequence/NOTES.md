# Notes — Is Subsequence

## Approach

We need to determine whether string `s` can be formed from string `t` by deleting some characters without changing the order of the remaining characters.

The key requirement is:

> The characters of `s` must appear in `t` in the same relative order.

We can solve this using **Two Pointers**.

```text
i → points to s
j → points to t
```

We scan `t` from left to right and try to match every character of `s`.

---

## Step 1: Initialize Two Pointers

The solution starts with:

```js
let i = 0;
let j = 0;
```

Here:

```text
i → current character of s
j → current character of t
```

For:

```text
s = "abc"
t = "ahbgdc"
```

we start at:

```text
s: a b c
   ↑
   i

t: a h b g d c
   ↑
   j
```

---

## Step 2: Traverse String `t`

The solution uses:

```js
while(j < t.length)
```

We scan every character of `t`.

Inside the loop:

```js
if (s[i] === t[j]) {
  i++;
}

j++;
```

There are two possibilities.

---

## Case 1: Characters Match

If:

```js
s[i] === t[j];
```

we found the next required character of `s`.

So we move `i` forward:

```js
i++;
```

We always move `j` forward because we have processed the current character of `t`.

---

## Case 2: Characters Don't Match

If:

```text
s[i] !== t[j]
```

we don't need to do anything with `i`.

We simply move `j` forward:

```js
j++;
```

This means:

> Skip the current character of `t` and continue searching for the current character of `s`.

---

# Dry Run

Consider:

```text
s = "abc"
t = "ahbgdc"
```

Initial:

```text
i = 0
j = 0
```

---

### Step 1

```text
s[i] = a
t[j] = a
```

They match.

Move `i`:

```text
i = 1
```

Move `j`:

```text
j = 1
```

---

### Step 2

```text
s[i] = b
t[j] = h
```

They don't match.

So:

```text
i = 1
j = 2
```

---

### Step 3

```text
s[i] = b
t[j] = b
```

They match.

Move `i`:

```text
i = 2
```

Move `j`:

```text
j = 3
```

---

### Step 4

```text
s[i] = c
t[j] = g
```

No match.

Move `j`:

```text
j = 4
```

---

### Step 5

```text
s[i] = c
t[j] = d
```

No match.

Move `j`:

```text
j = 5
```

---

### Step 6

```text
s[i] = c
t[j] = c
```

Match.

Move `i`:

```text
i = 3
```

Now:

```text
i === s.length
```

which means all characters of `s` were found.

Return:

```text
true
```

---

# Complete Dry Run

```text
s = "abc"
t = "ahbgdc"
```

| `s[i]` | `t[j]` | Match? | Action   |
| :----: | :----: | :----: | -------- |
|   a    |   a    |  Yes   | `i++`    |
|   b    |   h    |   No   | Skip `h` |
|   b    |   b    |  Yes   | `i++`    |
|   c    |   g    |   No   | Skip `g` |
|   c    |   d    |   No   | Skip `d` |
|   c    |   c    |  Yes   | `i++`    |

At the end:

```text
i = 3
s.length = 3
```

Therefore:

```text
true
```

---

# Example Where It Fails

Consider:

```text
s = "axc"
t = "ahbgdc"
```

We need to find:

```text
a → x → c
```

in that order.

First:

```text
a
```

is found.

Then we scan the rest of `t`:

```text
h → b → g → d → c
```

There is no `x`.

So:

```text
i = 1
```

when the loop finishes.

But:

```text
i !== s.length
```

Therefore:

```text
false
```

---

# Final Check

After scanning all of `t`, the solution checks:

```js
if (i === s.length) {
  return true;
}

return false;
```

If `i` reaches `s.length`, every character in `s` was successfully matched.

Otherwise, at least one character from `s` was not found.

---

# Why This Works

A subsequence only requires that characters appear in the **same relative order**.

We don't need characters to be adjacent.

For example:

```text
s = "abc"
t = "ahbgdc"
```

We can match:

```text
a → a
b → b
c → c
```

while skipping:

```text
h, g, d
```

The pointer `j` is responsible for scanning `t`, while `i` only moves when we find the next required character.

Therefore, the order of characters in `s` is automatically preserved.

---

# Code Breakdown

## Initialize Pointers

```js
let i = 0;
let j = 0;
```

`i` tracks the current character of `s`.

`j` scans through `t`.

---

## Scan `t`

```js
while(j < t.length){
```

Continue until every character of `t` has been checked.

---

## Match Characters

```js
if (s[i] === t[j]) {
  i++;
}
```

When the characters match, we have successfully found the next character of `s`.

---

## Always Move `j`

```js
j++;
```

Whether the characters match or not, the current character of `t` has been processed.

So `j` always moves forward.

---

## Check Whether All Characters Were Found

```js
if (i === s.length) {
  return true;
}
```

If `i` reaches the end of `s`, then `s` is a subsequence of `t`.

Otherwise:

```js
return false;
```

---

# Edge Case: Empty `s`

The constraints allow:

```text
s.length = 0
```

Suppose:

```text
s = ""
t = "abc"
```

Initially:

```text
i = 0
s.length = 0
```

Therefore, after scanning:

```text
i === s.length
```

is true.

So the solution returns:

```text
true
```

This is correct because an empty string is a subsequence of every string.

---

# Complexity

Let:

```text
m = s.length
n = t.length
```

## Time Complexity

The pointer `j` traverses `t` once:

```text
O(n)
```

The pointer `i` only moves forward and never moves backward.

Therefore:

```text
Time Complexity: O(n)
```

More precisely, the loop runs through `t`, so the complexity is `O(t.length)`.

## Space Complexity

Only two pointer variables are used:

```js
i;
j;
```

No additional data structure is created.

Therefore:

```text
Space Complexity: O(1)
```

---

# Follow-up

The original problem asks:

> What if there are a huge number of incoming strings `s` that all need to be checked against the same `t`?

The current solution scans `t` for every incoming `s`.

If there are many queries, repeatedly scanning `t` becomes expensive.

A better approach is to **preprocess `t`**.

For each character (`a` to `z`), store the indices where it occurs in `t`.

For example:

```text
t = "ahbgdc"
```

We can store something conceptually like:

```text
a → [0]
b → [2]
c → [5]
d → [4]
g → [3]
h → [1]
```

For every incoming `s`, use **binary search** to find the next occurrence of each required character after the previously matched position.

This changes the repeated-query approach from scanning the entire `t` every time to approximately:

```text
Preprocessing: O(n)

Each query: O(m log n)
```

where `m` is the length of the incoming string `s`.

This is much better when the same `t` is queried many times.

---

# Key Takeaways

### 1. Subsequence ≠ Substring

A subsequence does **not** require characters to be adjacent.

```text
"ace" → subsequence of "abcde"
```

But:

```text
"aec" → not a subsequence
```

because the order is wrong.

---

### 2. Two Pointer Pattern

For checking whether one sequence exists inside another while preserving order:

```text
i → smaller sequence
j → larger sequence
```

When characters match:

```text
i++
```

Always:

```text
j++
```

---

### 3. Order Matters

We never move `i` backward.

Therefore, the characters of `s` must always be matched in their original order.

---

### 4. Sorted Array Is Not Required

Unlike problems such as **Two Sum II**, this two-pointer technique does not depend on sorting.

It works because we are checking whether the characters of one sequence appear in the correct order inside another sequence.

---

# Pattern to Remember

```text
s = "abc"
t = "ahbgdc"

i → points to what we need
j → scans what we have

Match:
    i++

Always:
    j++

End:
    i === s.length → true
```

**Pattern:** Two Pointers + Sequential Matching

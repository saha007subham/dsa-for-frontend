# Approach — Remove All Adjacent Duplicates In String

## Problem

We need to repeatedly remove two adjacent characters if they are equal.

For example:

```text
"abbaca"
```

Remove `"bb"`:

```text
"abbaca"
  ↓
"aaca"
```

Now remove `"aa"`:

```text
"aaca"
 ↓
"ca"
```

Final answer:

```text
"ca"
```

---

## Approach

We can solve this problem efficiently using a **Stack**.

### Why Stack?

When we process a character, we only need to compare it with the **previous remaining character**.

The stack's top element represents exactly that previous remaining character.

For every character `ch`:

1. If the stack is not empty and the top element is equal to `ch`:
   - Remove the top element using `pop()`.
   - This simulates removing the adjacent duplicate pair.

2. Otherwise:
   - Add `ch` to the stack using `push()`.

At the end, the stack contains the final string.

---

## Algorithm

```text
Create an empty stack

For every character ch in s:

    If stack is not empty AND
       stack top == ch:

        pop the stack

    Else:

        push ch into the stack

Return stack joined as a string
```

---

## Dry Run

Consider:

```text
s = "abbaca"
```

| Character | Stack Before | Action         | Stack After |
| --------- | ------------ | -------------- | ----------- |
| `a`       | `[]`         | Push `a`       | `[a]`       |
| `b`       | `[a]`        | Push `b`       | `[a,b]`     |
| `b`       | `[a,b]`      | `b == b` → Pop | `[a]`       |
| `a`       | `[a]`        | `a == a` → Pop | `[]`        |
| `c`       | `[]`         | Push `c`       | `[c]`       |
| `a`       | `[c]`        | Push `a`       | `[c,a]`     |

Finally:

```text
stack = ['c', 'a']
```

Join the stack:

```text
"ca"
```

## Important Line

```javascript
stack[stack.length - 1] === ch;
```

This gets the **top element of the stack** and compares it with the current character.

For example:

```text
stack = ['a', 'b']
ch = 'b'
```

The top element is:

```javascript
stack[stack.length - 1]
        ↓
       'b'
```

Therefore:

```javascript
"b" === "b";
```

is `true`, so:

```javascript
stack.pop();
```

removes the duplicate `b`.

---

## Why Does This Handle New Duplicates?

This is the most important part of the problem.

Consider:

```text
"abbaca"
```

After removing `bb`:

```text
"aaca"
```

Now the two `a`s become adjacent and must also be removed.

The stack naturally handles this:

```text
a → [a]
b → [a,b]
b → [a]       // remove b,b
a → []        // remove a,a
c → [c]
a → [c,a]
```

So we don't need to manually restart the string after every removal.

The stack automatically exposes the new adjacent pair.

---

## Complexity

Let `n` be the length of the string.

### Time Complexity

```text
O(n)
```

Each character is pushed into the stack at most once and popped at most once.

### Space Complexity

```text
O(n)
```

In the worst case, no characters are removed and the stack contains all `n` characters.

---

## Key Pattern to Remember

Whenever you see a problem involving:

- Adjacent elements
- Removing pairs
- Undoing the previous element
- Matching the current element with the previous remaining element

Think about using a **Stack**.

The core pattern is:

```javascript
if (stack.length > 0 && stack[stack.length - 1] === current) {
  stack.pop();
} else {
  stack.push(current);
}
```

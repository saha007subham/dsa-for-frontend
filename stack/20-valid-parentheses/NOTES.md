# Notes — 20. Valid Parentheses

## Approach

The problem can be solved using a **Stack**.

The main idea is:

- Whenever we encounter an **opening bracket**, we push it into the stack.
- Whenever we encounter a **closing bracket**, we remove the most recent opening bracket from the stack using `pop()`.
- We then check whether the opening and closing brackets are of the same type.
- If they don't match, the string is invalid.
- At the end, the stack must be empty for the string to be valid.

### Why Stack?

Brackets need to be closed in the **correct order**.

For example:

```text
"([])"
```

The brackets are opened in this order:

```text
(
[
```

Therefore, `[` must be closed first:

```text
]
```

and then `(`:

```text
)
```

This follows **LIFO (Last In, First Out)**, which is exactly how a Stack works.

---

## Algorithm

Create an empty stack:

```javascript
let stack = [];
```

Traverse the string from left to right.

### Step 1: Opening Bracket

If the current character is:

```text
(
{
[
```

push it into the stack.

```javascript
stack.push(s[i]);
```

### Step 2: Closing Bracket

If the current character is a closing bracket:

```text
)
}
]
```

remove the top element:

```javascript
let top = stack.pop();
```

The `top` variable contains the opening bracket that should match the current closing bracket.

### Step 3: Validate the Pair

We need to make sure:

```text
( → )
{ → }
[ → ]
```

If there is no opening bracket or the brackets don't match, return `false`.

```javascript
if (
  !top ||
  (s[i] === ")" && top !== "(") ||
  (s[i] === "}" && top !== "{") ||
  (s[i] === "]" && top !== "[")
) {
  return false;
}
```

### Step 4: Check the Stack

After processing the entire string:

```javascript
return stack.length === 0;
```

If the stack is empty, every opening bracket has been correctly closed.

If the stack still contains brackets, some opening brackets were never closed.

---

## Dry Run

### Example 1

```text
s = "()"
```

Start:

```text
stack = []
```

#### Character: `(`

Opening bracket → push:

```text
stack = ["("]
```

#### Character: `)`

Closing bracket → pop:

```text
top = "("
stack = []
```

Check:

```text
")" matches "("
```

At the end:

```text
stack.length === 0
```

Therefore:

```text
true
```

---

## Dry Run — Example 2

```text
s = "([)]"
```

Start:

```text
stack = []
```

### Character: `(`

```text
stack = ["("]
```

### Character: `[`

```text
stack = ["(", "["]
```

### Character: `)`

Pop the top:

```text
top = "["
stack = ["("]
```

But:

```text
")" requires "("
```

while:

```text
top = "["
```

The brackets don't match.

Therefore:

```text
return false
```

This is why:

```text
"([)]"
```

is invalid.

---

## Important Part of the Code

```javascript
let top = stack.pop();
```

This is one of the most important lines.

Suppose:

```text
stack = ["(", "{"]
```

and the current character is:

```text
"}"
```

Calling:

```javascript
stack.pop();
```

returns:

```text
"{"
```

So:

```javascript
top = "{";
```

Now we can check:

```text
"}" matches "{"
```

which is valid.

---

## Why Do We Check `!top`?

Consider:

```text
s = ")"
```

There is no opening bracket before `)`.

Initially:

```text
stack = []
```

When we process `)`:

```javascript
let top = stack.pop();
```

Since the stack is empty:

```text
top = undefined
```

Therefore:

```javascript
!top;
```

is `true`.

So we immediately return:

```javascript
false;
```

This prevents a closing bracket from existing without a corresponding opening bracket.

---

## Why Do We Check `stack.length === 0`?

Consider:

```text
s = "((("
```

Every character is an opening bracket:

```text
( → ["("]
( → ["(", "("]
( → ["(", "(", "("]
```

There are no closing brackets.

At the end:

```text
stack.length = 3
```

Therefore:

```javascript
stack.length === 0;
```

is `false`.

So the string is invalid.

---

## JavaScript Solution

The complete solution is available in [`solution.js`](./solution.js).

```javascript
var isValid = function (s) {
  let stack = [];

  for (let i = 0; i < s.length; i++) {
    if (s[i] === "(" || s[i] === "{" || s[i] === "[") {
      stack.push(s[i]);
    } else {
      let top = stack.pop();

      if (
        !top ||
        (s[i] === ")" && top !== "(") ||
        (s[i] === "}" && top !== "{") ||
        (s[i] === "]" && top !== "[")
      ) {
        return false;
      }
    }
  }

  return stack.length === 0;
};
```

---

## Complexity

Let `n` be the length of the string.

### Time Complexity

```text
O(n)
```

We traverse the string once.

Each bracket is pushed into or popped from the stack at most once.

### Space Complexity

```text
O(n)
```

In the worst case, all characters can be opening brackets, so the stack can contain `n` elements.

---

## Key Pattern to Remember

When you see a problem involving:

- Matching brackets
- Nested structures
- Opening and closing pairs
- Correct ordering
- Last opened → first closed

Think about a **Stack**.

The general pattern is:

```text
Opening bracket → PUSH

Closing bracket → POP + CHECK

End → Stack must be empty
```

### Bracket Mapping

```text
( → )
{ → }
[ → ]
```

The most important concept is:

> **The last opening bracket must be the first one to close.**

That's why the **Stack (LIFO)** is the natural data structure for this problem.

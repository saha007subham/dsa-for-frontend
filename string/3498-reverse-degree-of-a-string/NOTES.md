# Notes — Reverse Degree of a String

## Approach

For every character in the string, we need to calculate:

```text
Reverse Alphabet Value × Position in String
```

The alphabet is reversed:

```text
a → 26
b → 25
c → 24
...
x → 3
y → 2
z → 1
```

The solution uses a `Map` to store these values.

Then, while traversing the string, it gets the reverse alphabet value of each character, multiplies it by its **1-indexed position**, and adds the result to the answer.

---

## Step 1: Create the Reverse Alphabet Map

The solution creates:

```js
let map = new Map();
let count = 26;

let arr = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
```

The variable `count` starts from `26`.

Then:

```js
for (let i = 0; i < 26; i++) {
  map.set(arr[i], count);
  count--;
}
```

This produces:

```text
a → 26
b → 25
c → 24
d → 23
...
x → 3
y → 2
z → 1
```

---

## Step 2: Traverse the String

The solution then loops through every character:

```js
for(let i = 0; i < s.length; i++){
```

For each character:

```js
let curr = s[i];
```

---

## Step 3: Get the Reverse Alphabet Value

The value is retrieved from the map:

```js
let val = map.get(curr);
```

For example:

```text
curr = "c"
```

Then:

```text
val = 24
```

because `c` is the 3rd letter normally, but its reverse alphabet value is:

```text
26 - 3 + 1 = 24
```

---

## Step 4: Get the 1-Indexed Position

JavaScript array/string indexes are zero-based.

Therefore, the solution converts the index to a 1-based position:

```js
let idx = i + 1;
```

For example:

```text
i = 0 → idx = 1
i = 1 → idx = 2
i = 2 → idx = 3
```

This matches the problem requirement.

---

## Step 5: Calculate the Product

For each character:

```js
let sum = val * idx;
```

This calculates:

```text
Reverse Alphabet Value × String Position
```

Then it is added to the final answer:

```js
product = product + sum;
```

---

# Dry Run

Consider:

```text
s = "abc"
```

The reverse alphabet values are:

```text
a → 26
b → 25
c → 24
```

### Character 1

```text
Character = a
Reverse value = 26
Position = 1
```

Product:

```text
26 × 1 = 26
```

Current total:

```text
26
```

---

### Character 2

```text
Character = b
Reverse value = 25
Position = 2
```

Product:

```text
25 × 2 = 50
```

Current total:

```text
26 + 50 = 76
```

---

### Character 3

```text
Character = c
Reverse value = 24
Position = 3
```

Product:

```text
24 × 3 = 72
```

Final total:

```text
76 + 72 = 148
```

Therefore:

```text
answer = 148
```

---

# Complete Dry Run Table

For:

```text
s = "abc"
```

| Index `i` | Character | Reverse Value | Position `i + 1` | Product |
| --------: | :-------: | ------------: | ---------------: | ------: |
|         0 |    `a`    |            26 |                1 |      26 |
|         1 |    `b`    |            25 |                2 |      50 |
|         2 |    `c`    |            24 |                3 |      72 |

Final:

```text
26 + 50 + 72 = 148
```

---

# Another Example

Consider:

```text
s = "zaza"
```

Reverse alphabet values:

```text
z → 1
a → 26
z → 1
a → 26
```

Calculate each product:

```text
z → 1 × 1 = 1
a → 26 × 2 = 52
z → 1 × 3 = 3
a → 26 × 4 = 104
```

Therefore:

```text
1 + 52 + 3 + 104 = 160
```

Answer:

```text
160
```

---

# Code Breakdown

## Create Map

```js
let map = new Map();
let count = 26;
```

`count` represents the reverse alphabet value.

---

## Store Reverse Alphabet Values

```js
for (let i = 0; i < 26; i++) {
  map.set(arr[i], count);
  count--;
}
```

This creates:

```text
a → 26
b → 25
...
z → 1
```

---

## Traverse String

```js
for(let i = 0; i < s.length; i++){
```

Process each character one by one.

---

## Get Character Value

```js
let curr = s[i];
let val = map.get(curr);
```

Find the reverse alphabet value.

---

## Convert Index to 1-Based Position

```js
let idx = i + 1;
```

The problem uses 1-indexed positions.

---

## Calculate Contribution

```js
let sum = val * idx;
```

Calculate the character's contribution to the reverse degree.

---

## Add to Result

```js
product = product + sum;
```

Add the current contribution to the total.

---

# Complexity

Let `n` be the length of the string.

## Time Complexity

Building the alphabet map always takes:

```text
O(26)
```

which is effectively:

```text
O(1)
```

Traversing the string takes:

```text
O(n)
```

Therefore:

```text
O(26) + O(n)
```

which simplifies to:

```text
Time Complexity: O(n)
```

## Space Complexity

The solution stores 26 characters in the `Map`:

```text
O(26)
```

Since the alphabet size is fixed, this is:

```text
Space Complexity: O(1)
```

---

# Key Takeaways

### 1. Reverse Alphabet Mapping

The reverse alphabet follows:

```text
a → 26
b → 25
...
y → 2
z → 1
```

A character's reverse value can also be calculated mathematically:

```text
26 - (character position) + 1
```

---

### 2. 1-Based Indexing

The string uses zero-based indexes in JavaScript:

```text
0, 1, 2, 3...
```

But the problem requires:

```text
1, 2, 3, 4...
```

Therefore:

```js
i + 1;
```

---

### 3. Character Contribution

Each character contributes:

```text
reverse alphabet value × string position
```

The final answer is the sum of all contributions.

---

# Pattern to Remember

```text
Create reverse alphabet mapping
          ↓
Traverse the string
          ↓
Get reverse alphabet value
          ↓
Get 1-indexed position
          ↓
value × position
          ↓
Add to answer
```

**Pattern:** Character Mapping + Indexed Calculation

```

```

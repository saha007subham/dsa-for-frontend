# Notes — 2396. Strictly Palindromic Number

## Approach

The problem asks us to check whether `n` is a palindrome in **every base from `2` to `n - 2`**.

The approach is:

1. Iterate through every base from `2` to `n - 2`.
2. Convert `n` into the current base.
3. Check whether the converted representation is a palindrome.
4. If any representation is not a palindrome, return `false`.
5. If every representation is a palindrome, return `true`.

The solution uses three functions:

```text
isStrictlyPalindromic()
        ↓
   convertToBase()
        ↓
   isPalindrome()
```

---

## Step 1 — Check Every Base

The problem requires us to check every base from `2` through `n - 2`.

```javascript
for (let i = 2; i <= n - 2; i++) {
  let ans = convertToBase(n, i);

  if (!isPalindrome(ans)) {
    return false;
  }
}
```

Here, `i` represents the current base.

For example, if:

```text
n = 9
```

we need to check:

```text
2, 3, 4, 5, 6, 7
```

If even one base produces a non-palindromic representation, we can immediately return `false`.

---

## Step 2 — Convert Number to Another Base

The solution manually converts `n` into the required base.

The basic process is:

```text
remainder = n % base
n = floor(n / base)
```

We repeat this until `n` becomes `0`.

The remainders give us the digits of the number in the target base, but they are generated from **right to left**.

---

## Example — Convert 9 to Base 3

Start with:

```text
n = 9
base = 3
```

First division:

```text
9 % 3 = 0
9 / 3 = 3
```

Second division:

```text
3 % 3 = 0
3 / 3 = 1
```

Third division:

```text
1 % 3 = 1
1 / 3 = 0
```

The remainders are:

```text
0 → 0 → 1
```

They were generated from right to left.

Therefore, we reverse them:

```text
100
```

So:

```text
9 = 100₃
```

Since `"100"` is not a palindrome, `9` is not strictly palindromic.

---

## `convertToBase()`

```javascript
function convertToBase(n, base) {
  let result = "";

  while (n > 0) {
    result += n % base;
    n = Math.floor(n / base);
  }

  return result.split("").reverse().join("");
}
```

### Why Do We Reverse?

The first remainder represents the **last digit**.

For:

```text
9 → base 3
```

we get:

```text
remainders = 0, 0, 1
```

But the correct representation is:

```text
100
```

Therefore:

```javascript
result.split("").reverse().join("");
```

reverses the generated digits.

---

## Step 3 — Check Palindrome

After converting `n` to a string, we use the **two-pointer technique**.

```javascript
function isPalindrome(str) {
  let start = 0;
  let end = str.length - 1;

  while (start <= end) {
    if (str[start] !== str[end]) {
      return false;
    }

    start++;
    end--;
  }

  return true;
}
```

One pointer starts at the beginning:

```text
start → 0
```

The other starts at the end:

```text
end → str.length - 1
```

We compare:

```text
str[start] === str[end]
```

If they are different, the string is not a palindrome.

Otherwise, both pointers move toward the center.

---

## Dry Run

Consider:

```text
n = 9
```

### Base = 2

Convert `9` to base 2:

```text
9 = 1001₂
```

Representation:

```text
"1001"
```

Check:

```text
1 == 1
0 == 0
```

Therefore, it is a palindrome.

Continue to the next base.

---

### Base = 3

Convert `9` to base 3:

```text
9 = 100₃
```

Representation:

```text
"100"
```

Check:

```text
1 !== 0
```

Therefore, it is not a palindrome.

We immediately return:

```javascript
return false;
```

There is no need to check the remaining bases.

---

## Example 2

```text
n = 4
```

The only base in the range is:

```text
2
```

Convert:

```text
4 = 100₂
```

Representation:

```text
"100"
```

Compare the first and last characters:

```text
1 !== 0
```

Therefore:

```text
false
```

---

## Complete Solution

The implementation is available in [`solution.js`](./solution.js).

```javascript
/**
 * @param {number} n
 * @return {boolean}
 */
var isStrictlyPalindromic = function (n) {
  for (let i = 2; i <= n - 2; i++) {
    let ans = convertToBase(n, i);

    if (!isPalindrome(ans)) {
      return false;
    }
  }

  return true;
};

function isPalindrome(str) {
  let start = 0;
  let end = str.length - 1;

  while (start <= end) {
    if (str[start] !== str[end]) {
      return false;
    }

    start++;
    end--;
  }

  return true;
}

function convertToBase(n, base) {
  let result = "";

  while (n > 0) {
    result += n % base;
    n = Math.floor(n / base);
  }

  return result.split("").reverse().join("");
}
```

---

## Code Breakdown

### Iterate Through Every Base

```javascript
for (let i = 2; i <= n - 2; i++)
```

This checks every required base.

---

### Convert `n`

```javascript
let ans = convertToBase(n, i);
```

This gives us the representation of `n` in the current base.

---

### Check the Representation

```javascript
if (!isPalindrome(ans)) {
  return false;
}
```

One non-palindromic representation is enough to prove that `n` is not strictly palindromic.

---

### Return True

```javascript
return true;
```

If every base produces a palindrome, then the number is strictly palindromic.

---

## Complexity

Let `n` be the input number.

### Time Complexity

```text
O(n log n)
```

We check approximately `n` different bases.

For each base:

- `convertToBase()` takes `O(log n)` time in the worst case.
- `isPalindrome()` takes at most `O(log n)` time because the base representation contains at most `O(log n)` digits.

Therefore, a simple upper bound for the complete solution is:

```text
O(n × log n)
```

which is:

```text
O(n log n)
```

> Note: This is an upper bound for the implementation. The actual total work across all bases is smaller because representations become shorter as the base increases.

### Space Complexity

```text
O(log n)
```

The converted base representation is stored as a string and can contain up to `O(log n)` digits.

Apart from this temporary representation, the algorithm uses `O(1)` additional variables.

---

## Key Takeaways

This problem combines two useful techniques.

### 1. Number Base Conversion

Repeatedly divide by the base:

```text
remainder = n % base
n = floor(n / base)
```

The remainders give the digits from right to left.

### 2. Two-Pointer Palindrome Check

Compare characters from both ends:

```text
start →

← end
```

Move both pointers toward the center.

---

## General Pattern

When a problem asks:

> Is a number a palindrome in another base?

Think:

```text
Number
   ↓
Convert to base
   ↓
String representation
   ↓
Two-pointer palindrome check
```

The main concepts to remember are:

- **Base conversion using repeated division**
- **Two-pointer palindrome checking**
- **Early return when a condition fails**

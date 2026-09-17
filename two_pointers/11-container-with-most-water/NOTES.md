# Notes — Container With Most Water

## Approach

We need to find two vertical lines that can hold the maximum amount of water.

For two lines at indices `i` and `j`:

```text
height[i]       height[j]
    |               |
    |               |
    |~~~~~~~~~~~~~~~|
    |     water     |
    |_______________|
          width
```

The amount of water is:

```text
Area = height × width
```

The height of the water is limited by the **shorter line**:

```text
height = Math.min(height[i], height[j])
```

The width is the distance between the two indices:

```text
width = j - i
```

Therefore:

```text
Area = Math.min(height[i], height[j]) × (j - i)
```

The solution uses **Two Pointers** to find the maximum area in `O(n)` time.

---

# Step 1: Initialize Two Pointers

The solution starts with:

```js
let i = 0;
let j = arr.length - 1;
let maxArea = 0;
```

So one pointer starts at the beginning and the other at the end.

For:

```text
arr = [1,8,6,2,5,4,8,3,7]
```

we start with:

```text
i = 0
j = 8
```

Visually:

```text
[1, 8, 6, 2, 5, 4, 8, 3, 7]
 ↑                               ↑
 i                               j
```

This gives us the maximum possible width initially.

---

# Step 2: Calculate the Area

The solution calculates:

```js
let area = Math.min(arr[i], arr[j]) * (j - i);
```

There are two important parts.

### Height

```js
Math.min(arr[i], arr[j]);
```

The shorter line determines how high the water can rise.

For example:

```text
arr[i] = 8
arr[j] = 7
```

The container height is:

```text
min(8, 7) = 7
```

It cannot be `8` because water would overflow over the line with height `7`.

### Width

```js
j - i;
```

The width is the horizontal distance between the two lines.

If:

```text
i = 1
j = 8
```

then:

```text
width = 8 - 1 = 7
```

Therefore:

```text
Area = min(8, 7) × 7
     = 7 × 7
     = 49
```

---

# Why `Math.min(arr[i], arr[j])`?

This is one of the most important concepts in this problem.

Suppose:

```text
left height  = 8
right height = 5
```

The container looks like:

```text
8
|          5
|          |
|~~~~~~~~~~|
|  water   |
|__________|
```

Even though the left line has height `8`, water can only reach height `5`.

Therefore:

```text
Container Height = min(8, 5)
                 = 5
```

So the formula is:

```text
Area = min(leftHeight, rightHeight) × width
```

---

# Why Is Width `j - i`?

The array index represents the x-coordinate of each vertical line.

If the two lines are at:

```text
i = 1
j = 8
```

their horizontal distance is:

```text
8 - 1 = 7
```

Therefore:

```text
Width = j - i
```

Not:

```text
j - i + 1
```

because we are measuring the distance **between** the two vertical lines, not the number of array elements between them.

---

# Step 3: Track the Maximum Area

After calculating the current area:

```js
maxArea = Math.max(maxArea, area);
```

This keeps the largest area found so far.

For example:

```text
maxArea = 40
area = 49
```

Then:

```text
maxArea = 49
```

If:

```text
maxArea = 49
area = 30
```

then:

```text
maxArea = 49
```

---

# Step 4: Decide Which Pointer to Move

This is the key part of the algorithm:

```js
if (arr[i] > arr[j]) {
  j--;
} else {
  i++;
}
```

The pointer at the **shorter line** is moved.

---

# Why Move the Shorter Pointer?

Suppose:

```text
left height = 8
right height = 5
```

The current height is:

```text
5
```

because the right line is shorter.

Now suppose we move the taller left line:

```text
left pointer →
```

The width decreases.

But the limiting height is still potentially `5` or less.

So moving the taller line cannot give us a better area **with the current shorter boundary**.

Instead, we move the shorter line:

```text
right pointer ←
```

This gives us a chance to find a taller right boundary.

The width decreases, but the height may increase.

That trade-off is what makes the Two Pointer approach work.

---

# Dry Run

Consider:

```text
arr = [1,8,6,2,5,4,8,3,7]
```

Initial:

```text
i = 0
j = 8
```

### Step 1

Values:

```text
arr[i] = 1
arr[j] = 7
```

Height:

```text
min(1, 7) = 1
```

Width:

```text
8 - 0 = 8
```

Area:

```text
1 × 8 = 8
```

Update:

```text
maxArea = 8
```

Since:

```text
1 < 7
```

move `i`:

```text
i++
```

---

### Step 2

Now:

```text
i = 1
j = 8
```

Values:

```text
arr[i] = 8
arr[j] = 7
```

Height:

```text
min(8, 7) = 7
```

Width:

```text
8 - 1 = 7
```

Area:

```text
7 × 7 = 49
```

Update:

```text
maxArea = 49
```

Since:

```text
8 > 7
```

move `j`:

```text
j--
```

---

### Step 3

Now:

```text
i = 1
j = 7
```

Values:

```text
arr[i] = 8
arr[j] = 3
```

Height:

```text
3
```

Width:

```text
7 - 1 = 6
```

Area:

```text
3 × 6 = 18
```

`maxArea` remains:

```text
49
```

Since:

```text
8 > 3
```

move `j`.

The same process continues until:

```text
i >= j
```

Final:

```text
maxArea = 49
```

---

# Complete Dry Run

For:

```text
arr = [1,8,6,2,5,4,8,3,7]
```

| `i` | `j` | Left | Right | Height | Width | Area | `maxArea` | Move  |
| --: | --: | ---: | ----: | -----: | ----: | ---: | --------: | :---- |
|   0 |   8 |    1 |     7 |      1 |     8 |    8 |         8 | `i++` |
|   1 |   8 |    8 |     7 |      7 |     7 |   49 |        49 | `j--` |
|   1 |   7 |    8 |     3 |      3 |     6 |   18 |        49 | `j--` |
|   1 |   6 |    8 |     8 |      8 |     5 |   40 |        49 | `i++` |
|   2 |   6 |    6 |     8 |      6 |     4 |   24 |        49 | `i++` |
|   3 |   6 |    2 |     8 |      2 |     3 |    6 |        49 | `i++` |
|   4 |   6 |    5 |     8 |      5 |     2 |   10 |        49 | `i++` |
|   5 |   6 |    4 |     8 |      4 |     1 |    4 |        49 | `i++` |

Final:

```text
49
```

---

# Why the Two Pointer Approach Works

Initially, the pointers are at both ends of the array, giving us the **maximum possible width**.

For any pair:

```text
Area = min(height[i], height[j]) × (j - i)
```

When we move a pointer inward, the width always decreases.

Therefore, to have any chance of finding a larger area, we need to potentially increase the limiting height.

The limiting height is the **shorter line**.

So:

```text
shorter line → move its pointer
taller line  → keep it
```

This allows us to eliminate pointer positions that cannot produce a better container with the current opposite boundary.

---

# Code Breakdown

## Initialize Pointers

```js
let i = 0;
let j = arr.length - 1;
```

`i` starts from the left.

`j` starts from the right.

---

## Calculate Current Area

```js
let area = Math.min(arr[i], arr[j]) * (j - i);
```

The formula is:

```text
Area = shorter height × width
```

where:

```text
shorter height = min(arr[i], arr[j])
width = j - i
```

---

## Update Maximum

```js
maxArea = Math.max(maxArea, area);
```

Keep track of the largest area found.

---

## Move the Shorter Pointer

```js
if (arr[i] > arr[j]) {
  j--;
} else {
  i++;
}
```

If the left line is taller, move the right pointer.

Otherwise, move the left pointer.

This means the shorter boundary is always discarded.

---

## Continue Until Pointers Meet

```js
while(i < j)
```

Once:

```text
i >= j
```

there are no two distinct lines left to consider.

---

# Complexity

Let `n` be the length of the array.

## Time Complexity

Both pointers move toward each other.

Each pointer moves at most `n` positions.

Therefore:

```text
Time Complexity: O(n)
```

## Space Complexity

Only a few variables are used:

```text
i
j
area
maxArea
```

No additional array or data structure is created.

Therefore:

```text
Space Complexity: O(1)
```

---

# Key Takeaways

### 1. Area Formula

Always remember:

```text
Area = min(height[i], height[j]) × (j - i)
```

### 2. Why `Math.min()`?

The shorter line determines the maximum water height.

```text
height = min(leftHeight, rightHeight)
```

### 3. Why `j - i`?

The width is the horizontal distance between the two lines.

```text
width = rightIndex - leftIndex
```

### 4. Move the Shorter Line

```text
left < right → move left
right < left → move right
```

The shorter boundary is the limiting factor.

### 5. Two Pointer Pattern

Start from both ends:

```text
i →              ← j
```

Calculate the answer and move inward.

This reduces the brute-force `O(n²)` solution to:

```text
O(n) time
O(1) space
```

---

# Pattern to Remember

```text
left = 0
right = n - 1

while left < right:

    height = min(arr[left], arr[right])
    width = right - left

    area = height × width

    update maximum

    if left height < right height:
        left++
    else:
        right--
```

**Pattern:** Two Pointers + Greedy Pointer Movement

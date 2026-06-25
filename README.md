# 🧠 DSA for Frontend Developers

> A structured collection of Data Structures & Algorithms implemented in **JavaScript/TypeScript**, crafted specifically for frontend developers preparing for technical interviews or strengthening their CS fundamentals.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Language](https://img.shields.io/badge/language-JavaScript%20%2F%20TypeScript-yellow)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)
![Status](https://img.shields.io/badge/status-active-success)

---

## 📖 Table of Contents

- [Why DSA for Frontend?](#-why-dsa-for-frontend)
- [Repository Structure](#-repository-structure)
- [Data Structures](#-data-structures)
- [Algorithms](#-algorithms)
- [Problems](#-problems)
- [Big-O Cheat Sheet](#-big-o-cheat-sheet)
- [Progress Tracker](#-progress-tracker)
- [How to Use This Repo](#-how-to-use-this-repo)
- [Running Tests](#-running-tests)
- [Resources](#-resources)
- [Contributing](#-contributing)
- [License](#-license)

---

## 💡 Why DSA for Frontend?

Frontend developers often underestimate the value of DSA — but it shows up more than you think:

- 🌳 **Virtual DOM diffing** uses tree traversal algorithms
- 🗂️ **State management** (Redux, Zustand) benefits from understanding immutable data structures
- 🔍 **Search & filter** in large lists require efficient searching techniques
- 📦 **Bundlers & compilers** (Webpack, Babel) use graphs and trees internally
- 🏢 **FAANG & product companies** still test DSA heavily in frontend interviews

This repo bridges the gap — all implementations are in JavaScript so they feel natural to frontend devs.

---

## 📁 Repository Structure

```
dsa-for-frontend/
│
├── data-structures/
│   ├── arrays/
│   │   ├── arrays.js
│   │   ├── arrays.test.js
│   │   └── README.md
│   ├── linked-lists/
│   ├── trees/
│   ├── stacks-queues/
│   ├── graphs/
│   └── hash-maps/
│
├── algorithms/
│   ├── sorting/
│   ├── searching/
│   ├── dynamic-programming/
│   └── recursion/
│
├── problems/
│   ├── easy/
│   ├── medium/
│   └── hard/
│
├── utils/
│   ├── swap.js
│   ├── printTree.js
│   └── timer.js
│
├── CONTRIBUTING.md
├── package.json
└── README.md
```

---

## 🗂️ Data Structures

Each data structure folder contains:
- ✅ Clean JavaScript/TypeScript implementation
- ✅ Unit tests using Jest
- ✅ Time & space complexity notes
- ✅ Real-world frontend use cases

| Data Structure | Implementation | Tests | Notes |
|----------------|---------------|-------|-------|
| Arrays | [arrays.js](./data-structures/arrays/arrays.js) | [arrays.test.js](./data-structures/arrays/arrays.test.js) | [README](./data-structures/arrays/README.md) |
| Linked List | [linked-list.js](./data-structures/linked-lists/linked-list.js) | [linked-list.test.js](./data-structures/linked-lists/linked-list.test.js) | [README](./data-structures/linked-lists/README.md) |
| Stack | [stack.js](./data-structures/stacks-queues/stack.js) | [stack.test.js](./data-structures/stacks-queues/stack.test.js) | [README](./data-structures/stacks-queues/README.md) |
| Queue | [queue.js](./data-structures/stacks-queues/queue.js) | [queue.test.js](./data-structures/stacks-queues/queue.test.js) | [README](./data-structures/stacks-queues/README.md) |
| Binary Tree | [binary-tree.js](./data-structures/trees/binary-tree.js) | [binary-tree.test.js](./data-structures/trees/binary-tree.test.js) | [README](./data-structures/trees/README.md) |
| BST | [bst.js](./data-structures/trees/bst.js) | [bst.test.js](./data-structures/trees/bst.test.js) | [README](./data-structures/trees/README.md) |
| Hash Map | [hash-map.js](./data-structures/hash-maps/hash-map.js) | [hash-map.test.js](./data-structures/hash-maps/hash-map.test.js) | [README](./data-structures/hash-maps/README.md) |
| Graph | [graph.js](./data-structures/graphs/graph.js) | [graph.test.js](./data-structures/graphs/graph.test.js) | [README](./data-structures/graphs/README.md) |

---

## ⚙️ Algorithms

| Algorithm | Category | Avg. Time Complexity |
|-----------|----------|----------------------|
| [Bubble Sort](./algorithms/sorting/bubble-sort.js) | Sorting | O(n²) |
| [Merge Sort](./algorithms/sorting/merge-sort.js) | Sorting | O(n log n) |
| [Quick Sort](./algorithms/sorting/quick-sort.js) | Sorting | O(n log n) |
| [Insertion Sort](./algorithms/sorting/insertion-sort.js) | Sorting | O(n²) |
| [Binary Search](./algorithms/searching/binary-search.js) | Searching | O(log n) |
| [Linear Search](./algorithms/searching/linear-search.js) | Searching | O(n) |
| [BFS](./algorithms/searching/bfs.js) | Graph Traversal | O(V + E) |
| [DFS](./algorithms/searching/dfs.js) | Graph Traversal | O(V + E) |
| [Fibonacci (Memoized)](./algorithms/dynamic-programming/fibonacci.js) | DP | O(n) |
| [Knapsack](./algorithms/dynamic-programming/knapsack.js) | DP | O(n × W) |

---

## 🧩 Problems

LeetCode-style problems organized by difficulty. Each file includes the problem statement, constraints, and solution with explanation.

### Easy
- [Two Sum](./problems/easy/two-sum.js)
- [Valid Parentheses](./problems/easy/valid-parentheses.js)
- [Reverse String](./problems/easy/reverse-string.js)
- [Maximum Subarray](./problems/easy/maximum-subarray.js)
- [Merge Two Sorted Lists](./problems/easy/merge-sorted-lists.js)

### Medium
- [Longest Substring Without Repeating Characters](./problems/medium/longest-substring.js)
- [3Sum](./problems/medium/3sum.js)
- [Binary Tree Level Order Traversal](./problems/medium/level-order-traversal.js)
- [LRU Cache](./problems/medium/lru-cache.js)
- [Number of Islands](./problems/medium/number-of-islands.js)

### Hard
- [Merge K Sorted Lists](./problems/hard/merge-k-sorted-lists.js)
- [Word Ladder](./problems/hard/word-ladder.js)
- [Serialize and Deserialize Binary Tree](./problems/hard/serialize-deserialize-tree.js)

---

## ⏱️ Big-O Cheat Sheet

### Time Complexity

| Complexity | Name | Example |
|------------|------|---------|
| O(1) | Constant | Array index access, hash map lookup |
| O(log n) | Logarithmic | Binary search |
| O(n) | Linear | Looping through an array |
| O(n log n) | Linearithmic | Merge sort, quick sort (avg) |
| O(n²) | Quadratic | Nested loops, bubble sort |
| O(2ⁿ) | Exponential | Recursive Fibonacci (naive) |
| O(n!) | Factorial | Permutations |

### Space Complexity of Common Data Structures

| Data Structure | Access | Search | Insert | Delete | Space |
|----------------|--------|--------|--------|--------|-------|
| Array | O(1) | O(n) | O(n) | O(n) | O(n) |
| Linked List | O(n) | O(n) | O(1) | O(1) | O(n) |
| Stack | O(n) | O(n) | O(1) | O(1) | O(n) |
| Queue | O(n) | O(n) | O(1) | O(1) | O(n) |
| Hash Map | O(1) | O(1) | O(1) | O(1) | O(n) |
| Binary Search Tree | O(log n) | O(log n) | O(log n) | O(log n) | O(n) |

---

## ✅ Progress Tracker

Track your learning journey. Check off topics as you complete them.

### Data Structures
- [ ] Arrays — 1D, 2D, sliding window
- [ ] Strings — manipulation, pattern matching
- [ ] Linked Lists — singly, doubly, circular
- [ ] Stacks — using arrays and linked lists
- [ ] Queues — regular, circular, priority
- [ ] Hash Maps — collision handling, custom implementation
- [ ] Trees — binary trees, BST, AVL
- [ ] Tries — prefix trees
- [ ] Heaps — min-heap, max-heap
- [ ] Graphs — adjacency list, adjacency matrix

### Algorithms
- [ ] Bubble Sort
- [ ] Insertion Sort
- [ ] Merge Sort
- [ ] Quick Sort
- [ ] Binary Search
- [ ] Breadth-First Search (BFS)
- [ ] Depth-First Search (DFS)
- [ ] Dijkstra's Algorithm
- [ ] Dynamic Programming — top-down & bottom-up
- [ ] Backtracking

### Problem-Solving Patterns
- [ ] Two Pointers
- [ ] Sliding Window
- [ ] Fast & Slow Pointers
- [ ] Merge Intervals
- [ ] Cyclic Sort
- [ ] BFS / DFS patterns
- [ ] Tree Traversals (inorder, preorder, postorder)
- [ ] Topological Sort

---

## 🚀 How to Use This Repo

### 1. Clone the repository

```bash
git clone https://github.com/your-username/dsa-for-frontend.git
cd dsa-for-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Explore a topic

Navigate to any folder and read the `README.md` first, then look at the implementation:

```bash
cd data-structures/arrays
```

### 4. Solve problems

Open a problem file, read the statement, and try to solve it before looking at the solution:

```bash
cd problems/easy
open two-sum.js
```

### 5. Run your own solutions

Each implementation file exports its functions. You can import and test them in a scratch file:

```js
import { twoSum } from './problems/easy/two-sum.js';

console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]
```

---

## 🧪 Running Tests

This repo uses **Jest** for unit testing.

```bash
# Run all tests
npm test

# Run tests for a specific file
npm test arrays

# Run tests in watch mode (great while practicing)
npm run test:watch

# See test coverage
npm run test:coverage
```

Each implementation has a corresponding `.test.js` file. Tests are structured as:

```js
describe('Array - Two Sum', () => {
  test('returns correct indices for a valid pair', () => {
    expect(twoSum([2, 7, 11, 15], 9)).toEqual([0, 1]);
  });

  test('handles negative numbers', () => {
    expect(twoSum([-1, -2, -3, -4, -5], -8)).toEqual([2, 4]);
  });
});
```

---

## 📚 Resources

### Learning DSA
- [Visualgo](https://visualgo.net) — Visual animations of DS and algorithms
- [NeetCode](https://neetcode.io) — Curated roadmap + video solutions
- [JavaScript Algorithms by trekhleb](https://github.com/trekhleb/javascript-algorithms) — Excellent JS-based reference
- [The Odin Project](https://www.theodinproject.com) — Free full-stack curriculum with CS fundamentals

### Practice Platforms
- [LeetCode](https://leetcode.com) — Industry standard for interview prep
- [HackerRank](https://www.hackerrank.com) — Good for beginners
- [CodeSignal](https://codesignal.com) — Used by many companies for assessments
- [Frontend Expert](https://www.frontendexpert.io) — DSA + frontend-specific problems

### Books
- *Cracking the Coding Interview* — Gayle Laakmann McDowell
- *Introduction to Algorithms (CLRS)* — Cormen et al.
- *Grokking Algorithms* — Aditya Bhargava *(great for visual learners)*

### Videos
- [CS50 by Harvard](https://cs50.harvard.edu) — Free, world-class CS course
- [Data Structures Easy to Advanced – freeCodeCamp](https://youtu.be/RBSGKlAvoiM)
- [JavaScript Algorithms Crash Course – Traversy Media](https://youtu.be/JgWm6sQwS_I)

---

## 🤝 Contributing

Contributions are welcome and encouraged! Whether it's fixing a bug, adding a new problem, or improving documentation:

1. Fork the repository
2. Create your branch: `git checkout -b feat/add-trie-implementation`
3. Commit your changes: `git commit -m "feat: add Trie data structure with tests"`
4. Push to the branch: `git push origin feat/add-trie-implementation`
5. Open a Pull Request

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) before submitting a PR.

> **Commit convention:** Use [Conventional Commits](https://www.conventionalcommits.org/) — `feat:`, `fix:`, `docs:`, `test:`, `refactor:`

---

## 📄 License

This project is licensed under the [MIT License](./LICENSE).

---

<div align="center">

Made with ❤️ for Frontend Developers

⭐ Star this repo if it helped you — it motivates continued updates!

</div>

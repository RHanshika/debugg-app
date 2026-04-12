import { db } from './firebase-config.js';
import { collection, doc, setDoc, getDoc, serverTimestamp } from
  "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const problems = [

/* ══════════════════════════════════════════════
   PYTHON — 5 problems
══════════════════════════════════════════════ */
{
  id: 'py001',
  title: 'Sum of Array',
  difficulty: 'Easy',
  language: 'Python',
  errorType: 'Logic Error',
  tags: ['array', 'loop'],
  description: `A function that should return the sum of all integers in a list. It runs without crashing but always returns the wrong answer. Find and fix the logic error.`,
  buggyCode: `import sys

def sum_array(nums):
    total = 0
    for i in range(len(nums)):
        total += nums[i - 1]  # something's off here
    return total

data = sys.stdin.read().split()
n = int(data[0])
nums = list(map(int, data[1:n+1]))
print(sum_array(nums))`,
  hint: 'When i=0, what does nums[i-1] actually access? Think about negative indexing in Python.',
  testCases: [
    { input: '5\n1 2 3 4 5', expectedOutput: '15' },
    { input: '3\n10 20 30', expectedOutput: '60' },
    { input: '1\n7', expectedOutput: '7' },
    { input: '4\n-1 2 -3 4', expectedOutput: '2' },
  ],
  authorName: 'Debugg', authorId: 'system', solvedCount: 0, approved: true
},
{
  id: 'py002',
  title: 'Factorial Recursion Crash',
  difficulty: 'Easy',
  language: 'Python',
  errorType: 'Runtime Error (RecursionError)',
  tags: ['recursion', 'runtime error'],
  description: `This recursive function should compute n! (factorial). It crashes with a RecursionError every time. Fix it so it terminates correctly.`,
  buggyCode: `import sys

def factorial(n):
    if n == 0:
        return 1
    return n * factorial(n)   # will never stop

n = int(sys.stdin.read().strip())
print(factorial(n))`,
  hint: 'Look at the recursive call — what argument is being passed? It should be getting closer to the base case.',
  testCases: [
    { input: '5', expectedOutput: '120' },
    { input: '0', expectedOutput: '1' },
    { input: '1', expectedOutput: '1' },
    { input: '6', expectedOutput: '720' },
  ],
  authorName: 'Debugg', authorId: 'system', solvedCount: 0, approved: true
},
{
  id: 'py003',
  title: 'Binary Search Never Finds',
  difficulty: 'Medium',
  language: 'Python',
  errorType: 'Logic Error',
  tags: ['binary search', 'pointers'],
  description: `Binary search implementation that always returns -1 regardless of input. The pointer update logic is swapped. Fix it.`,
  buggyCode: `import sys

def binary_search(arr, target):
    low, high = 0, len(arr) - 1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            high = mid - 1   # wrong direction
        else:
            low = mid + 1    # wrong direction
    return -1

line = sys.stdin.read().split()
target = int(line[-1])
arr = list(map(int, line[:-1]))
print(binary_search(arr, target))`,
  hint: 'When target is GREATER than arr[mid], we need to search the RIGHT half. Which pointer controls that?',
  testCases: [
    { input: '1 3 5 7 9 11 7', expectedOutput: '3' },
    { input: '2 4 6 8 10 6', expectedOutput: '2' },
    { input: '1 1', expectedOutput: '0' },
    { input: '1 2 3 99', expectedOutput: '-1' },
  ],
  authorName: 'Debugg', authorId: 'system', solvedCount: 0, approved: true
},
{
  id: 'py004',
  title: 'Two Sum — Off by One',
  difficulty: 'Medium',
  language: 'Python',
  errorType: 'Logic Error',
  tags: ['hashmap', 'array'],
  description: `Should return indices [i, j] such that nums[i] + nums[j] == target. Returns wrong indices due to an off-by-one when storing into the hashmap.`,
  buggyCode: `import sys

def two_sum(nums, target):
    seen = {}
    for i in range(len(nums)):
        complement = target - nums[i]
        if complement in seen:
            return [seen[complement], i]
        seen[nums[i]] = i + 1   # storing wrong index
    return []

line = sys.stdin.read().split()
target = int(line[-1])
nums = list(map(int, line[:-1]))
print(two_sum(nums, target))`,
  hint: 'When you store `seen[nums[i]] = something`, what should `something` be? It\'s what gets returned as the first index.',
  testCases: [
    { input: '2 7 11 15 9', expectedOutput: '[0, 1]' },
    { input: '3 2 4 6', expectedOutput: '[1, 2]' },
    { input: '3 3 6', expectedOutput: '[0, 1]' },
  ],
  authorName: 'Debugg', authorId: 'system', solvedCount: 0, approved: true
},
{
  id: 'py005',
  title: 'TLE — Slow Fibonacci',
  difficulty: 'Hard',
  language: 'Python',
  errorType: 'Time Limit Exceeded (TLE)',
  tags: ['dp', 'memoization', 'tle'],
  description: `This naive recursive Fibonacci times out for large inputs (n > 35). Optimize it using memoization or dynamic programming so it runs in O(n).`,
  buggyCode: `import sys

def fib(n):
    # This is exponential O(2^n) — TLE for n > 35
    if n <= 1:
        return n
    return fib(n - 1) + fib(n - 2)

n = int(sys.stdin.read().strip())
print(fib(n))`,
  hint: 'Store previously computed values in a dictionary (memoization) or use a bottom-up loop instead of recursion.',
  testCases: [
    { input: '10', expectedOutput: '55' },
    { input: '0', expectedOutput: '0' },
    { input: '1', expectedOutput: '1' },
    { input: '40', expectedOutput: '102334155' },
  ],
  authorName: 'Debugg', authorId: 'system', solvedCount: 0, approved: true
},

/* ══════════════════════════════════════════════
   JAVASCRIPT — 5 problems
══════════════════════════════════════════════ */
{
  id: 'js001',
  title: 'Reverse String — Wrong Output',
  difficulty: 'Easy',
  language: 'JavaScript',
  errorType: 'Logic Error',
  tags: ['string', 'loop'],
  description: `This function should reverse a string but produces garbage output. The loop bounds and direction are both wrong.`,
  buggyCode: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
const s = lines[0];

function reverseString(str) {
  let result = '';
  for (let i = 0; i <= str.length; i++) {  // two bugs here
    result += str[i];
  }
  return result;
}

console.log(reverseString(s));`,
  hint: 'You need to iterate from the LAST character down to index 0. Check both the starting index and the direction.',
  testCases: [
    { input: 'hello', expectedOutput: 'olleh' },
    { input: 'abcd', expectedOutput: 'dcba' },
    { input: 'a', expectedOutput: 'a' },
    { input: 'racecar', expectedOutput: 'racecar' },
  ],
  authorName: 'Debugg', authorId: 'system', solvedCount: 0, approved: true
},
{
  id: 'js002',
  title: 'Palindrome Always True',
  difficulty: 'Easy',
  language: 'JavaScript',
  errorType: 'Logic Error',
  tags: ['string', 'two pointers'],
  description: `isPalindrome() returns true for every input — even "hello". The early-return on mismatch is missing. Fix it.`,
  buggyCode: `const s = require('fs').readFileSync('/dev/stdin','utf8').trim();

function isPalindrome(str) {
  let l = 0, r = str.length - 1;
  while (l < r) {
    if (str[l] !== str[r]) {
      l++;   // should return false here, not continue
    }
    l++;
    r--;
  }
  return true;
}

console.log(String(isPalindrome(s)));`,
  hint: 'When characters at l and r don\'t match, the function should immediately return false, not just increment l.',
  testCases: [
    { input: 'racecar', expectedOutput: 'true' },
    { input: 'hello', expectedOutput: 'false' },
    { input: 'a', expectedOutput: 'true' },
    { input: 'abba', expectedOutput: 'true' },
  ],
  authorName: 'Debugg', authorId: 'system', solvedCount: 0, approved: true
},
{
  id: 'js003',
  title: 'Bubble Sort — One Pass Only',
  difficulty: 'Medium',
  language: 'JavaScript',
  errorType: 'Logic Error',
  tags: ['sorting', 'loop'],
  description: `Bubble sort only does a single pass instead of n-1 passes. Arrays with more than 2 elements come out unsorted. Add the missing outer loop.`,
  buggyCode: `const line = require('fs').readFileSync('/dev/stdin','utf8').trim();
const arr = line.split(' ').map(Number);

function bubbleSort(a) {
  const n = a.length;
  // Missing outer loop — only one pass happens
  for (let j = 0; j < n - 1; j++) {
    if (a[j] > a[j + 1]) {
      [a[j], a[j+1]] = [a[j+1], a[j]];
    }
  }
  return a;
}

console.log(bubbleSort(arr).join(' '));`,
  hint: 'Bubble sort needs n-1 passes total. The current inner loop is correct — just wrap it in an outer loop that runs n-1 times.',
  testCases: [
    { input: '64 34 25 12 22 11 90', expectedOutput: '11 12 22 25 34 64 90' },
    { input: '5 4 3 2 1', expectedOutput: '1 2 3 4 5' },
    { input: '1', expectedOutput: '1' },
    { input: '3 1 2', expectedOutput: '1 2 3' },
  ],
  authorName: 'Debugg', authorId: 'system', solvedCount: 0, approved: true
},
{
  id: 'js004',
  title: 'Async Callback Hell',
  difficulty: 'Medium',
  language: 'JavaScript',
  errorType: 'Logic Error (async)',
  tags: ['async', 'promises'],
  description: `This code should print numbers 1 to 3 in order with 0ms delays but prints them out of order because setTimeout callbacks aren't chained. Fix it using Promises or async/await so output is always 1 2 3.`,
  buggyCode: `// Should print: 1 2 3 (one per line, in order)
function printInOrder() {
  setTimeout(() => console.log(1), 300);
  setTimeout(() => console.log(2), 200);
  setTimeout(() => console.log(3), 100);
}

printInOrder();`,
  hint: 'Use async/await with a helper sleep function, or chain .then() calls on promises so each number waits for the previous one.',
  testCases: [
    { input: '', expectedOutput: '1\n2\n3' },
  ],
  authorName: 'Debugg', authorId: 'system', solvedCount: 0, approved: true
},
{
  id: 'js005',
  title: 'Memory Leak — TLE Loop',
  difficulty: 'Hard',
  language: 'JavaScript',
  errorType: 'TLE / Logic Error',
  tags: ['optimization', 'string', 'tle'],
  description: `This function counts how many strings in an array are anagrams of each other by checking every pair. It's O(n²×L) and times out for large inputs. Optimize it to O(n×L) using a frequency map approach.`,
  buggyCode: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
const words = lines[0].split(' ');

function countAnagramPairs(arr) {
  let count = 0;
  // O(n^2 * L) — TLE for large n
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      const a = arr[i].split('').sort().join('');
      const b = arr[j].split('').sort().join('');
      if (a === b) count++;
    }
  }
  return count;
}

console.log(countAnagramPairs(words));`,
  hint: 'Sort each word once and use it as a hashmap key. Count how many words map to each key. If k words share a key, they form k*(k-1)/2 pairs.',
  testCases: [
    { input: 'eat tea tan ate nat bat', expectedOutput: '4' },
    { input: 'abc cba bca xyz', expectedOutput: '3' },
    { input: 'hello world', expectedOutput: '0' },
  ],
  authorName: 'Debugg', authorId: 'system', solvedCount: 0, approved: true
},

/* ══════════════════════════════════════════════
   JAVA — 5 problems
══════════════════════════════════════════════ */
{
  id: 'java001',
  title: 'Find Maximum — Wrong Init',
  difficulty: 'Easy',
  language: 'Java',
  errorType: 'Logic Error',
  tags: ['array', 'logic'],
  description: `findMax() initialises max to 0, which breaks for all-negative arrays. Fix the initialisation.`,
  buggyCode: `import java.util.Scanner;
public class Main {
    public static int findMax(int[] arr) {
        int max = 0;  // wrong initial value
        for (int num : arr) {
            if (num > max) max = num;
        }
        return max;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) arr[i] = sc.nextInt();
        System.out.println(findMax(arr));
    }
}`,
  hint: 'What is Integer.MIN_VALUE? Or simply initialise max to arr[0].',
  testCases: [
    { input: '6\n3 1 4 1 5 9', expectedOutput: '9' },
    { input: '3\n-5 -3 -1', expectedOutput: '-1' },
    { input: '1\n0', expectedOutput: '0' },
    { input: '4\n7 2 8 1', expectedOutput: '8' },
  ],
  authorName: 'Debugg', authorId: 'system', solvedCount: 0, approved: true
},
{
  id: 'java002',
  title: 'NullPointerException in Loop',
  difficulty: 'Easy',
  language: 'Java',
  errorType: 'Runtime Error (NullPointerException)',
  tags: ['arrays', 'null', 'runtime error'],
  description: `This code sums an int array but throws NullPointerException at runtime. The array is never initialised before elements are assigned. Fix it.`,
  buggyCode: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] arr;              // declared but NOT initialised — NPE!
        for (int i = 0; i < n; i++) arr[i] = sc.nextInt();
        int sum = 0;
        for (int x : arr) sum += x;
        System.out.println(sum);
    }
}`,
  hint: 'A variable declared as `int[] arr;` is null. You need `int[] arr = new int[n];` to allocate memory.',
  testCases: [
    { input: '5\n1 2 3 4 5', expectedOutput: '15' },
    { input: '3\n10 -5 3', expectedOutput: '8' },
    { input: '1\n42', expectedOutput: '42' },
  ],
  authorName: 'Debugg', authorId: 'system', solvedCount: 0, approved: true
},
{
  id: 'java003',
  title: 'Integer Overflow',
  difficulty: 'Medium',
  language: 'Java',
  errorType: 'Logic Error (Integer Overflow)',
  tags: ['math', 'overflow'],
  description: `Computes the sum of all integers from 1 to n. Works for small n but silently overflows for n > 50000 because it uses int. Fix it to handle n up to 10^6 correctly.`,
  buggyCode: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int sum = 0;           // int overflows for large n
        for (int i = 1; i <= n; i++) {
            sum += i;
        }
        System.out.println(sum);
    }
}`,
  hint: 'int max value is ~2.1 billion. For n=10^6, sum = 5×10^11 which overflows. Use `long` instead of `int`.',
  testCases: [
    { input: '10', expectedOutput: '55' },
    { input: '100', expectedOutput: '5050' },
    { input: '1000000', expectedOutput: '500000500000' },
    { input: '1', expectedOutput: '1' },
  ],
  authorName: 'Debugg', authorId: 'system', solvedCount: 0, approved: true
},
{
  id: 'java004',
  title: 'Stack Overflow — Deep Recursion',
  difficulty: 'Medium',
  language: 'Java',
  errorType: 'Runtime Error (StackOverflowError)',
  tags: ['recursion', 'dp', 'runtime error'],
  description: `Counts the number of ways to climb n stairs (1 or 2 steps at a time) using naive recursion. Throws StackOverflowError for n > 20. Fix it using an iterative DP approach.`,
  buggyCode: `import java.util.Scanner;
public class Main {
    // Exponential — crashes for large n
    public static long climbStairs(int n) {
        if (n <= 1) return 1;
        return climbStairs(n - 1) + climbStairs(n - 2);
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println(climbStairs(n));
    }
}`,
  hint: 'Use a loop with two variables (like Fibonacci): dp[i] = dp[i-1] + dp[i-2]. No recursion needed.',
  testCases: [
    { input: '2', expectedOutput: '2' },
    { input: '3', expectedOutput: '3' },
    { input: '10', expectedOutput: '89' },
    { input: '45', expectedOutput: '1836311903' },
  ],
  authorName: 'Debugg', authorId: 'system', solvedCount: 0, approved: true
},
{
  id: 'java005',
  title: 'TLE — Duplicate Detection',
  difficulty: 'Hard',
  language: 'Java',
  errorType: 'TLE',
  tags: ['hashset', 'optimization', 'tle'],
  description: `Checks if an array contains any duplicate values. The O(n²) nested loop TLEs for large arrays. Rewrite it using a HashSet for O(n) time.`,
  buggyCode: `import java.util.Scanner;
public class Main {
    public static boolean hasDuplicate(int[] arr) {
        // O(n^2) — TLE for large input
        for (int i = 0; i < arr.length; i++)
            for (int j = i + 1; j < arr.length; j++)
                if (arr[i] == arr[j]) return true;
        return false;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) arr[i] = sc.nextInt();
        System.out.println(hasDuplicate(arr));
    }
}`,
  hint: 'Import java.util.HashSet. As you iterate, add each element to a set. If add() returns false, it\'s already there — duplicate found!',
  testCases: [
    { input: '5\n1 2 3 4 5', expectedOutput: 'false' },
    { input: '5\n1 2 3 1 5', expectedOutput: 'true' },
    { input: '1\n99', expectedOutput: 'false' },
    { input: '3\n7 7 7', expectedOutput: 'true' },
  ],
  authorName: 'Debugg', authorId: 'system', solvedCount: 0, approved: true
},

/* ══════════════════════════════════════════════
   C++ — 5 problems
══════════════════════════════════════════════ */
{
  id: 'cpp001',
  title: 'Array Out of Bounds',
  difficulty: 'Easy',
  language: 'C++',
  errorType: 'Runtime Error (Segfault / Buffer Overflow)',
  tags: ['array', 'bounds', 'runtime error'],
  description: `Reads n numbers and prints their sum. Crashes with a segfault because the array is declared with size 5 but the loop writes 10 elements. Fix the array size.`,
  buggyCode: `#include <iostream>
using namespace std;
int main() {
    int n;
    cin >> n;
    int arr[5];      // size 5 but we might write more
    for (int i = 0; i < n; i++) cin >> arr[i];  // out-of-bounds for n > 5
    long long sum = 0;
    for (int i = 0; i < n; i++) sum += arr[i];
    cout << sum << endl;
    return 0;
}`,
  hint: 'Either declare `int arr[1000];` for a safe max, or use `int arr[n];` (VLA), or better yet use `vector<int> arr(n);`.',
  testCases: [
    { input: '5\n1 2 3 4 5', expectedOutput: '15' },
    { input: '8\n1 2 3 4 5 6 7 8', expectedOutput: '36' },
    { input: '1\n42', expectedOutput: '42' },
  ],
  authorName: 'Debugg', authorId: 'system', solvedCount: 0, approved: true
},
{
  id: 'cpp002',
  title: 'Infinite Loop — Missing Increment',
  difficulty: 'Easy',
  language: 'C++',
  errorType: 'Logic Error (Infinite Loop)',
  tags: ['loop', 'infinite loop'],
  description: `Prints numbers 1 to n but hangs forever because the loop variable is never incremented. Fix it.`,
  buggyCode: `#include <iostream>
using namespace std;
int main() {
    int n;
    cin >> n;
    int i = 1;
    while (i <= n) {
        cout << i << " ";
        // i is never updated — infinite loop!
    }
    cout << endl;
    return 0;
}`,
  hint: 'Inside the while loop, add `i++;` so the variable eventually reaches n+1 and the condition becomes false.',
  testCases: [
    { input: '5', expectedOutput: '1 2 3 4 5 ' },
    { input: '1', expectedOutput: '1 ' },
    { input: '3', expectedOutput: '1 2 3 ' },
  ],
  authorName: 'Debugg', authorId: 'system', solvedCount: 0, approved: true
},
{
  id: 'cpp003',
  title: 'Integer Division Truncation',
  difficulty: 'Medium',
  language: 'C++',
  errorType: 'Logic Error (Type Error)',
  tags: ['math', 'float', 'division'],
  description: `Computes the average of n integers. Always prints a whole number (floor) instead of the correct decimal average because both operands are ints. Fix the division to produce a float result.`,
  buggyCode: `#include <iostream>
using namespace std;
int main() {
    int n;
    cin >> n;
    long long sum = 0;
    for (int i = 0; i < n; i++) {
        int x; cin >> x;
        sum += x;
    }
    // integer division loses decimal part
    cout << fixed;
    cout.precision(2);
    cout << sum / n << endl;   // both sum and n are integers
    return 0;
}`,
  hint: 'Cast to double before dividing: `(double)sum / n` or `sum * 1.0 / n`.',
  testCases: [
    { input: '4\n1 2 3 4', expectedOutput: '2.50' },
    { input: '3\n1 1 2', expectedOutput: '1.33' },
    { input: '2\n5 5', expectedOutput: '5.00' },
    { input: '5\n1 2 3 4 5', expectedOutput: '3.00' },
  ],
  authorName: 'Debugg', authorId: 'system', solvedCount: 0, approved: true
},
{
  id: 'cpp004',
  title: 'Use After Free',
  difficulty: 'Hard',
  language: 'C++',
  errorType: 'Runtime Error (Use After Free / Undefined Behaviour)',
  tags: ['pointers', 'memory', 'runtime error'],
  description: `Allocates an array with new[], deletes it, then reads from the deleted memory — undefined behaviour that often causes crashes or garbage output. Fix it by reading BEFORE deleting.`,
  buggyCode: `#include <iostream>
using namespace std;
int main() {
    int n;
    cin >> n;
    int* arr = new int[n];
    for (int i = 0; i < n; i++) cin >> arr[i];

    delete[] arr;    // memory freed here

    long long sum = 0;
    for (int i = 0; i < n; i++)
        sum += arr[i];   // reading freed memory — UB!

    cout << sum << endl;
    return 0;
}`,
  hint: 'Compute the sum BEFORE calling `delete[] arr;`. Move the second loop up.',
  testCases: [
    { input: '4\n1 2 3 4', expectedOutput: '10' },
    { input: '3\n5 5 5', expectedOutput: '15' },
    { input: '1\n99', expectedOutput: '99' },
  ],
  authorName: 'Debugg', authorId: 'system', solvedCount: 0, approved: true
},
{
  id: 'cpp005',
  title: 'TLE — Naive String Search',
  difficulty: 'Hard',
  language: 'C++',
  errorType: 'TLE',
  tags: ['string', 'kmp', 'tle', 'optimization'],
  description: `Counts occurrences of pattern p in text t. The O(n×m) naive approach TLEs for long strings. Fix it — a clean O(n+m) solution using string::find in a loop is acceptable, or implement KMP.`,
  buggyCode: `#include <iostream>
#include <string>
using namespace std;
int main() {
    string text, pattern;
    cin >> text >> pattern;
    int count = 0;
    int n = text.size(), m = pattern.size();
    // O(n*m) with expensive substr comparison
    for (int i = 0; i <= n - m; i++) {
        bool match = true;
        for (int j = 0; j < m; j++) {
            if (text[i+j] != pattern[j]) {
                match = false;
                // missing break — checks all chars even after mismatch
            }
        }
        if (match) count++;
    }
    cout << count << endl;
    return 0;
}`,
  hint: 'Add a `break` when match becomes false. For a full O(n+m) solution, use string::find() in a while loop with pos = text.find(pattern, pos+1).',
  testCases: [
    { input: 'aabaab aa', expectedOutput: '3' },
    { input: 'abcabcabc abc', expectedOutput: '3' },
    { input: 'hello world', expectedOutput: '0' },
    { input: 'aaaaaa aa', expectedOutput: '5' },
  ],
  authorName: 'Debugg', authorId: 'system', solvedCount: 0, approved: true
},

/* ══════════════════════════════════════════════
   C — 5 problems
══════════════════════════════════════════════ */
{
  id: 'c001',
  title: 'Off-by-One in printf Loop',
  difficulty: 'Easy',
  language: 'C',
  errorType: 'Logic Error (Off-by-One)',
  tags: ['loop', 'off-by-one'],
  description: `Should print numbers 1 to n but prints 0 to n-1 instead. Classic off-by-one in the loop initialisation.`,
  buggyCode: `#include <stdio.h>
int main() {
    int n;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) {   // starts at 0, should start at 1
        printf("%d ", i);
    }
    printf("\\n");
    return 0;
}`,
  hint: 'Change `i = 0` to `i = 1` and `i < n` to `i <= n`. Or keep i=0 and print `i+1`.',
  testCases: [
    { input: '5', expectedOutput: '1 2 3 4 5 \n' },
    { input: '1', expectedOutput: '1 \n' },
    { input: '3', expectedOutput: '1 2 3 \n' },
  ],
  authorName: 'Debugg', authorId: 'system', solvedCount: 0, approved: true
},
{
  id: 'c002',
  title: 'Scanf Missing Address-Of',
  difficulty: 'Easy',
  language: 'C',
  errorType: 'Compile / Runtime Error',
  tags: ['scanf', 'pointers', 'runtime error'],
  description: `This program should read an integer and print its square, but it either crashes or gives garbage output. The scanf call is missing the & operator. Fix it.`,
  buggyCode: `#include <stdio.h>
int main() {
    int n;
    scanf("%d", n);    // missing & — writes to random address
    printf("%d\\n", n * n);
    return 0;
}`,
  hint: 'scanf writes a value to a memory address. Without &, you\'re passing the value of n (uninitialised garbage) as an address. Use `scanf("%d", &n);`.',
  testCases: [
    { input: '5', expectedOutput: '25' },
    { input: '0', expectedOutput: '0' },
    { input: '12', expectedOutput: '144' },
    { input: '-3', expectedOutput: '9' },
  ],
  authorName: 'Debugg', authorId: 'system', solvedCount: 0, approved: true
},
{
  id: 'c003',
  title: 'String Compare With ==',
  difficulty: 'Medium',
  language: 'C',
  errorType: 'Logic Error (Wrong Operator)',
  tags: ['string', 'strcmp', 'pointers'],
  description: `Checks if two strings are equal and prints "yes" or "no". Using == compares pointer addresses, not content — so it always prints "no" even for identical strings. Fix it using strcmp.`,
  buggyCode: `#include <stdio.h>
int main() {
    char a[100], b[100];
    scanf("%s %s", a, b);
    if (a == b) {       // compares addresses, not content!
        printf("yes\\n");
    } else {
        printf("no\\n");
    }
    return 0;
}`,
  hint: 'In C, == on arrays compares the pointers (addresses) not the characters. Use `strcmp(a, b) == 0` to compare string content.',
  testCases: [
    { input: 'hello hello', expectedOutput: 'yes' },
    { input: 'hello world', expectedOutput: 'no' },
    { input: 'abc abc', expectedOutput: 'yes' },
    { input: 'a b', expectedOutput: 'no' },
  ],
  authorName: 'Debugg', authorId: 'system', solvedCount: 0, approved: true
},
{
  id: 'c004',
  title: 'Dangling Pointer Return',
  difficulty: 'Hard',
  language: 'C',
  errorType: 'Runtime Error (Dangling Pointer / UB)',
  tags: ['pointers', 'memory', 'stack'],
  description: `getResult() returns a pointer to a local variable. Once the function returns, that stack memory is freed — so the pointer is dangling and reading it is undefined behaviour. Fix it by using a static variable, a global, or malloc.`,
  buggyCode: `#include <stdio.h>
int* getResult(int a, int b) {
    int result = a + b;    // local variable — lives on stack
    return &result;        // returning address of stack variable — UB!
}
int main() {
    int x, y;
    scanf("%d %d", &x, &y);
    int* res = getResult(x, y);
    printf("%d\\n", *res);   // reading freed stack memory
    return 0;
}`,
  hint: 'Declare `static int result = a + b;` inside the function, or use `int* result = malloc(sizeof(int));` and remember to free it after use.',
  testCases: [
    { input: '3 4', expectedOutput: '7' },
    { input: '0 0', expectedOutput: '0' },
    { input: '-5 10', expectedOutput: '5' },
    { input: '100 200', expectedOutput: '300' },
  ],
  authorName: 'Debugg', authorId: 'system', solvedCount: 0, approved: true
},
{
  id: 'c005',
  title: 'TLE — Nested Sum Loop',
  difficulty: 'Hard',
  language: 'C',
  errorType: 'TLE',
  tags: ['math', 'prefix sum', 'tle', 'optimization'],
  description: `For each of q queries [l, r], compute the sum of arr[l..r]. The O(q×n) naive approach TLEs for large inputs. Fix it using a prefix sum array so each query is O(1).`,
  buggyCode: `#include <stdio.h>
int arr[100005];
int main() {
    int n, q;
    scanf("%d %d", &n, &q);
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    while (q--) {
        int l, r;
        scanf("%d %d", &l, &r);
        long long sum = 0;
        for (int i = l; i <= r; i++) sum += arr[i];  // O(n) per query — TLE
        printf("%lld\\n", sum);
    }
    return 0;
}`,
  hint: 'Build a prefix[] array where prefix[i] = arr[0]+...+arr[i]. Then sum(l,r) = prefix[r] - (l>0 ? prefix[l-1] : 0) — computed in O(1).',
  testCases: [
    { input: '5 3\n1 2 3 4 5\n0 2\n1 3\n0 4', expectedOutput: '6\n9\n15' },
    { input: '3 2\n10 20 30\n0 0\n0 2', expectedOutput: '10\n60' },
    { input: '1 1\n7\n0 0', expectedOutput: '7' },
  ],
  authorName: 'Debugg', authorId: 'system', solvedCount: 0, approved: true
},

]; // end problems array

// ── Seed runner ──
const statusEl = document.getElementById('status');
let seeded = 0, skipped = 0, failed = 0;

function log(msg, color) {
  if (statusEl) {
    const p = document.createElement('p');
    p.style.color = color || '#e8e8f0';
    p.textContent = msg;
    statusEl.appendChild(p);
    statusEl.scrollTop = statusEl.scrollHeight;
  }
  console.log(msg);
}

for (const p of problems) {
  try {
    const ref = doc(db, 'problems', p.id);
    const existing = await getDoc(ref);
    if (!existing.exists()) {
      await setDoc(ref, { ...p, createdAt: serverTimestamp() });
      seeded++;
      log(`✓ Seeded [${p.difficulty}] ${p.language} — ${p.title}`, '#34d399');
    } else {
      skipped++;
      log(`— Already exists: ${p.title}`, '#5c5c7a');
    }
  } catch(e) {
    failed++;
    log(`✗ FAILED: ${p.title} — ${e.message}`, '#f87171');
  }
}

log(``, '');
log(`═══════════════════════════════════`, '#8b5cf6');
log(`✅ Done! ${seeded} seeded · ${skipped} skipped · ${failed} failed`, seeded===problems.length||failed===0?'#00f5ff':'#fbbf24');
log(`You can now close this tab.`, '#5c5c7a');
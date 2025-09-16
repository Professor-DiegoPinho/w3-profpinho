---
title: "JavaScript Variables"
description: "Learn how to use variables in JavaScript"
order: 2
---

# JavaScript Variables

Variables are containers for storing data values. In JavaScript, you can create variables using `let`, `const`, or `var`.

## Declaring Variables

### Using let
```javascript
let name = "John";
let age = 25;
let isStudent = true;
```

### Using const
```javascript
const PI = 3.14159;
const siteName = "Learning Hub";
```

### Using var (older syntax)
```javascript
var message = "Hello World";
```

## Variable Types

JavaScript has several data types:

### Primitive Types
- **String**: Text data
- **Number**: Numeric data
- **Boolean**: true or false
- **Undefined**: Variable declared but not assigned
- **Null**: Intentionally empty value

### Example
```javascript
let userName = "Alice";        // String
let userAge = 30;             // Number
let isActive = true;          // Boolean
let data;                     // Undefined
let result = null;            // Null

console.log(typeof userName); // "string"
console.log(typeof userAge);  // "number"
console.log(typeof isActive); // "boolean"
```

## Variable Rules

1. Names can contain letters, digits, underscores, and dollar signs
2. Names must begin with a letter, underscore (_), or dollar sign ($)
3. Names are case sensitive
4. Reserved words cannot be used as names

### Good Examples
```javascript
let firstName = "John";
let _private = "secret";
let $element = "selector";
let user123 = "user";
```

### Bad Examples
```javascript
// These will cause errors:
// let 123user = "invalid";
// let first-name = "invalid";
// let class = "reserved word";
```
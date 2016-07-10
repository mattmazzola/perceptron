# perceptron
[![Build Status](https://travis-ci.org/mattmazzola/perceptron.svg?branch=master)](https://travis-ci.org/mattmazzola/perceptron)

Perceptron library written in TypeScript

## Installation
```
npm install --save @mattmazzola/perceptron
```

## Usage
```javascript
const and = new Perceptron(0.5, 0.1);

and.train([
  { vector: [0,0], output: false },
  { vector: [1,0], output: false },
  { vector: [0,1], output: false },
  { vector: [1,1], output: true }
]);

and.perceive([0,1]); // false
```

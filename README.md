# perceptron
[![Build Status](https://img.shields.io/travis/mattmazzola/perceptron/master.svg)](https://travis-ci.org/mattmazzola/perceptron)
[![NPM Version](https://img.shields.io/npm/v/@mattmazzola/perceptron.svg)](https://www.npmjs.com/package/@mattmazzola/perceptron)
[![NPM Total Downloads](https://img.shields.io/npm/dt/@mattmazzola/perceptron.svg)](https://www.npmjs.com/package/@mattmazzola/perceptron)
[![NPM Monthly Downloads](https://img.shields.io/npm/dm/@mattmazzola/perceptron.svg)](https://www.npmjs.com/package/@mattmazzola/perceptron)

Perceptron library written in TypeScript

## Installation
```
npm install --save @mattmazzola/perceptron
```

## Usage
```javascript
const and = new Perceptron(0.5, 0.1);

const learningData = and.train([
  { vector: [0,0], output: false },
  { vector: [1,0], output: false },
  { vector: [0,1], output: false },
  { vector: [1,1], output: true }
]);

and.perceive([0,1]); // false
```

## Learning Data

The `Perceptron.train` function returns the learning data array which contains data useful for debugging how the perceptron trained itelf. Each element contains the input vector, weights, and shows how they changed during the train period.

Example
```javascript
const learningData = and.train([
  { vector: [0,0], output: false },
  { vector: [1,0], output: false },
  { vector: [0,1], output: false },
  { vector: [1,1], output: true }
]);

learningData
  .forEach(({vector, weights, dotProduct, result, threshold, output}) => {
    console.log(`Vector: ${vector}, Weights: ${weights}, Output: ${dotProduct} - ${result}, Expected: ${threshold} - ${output}`);
  });
```

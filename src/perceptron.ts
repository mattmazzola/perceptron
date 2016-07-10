import * as util from './utilities';

export interface ITrainingData {
  vector: number[];
  output: boolean;
}

export class Perceptron {
  threshold: number;
  learningRate: number;
  weights: number[];

  constructor(threshold: number = 0.5, learningRate: number = 0.1) {
    this.threshold = threshold;
    this.learningRate = learningRate;
  }
  
  train(trainingSet: ITrainingData[], threshold: number = this.threshold, learningRate: number = this.learningRate) {
    if (trainingSet.length === 0) {
      throw new Error(`trainingSet data must be non-empty array. You provided: ${trainingSet}`);
    }

    // Create new weights vector matching length of training data and set values to 0
    const weights = Array.apply(null, new Array(trainingSet[0].vector.length)).map(() => 0);

    while(true) {
      let errorCount = 0;
      trainingSet
        .forEach(({ vector, output }) => {
          const dotProduct = util.dotProduct(vector, weights);
          const result = dotProduct >= threshold;
          const error = (output ? 1 : 0) - (result ? 1 : 0);
          console.log(`Vector: ${vector}, Weights: ${weights}, Output: ${dotProduct} - ${result}, Expected: ${threshold} - ${output}`);

          if (error !== 0) {
            errorCount += 1;
            console.log('adjust weights');
            vector
              .forEach((x, i) => {
                weights[i] += learningRate * error * x;
              });
          }
        });

      if (errorCount === 0) {
        break;
      }
    }

    this.weights = weights;
  }

  perceive(vector: number[], weights = this.weights, threshold = this.threshold): boolean {
    if(vector.length !== weights.length) {
      throw new Error(`The number of dimensions of the input vector must match the number of weights. You passed vector length: ${vector.length}, weights.length: ${weights.length}`);
    }

    return util.dotProduct(vector, weights) >= threshold;
  }
}
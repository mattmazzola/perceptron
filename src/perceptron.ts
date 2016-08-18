import * as util from './utilities';

export interface ITrainingData {
  vector: number[];
  output: boolean;
}

export interface ILearningData extends ITrainingData {
  weights: number[];
  weightChanges: number[];
  dotProduct: number;
  threshold: number;
  result: boolean;
  weightsChanged: boolean;
}

export class Perceptron {
  threshold: number;
  learningRate: number = 0.1;
  weights: number[];
  
  train(trainingSet: ITrainingData[], learningRate: number = this.learningRate): ILearningData[] {
    if (trainingSet.length === 0) {
      throw new Error(`trainingSet data must be non-empty array. You provided: ${trainingSet}`);
    }

    // Create new weights vector matching length of training data and set values to 0
    const weights: number[] = Array.apply(null, new Array(trainingSet[0].vector.length + 1)).map(() => 0);
    const learningSet: ILearningData[] = [];
    const theta = 0;
    const maxIterations = 2000;
    let i: number;

    for(i = 0; i < maxIterations; i++) {
      let errorCount = 0;
      trainingSet
        .forEach(({ vector, output }) => {
          const trainingVector = vector.concat([1]);
          const dotProduct = util.dotProduct(trainingVector, weights);
          const result = dotProduct >= theta;
          const error = (output ? 1 : 0) - (result ? 1 : 0);

          const learningData: ILearningData = {
            weights: weights.slice(0),
            vector: vector.slice(0),
            dotProduct: dotProduct,
            result,
            threshold: -weights[2],
            output,
            weightChanges: [],
            weightsChanged: false
          };

          learningSet.push(learningData);

          if (error !== 0) {
            errorCount += 1;
            learningData.weightsChanged = true;
            trainingVector
              .forEach((x, i) => {
                const change = learningRate * error * x;
                weights[i] += change;
                learningData.weightChanges[i] = change;
              });
          }
        });

      if (errorCount === 0) {
        break;
      }
    }

    this.weights = weights.slice(0,2);
    this.threshold = -weights[2];

    if (i === maxIterations) {
      throw new Error('Max Iterations reached. The training loop was terminated to prevent infinite loop');
    }

    return learningSet;
  }

  perceive(vector: number[], weights = this.weights, threshold = this.threshold): boolean {
    if(vector.length !== weights.length) {
      throw new Error(`The number of dimensions of the input vector must match the number of weights. You passed vector length: ${vector.length}, weights.length: ${weights.length}`);
    }

    return util.dotProduct(vector, weights) >= threshold;
  }
}
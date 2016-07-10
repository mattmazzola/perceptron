import * as perceptron from '../src/perceptron';

describe('perceptron', function () {
  describe('AND', function () {
    let trainingData: perceptron.ITrainingData[] = [
      {
        vector: [0,0],
        output: false
      },
      {
        vector: [1,0],
        output: false
      },
      {
        vector: [0,1],
        output: false
      },
      {
        vector: [1,1],
        output: true
      }
    ];
    let and: perceptron.Perceptron;

    beforeAll(() => {
      and = new perceptron.Perceptron(1.5);
      and.train(trainingData);
    });

    it('should return false for [0,0]', function () {
      expect(and.perceive([0,0])).toEqual(false);
    });

    it('should return false for [1,0]', function () {
      expect(and.perceive([1,0])).toEqual(false);
    });

    it('should return false for [0,1]', function () {
      expect(and.perceive([0,1])).toEqual(false);
    });

    it('should return true for [1,1]', function () {
      expect(and.perceive([1,1])).toEqual(true);
    });
  });

  describe('OR', function () {
    let trainingData: perceptron.ITrainingData[] = [
      {
        vector: [0,0],
        output: false
      },
      {
        vector: [1,0],
        output: true
      },
      {
        vector: [0,1],
        output: true
      },
      {
        vector: [1,1],
        output: true
      }
    ];
    let and: perceptron.Perceptron;

    beforeAll(() => {
      and = new perceptron.Perceptron(0.5);
      and.train(trainingData);
    });

    it('should return false for [0,0]', function () {
      expect(and.perceive([0,0])).toEqual(false);
    });

    it('should return true for [1,0]', function () {
      expect(and.perceive([1,0])).toEqual(true);
    });

    it('should return true for [0,1]', function () {
      expect(and.perceive([0,1])).toEqual(true);
    });

    it('should return true for [1,1]', function () {
      expect(and.perceive([1,1])).toEqual(true);
    });
  });
});
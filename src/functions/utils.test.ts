import { getSumOfArray, getSumOfObject, getDataBase64, getPromise } from './utils';

describe('function getSumOfArray:', () => {
  let array: number[];

  beforeEach(() => {
    array = [1, 3, 4, -1];
  });

  test('should return sum of array elements:', () => {
    expect(getSumOfArray(array)).toBe(7);
  });

  test('should return non-falsy value', () => {
    expect(getSumOfArray(array)).not.toBeFalsy();
  });
});

describe('function getSumOfObject:', () => {
  let object: { [x: string]: number };

  beforeEach(() => {
    object = {
      item1: 1,
      item2: 2,
      item3: 3,
    };
  });

  test('should return sum of object values:', () => {
    expect(getSumOfObject(object)).toBe(6);
  });

  test('should return non-falsy value', () => {
    expect(getSumOfObject(object)).not.toBeFalsy();
  });
});

describe('function getDataBase64:', () => {
  test('should be function:', () => {
    expect(getDataBase64()).toBeInstanceOf(Function);
  });
});

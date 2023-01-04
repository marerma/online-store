import { sum } from './utils';

describe('function sum:', () => {
  test('a + b', () => {
    expect(sum(1, 1)).toBe(2);
  });
});

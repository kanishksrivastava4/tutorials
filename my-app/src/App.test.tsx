import { describe, test, expect } from 'vitest';
import { add, subtract, multiply, divide } from './App';

describe('Math functions', () => {
  test('add works correctly', (): void => {
    expect(add(2, 3)).toBe(5);
  });

  test('subtract works correctly', (): void => {
    expect(subtract(5, 3)).toBe(2);
  });

  test('multiply works correctly', (): void => {
    expect(multiply(4, 3)).toBe(12);
  });

  test('divide works correctly', (): void => {
    expect(divide(10, 2)).toBe(5);
  });

  test('divide by zero returns Error', (): void => {
    expect(divide(10, 0)).toBe('Error: Cannot divide by zero');
  });
});
import { KaratsubaStep } from '../types';

export function karatsubaAlgorithm(num1: number, num2: number): KaratsubaStep[] {
  const steps: KaratsubaStep[] = [];

  function karatsuba(x: number, y: number, level: number): number {
    steps.push({
      level,
      num1: x,
      num2: y,
      result: x * y,
      message: `Starting multiplication of ${x} and ${y}`
    });

    if (x < 10 || y < 10) {
      steps.push({
        level,
        num1: x,
        num2: y,
        result: x * y,
        message: `Base case: ${x} × ${y} = ${x * y}`
      });
      return x * y;
    }

    const n = Math.max(x.toString().length, y.toString().length);
    const m = Math.floor(n / 2);
    const pow = Math.pow(10, m);

    const high1 = Math.floor(x / pow);
    const low1 = x % pow;
    const high2 = Math.floor(y / pow);
    const low2 = y % pow;

    steps.push({
      level,
      num1: x,
      num2: y,
      high1,
      low1,
      high2,
      low2,
      result: 0,
      message: `Split numbers:\n${x} = ${high1} × 10^${m} + ${low1}\n${y} = ${high2} × 10^${m} + ${low2}`
    });

    const z0 = karatsuba(low1, low2, level + 1);
    const z1 = karatsuba(low1 + high1, low2 + high2, level + 1);
    const z2 = karatsuba(high1, high2, level + 1);

    const result = z2 * Math.pow(10, 2 * m) + (z1 - z2 - z0) * Math.pow(10, m) + z0;

    steps.push({
      level,
      num1: x,
      num2: y,
      high1,
      low1,
      high2,
      low2,
      z0,
      z1,
      z2,
      result,
      message: `Combining results:\nz0 = ${z0}\nz1 = ${z1}\nz2 = ${z2}\nResult = ${result}`
    });

    return result;
  }

  karatsuba(num1, num2, 0);
  return steps;
}
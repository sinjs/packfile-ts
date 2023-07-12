import type { MatcherFunction } from "expect";

declare global {
  namespace jest {
    interface AsymmetricMatchers {
      toContainInstanceOf(expected: any): void;
    }
    interface Matchers<R> {
      toContainInstanceOf(expected: any): R;
    }
  }
}

export const toContainInstanceOf: MatcherFunction<[expected: any]> = function (actual, expected) {
  if (typeof actual !== "object" || !(actual instanceof Array)) {
    throw new TypeError("Actual and inputted array must be an Array");
  }

  for (const value of actual) {
    if (!(value instanceof expected)) {
      return {
        pass: false,
        message: () =>
          `expected ${this.utils.printReceived(
            actual,
          )} to be instance of ${this.utils.printExpected(expected)}`,
      };
    }
  }

  return {
    pass: true,
    message: () =>
      `expected ${this.utils.printReceived(
        actual,
      )} not to be instance of ${this.utils.printExpected(expected)}`,
  };
};

expect.extend({ toContainInstanceOf });

import { counter } from './index';

test('Test incrementing counter', function () {
  const [getA, nextA] = counter(1);
  expect(getA()).toEqual(1); // 1
  nextA();
  expect(getA()).toEqual(2); // 2
  const [getB, nextB] = counter(10);
  nextB();
  expect(getA()).toEqual(2); // 2
  expect(getB()).toEqual(11); // 11
  nextA();
  expect(getA()).toEqual(3); // 3
  expect(getB()).toEqual(11); // 11
});

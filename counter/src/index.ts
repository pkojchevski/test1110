export function counter(n?: number): [() => {}, () => void] {
  let counter: number = n === undefined ? 0 : n;

  const get = (): number => {
    console.log(counter);
    return counter;
  };

  const next = (): void => {
    counter++;
  };

  return [get, next];
}

const [getA, nextA] = counter(-5);
getA(); // 1
nextA();
getA(); // 2
const [getB, nextB] = counter(10);
nextB();
getA(); // 2
getB(); // 11
nextA();
getA(); // 3
getB(); // 11

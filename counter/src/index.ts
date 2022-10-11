export function counter(n?: number) {
  let counter = n || 0;

  const get = (): number => {
    console.log(counter);
    return counter;
  };

  const next = () => {
    counter++;
  };

  return [get, next];
}

const [getA, nextA] = counter(1);
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

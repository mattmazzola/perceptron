export function zip<T>(xs: T[], ys: T[]) {
  const smallerArray = xs.length < ys.length ? xs : ys;

  return smallerArray
    .map((x, i) => [xs[i], ys[i]]);
}

export function dotProduct(xs: number[], ys: number[]) {
  return zip(xs, ys)
    .map(([x,y]) => x * y)
    .reduce((a, b) => a + b)
}
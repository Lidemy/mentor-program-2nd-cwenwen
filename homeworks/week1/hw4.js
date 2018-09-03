// hw4：印出因數
function printFactor(n) {
  let factor = [];
  for (let i = 1; i <= n; i++) {
    if (n % i == 0) {
      factor.push(i);
    }
  }
  return factor;
}
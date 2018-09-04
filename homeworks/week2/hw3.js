// hw3：判斷質數
function isPrime(n) {
  if (n == 1) return false;
  for (let i = 2; i < n; i++) { // 其實檢查到 n 的開根號 Math.squt(n) 即可
    if (n % i == 0) {
      return false;
    }
  }
  return true;
}

module.exports = isPrime
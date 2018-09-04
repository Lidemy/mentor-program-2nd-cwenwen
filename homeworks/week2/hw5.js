// hw5：大數加法
function add(a, b) {
  // 變成 array 後反轉，從個位數開始算
  const arrA = a.split('').reverse();
  const arrB = b.split('').reverse();
  // 補零，弄到長度一樣
  if (arrA.length != arrB.length) {
    if (arrA.length > arrB.length) {
      const i = arrB.length;
      arrB.length = arrA.length;
      arrB.fill(0, i);
    } else {
      const i = arrA.length;
      arrA.length = arrB.length;
      arrA.fill(0, i);
    }
  }
  // 計算
  let sum = [];
  let carry = 0;
  for (let i = 0; i < arrA.length; i++) {
    let x = Number(arrA[i]) + Number(arrB[i]) + carry;
    if (x > 9) {
      sum.push(x - 10);
      carry = 1;
    } else {
      sum.push(x);
      carry = 0;
    }
  }
  if (carry == 1) sum.push(1);
  return sum.reverse().join('');
}

module.exports = add;
// hw2：大小寫互換
function alphaSwap(str) {
  let arr = str.split("");
  for (let i = 0; i < arr.length; i++) {
    arr[i].charCodeAt() < 91 ? arr.splice(i, 1, arr[i].toLowerCase()) : arr.splice(i, 1, arr[i].toUpperCase());
  }
  return arr.join("");
}

module.exports = alphaSwap
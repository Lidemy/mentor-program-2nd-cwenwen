// hw3：反轉字串
function reverse(str) {
  const oldStr = str.split("");
  let newStr = [];
  for (let i = str.length - 1; i >= 0; i--) {
    newStr.push(oldStr[i]);
  }
  return newStr.join("");
}
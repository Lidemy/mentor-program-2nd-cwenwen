// hw4：判斷迴文
function isPalindromes(str) {
  return str.split('').reverse().join('') == str;
}

module.exports = isPalindromes
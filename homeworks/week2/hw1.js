// hw1：好多星星
function stars(n) {
  let s = [];
  for (let i = 1; i <= n; i++) {
    s.push("*".repeat(i));
  }
  return s;
}

module.exports = stars;
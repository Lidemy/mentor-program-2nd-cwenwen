// hw5：自己的函式自己寫

// join()
function join(str, concatStr = ",") {
  let joined = "";
  for (let i = 0; i < str.length; i++) {
    joined += str[i] + concatStr;
  }
  return (concatStr == "" ? joined : joined.substring(0, joined.length - 1))
}

// repeat()
function repeat(str, times) {
  let word = "";
  for (let i = 0; i < times; i++) {
    word += str;
  }
  return word;
}
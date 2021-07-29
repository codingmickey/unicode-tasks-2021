//jshint esversion:6

let n = prompt("Enter n ->");

let finalArray = [],
  finalCount = [];

function findElement(temp) {
  let tempLength = finalArray.length;
  let check = false;

  for (let j = 0; j <= tempLength; j++) {
    if (temp === finalArray[j]) {
      finalCount[j]++;
      check = true;
      break;
    }
  }
  if (!check) {
    finalArray.push(temp);
    finalCount.push(1);
  }
}

for (let i = 1; i <= n; i++) {
  let temp = prompt("Enter the word no. " + i);

  findElement(temp);
}

let finalAns = [finalArray, finalCount];
let sortedOccurrences = finalCount.sort();
sortedOccurrences.reverse();

finalAns.sort(function (a, b) {
  return sortedOccurrences.indexOf(a) - sortedOccurrences.indexOf(b);
});

let highestOccurrance = finalAns[1][0];
let leastOccurrance = finalAns[1][finalCount.length - 1];

let highestOccurranceArr = [];
let leastOccurranceArr = [];

console.log(finalAns, finalCount, finalArray);

finalAns[1].forEach(function (ans, index) {
  if (highestOccurrance === ans) {
    highestOccurranceArr.push(finalArray[index]);
  }
});

console.log("Most repeated word(s) = " + highestOccurranceArr);

finalAns[1].forEach(function (ans, index) {
  if (leastOccurrance === ans) {
    leastOccurranceArr.push(finalArray[index]);
  }
});

console.log("Least repeated word(s) = " + leastOccurranceArr);

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

let finalLength = finalCount.length;
console.log(finalLength);
console.log(finalCount);

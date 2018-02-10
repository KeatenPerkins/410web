'use strict';

module.exports = {
    evenOrOdd,
    wordsInReverse,
    countPositivesSumNegatives
};

function evenOrOdd(number) {

return ( number & 1 ) ? "Odd" : "Even";

/*if(number != null){
  number % 2 == 1;
  if (number = 0){
    return 'Even';
  }
  else{
    return 'Odd';
  }
}
*/
}

function wordsInReverse(string) {

  var str  = string;
  var arr = str.split(" ");
  arr.reverse();
  str = arr.join(" ");
  return str;

}

function countPositivesSumNegatives(numbers) {
  let count = 0;
  let sum = 0;
  numbers.forEach(num => {
      if (num > 0) {
          count++;
      } else {
          sum += num;
      }
  });
  return [ count, sum ];


}

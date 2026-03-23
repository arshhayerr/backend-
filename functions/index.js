const fs = require('fs');
const {
    average,
    minimum,
    factorial,
    isPrime,
    diffSquares,
    evenOdd
} = require('./maths');

let output1 = "";
output1 += "Average: " + average(10, 20, 30) + "\n";
output1 += "Minimum: " + minimum(10, 20, 5) + "\n";
output1 += "Factorial: " + factorial(5) + "\n";
output1 += "Prime: " + isPrime(17) + "\n";

fs.writeFileSync("result.txt", output1);

let output2 = "";
output2 += "Difference of squares: " + diffSquares(10, 5) + "\n";
output2 += "Even or Odd: " + evenOdd(11) + "\n";

fs.appendFileSync("result.txt", output2);

const data = fs.readFileSync("result.txt", "utf8");
console.log(data);

fs.writeFileSync("copy.txt", data);

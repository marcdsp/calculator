let currentNumber = [5]; //use document query string???
let previousNumber = [5];
let runningCalculation = [5];
let calculationStarted = true;
let previousResult = NaN;
let lastOperator = "+"; //might not need this

//this function is called when a key is pressed (DIV)  it first checks if the calculationStarted flag is set to true or false, if it is false it then checks if the key press is a number, decimal point, negative/positive button, clear populates the currentNumber variable and the runningCalculation variable which is then displayed in the runningCalculation id in the html element
//if (previousNumber == "") {console.log("gotit");
//}
//else console.log("dontgotit");

//this object takes 2 numbers and the operation and returns the result of the calculation. This object is called when there is a previous number, a current number a previous operation present and either the = key or an operator key has been pressed
var operators = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b
},
calculate = function (val1, val2, sign) {
    if (sign in operators) {
        return operators[sign](val1, val2);
    }
}
console.log(calculate(5,5,"+"));

// determines what happens when a number is pressed
function numberPressed(val) {
    if (calculationStarted === false) {
        runningCalculation.push(val);
        calculationStarted = true;
        currentNumber.push = val;
        document.getElementById("runningCalculation").innerHTML = runningCalculation.join('')
    }
}

// determines what happens when an operator is pressed
function operatorPressed(operator) {
    if (calculationStarted === false) {
        alert("No number to calculate");
}
    else if (previousNumber == ""){
        runningCalculation.push(operator);
        document.getElementById("runningCalculation").innerHTML = runningCalculation.join('')
    }
    else {
        runningCalculation.push(operator);
        document.getElementById("runningCalculation").innerHTML = runningCalculation.join('');
        document.getElementById("resultDisplay").innerHTML = calculate(Number(previousNumber.join('')), Number(currentNumber.join('')),operator);
    }

}


operatorPressed("+");


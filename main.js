let currentNumber = []; //use document query string???
let previousNumber = [];
let runningCalculation = [];
let calculationStarted = false;
let previousResult = NaN;
let lastOperator = null; //might not need this
let theKeyPad=document.querySelector('#keyPanel');

//listeners
theKeyPad.addEventListener('click', keyType, false)

//this function is called when a key is pressed (DIV)  it first checks if the calculationStarted flag is set to true or false, if it is false it then checks if the key press is a number, decimal point, negative/positive button, clear populates the currentNumber variable and the runningCalculation variable which is then displayed in the runningCalculation id in the html element
//if (previousNumber == "") {console.log("gotit");
//}
//else console.log("dontgotit");

//this object takes 2 numbers and the operation and returns the result of the calculation. This object is called when there is a previous number, a current number a previous operation present and either the = key or an operator key has been pressed
let operators = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '÷': (a, b) => a / b
},
calculate = function (val1, val2, sign) {
    if (sign in operators) {
        return operators[sign](val1, val2);
    }
}

// determines what happens when a number is pressed
function numberPressed(val) {
    if (val == ".") { 
        if (currentNumber.length == 0) {
        val = "0."
        runningCalculation.push(val);
        calculationStarted = true;
        currentNumber.push(val);
        document.getElementById("runningCalculation").innerHTML = runningCalculation.join('')
    }
    else {runningCalculation.push(val);
    calculationStarted = true;
    currentNumber.push(val);
    document.getElementById("runningCalculation").innerHTML = runningCalculation.join('')
}
    }
else {runningCalculation.push(val);
calculationStarted = true;
currentNumber.push(val);
document.getElementById("runningCalculation").innerHTML = runningCalculation.join('')
}
    }

// determines what happens when an operator is pressed
function operatorPressed(operator) {
    if (calculationStarted === false) {
        alert("No number to calculate");
}
// this block determines what happens when it is the first operator that has been pressed
    else if (previousNumber.length == 0 && lastOperator == null) {
        document.getElementById("resultDisplay").innerHTML = "";
        document.getElementById("runningCalculation").innerHTML = runningCalculation.join('')
        runningCalculation.push(operator);
        previousNumber.push(...currentNumber);
        currentNumber.length = 0;
        lastOperator = operator;
        document.getElementById("runningCalculation").innerHTML = runningCalculation.join('')
    }

// this block determines what happens when an operator is pressed after another operator has been pressed but there is nothing to calculate yet, basically it is just updating what operator the user has chosen
    else if (lastOperator !== null && currentNumber.length === 0) {
        runningCalculation.pop();
        runningCalculation.push(operator);
        lastOperator = operator;
        document.getElementById("runningCalculation").innerHTML = runningCalculation.join('')
    }
//once all other cases have been passed, you can run the calculate function and update a bunch of variables
    else {
        arg1 = previousNumber.join('');
        arg2 = currentNumber.join('');
        answer = calculate(arg1, arg2, lastOperator);
        runningCalculation = [];
        runningCalculation.push(answer,operator);
        document.getElementById("runningCalculation").innerHTML = runningCalculation.join('');
        document.getElementById("resultDisplay").innerHTML = answer;
        lastOperator = operator;
        previousResult = answer;
        previousNumber = [];
        previousNumber.push(answer);
        currentNumber = [];
    }

}

//called only when the equal key is pressed
function equalKeyPressed() {
    if (currentNumber.length == 0) {
    }
    else if (previousNumber.length !== 0 && lastOperator !== null) {
        arg1 = previousNumber.join('');
        arg2 = currentNumber.join('');
        answer = calculate(arg1, arg2, lastOperator);
        runningCalculation = [];
        runningCalculation.push(answer);
        document.getElementById("resultDisplay").innerHTML = '= ' + answer;
        lastOperator = null;
        previousResult = answer;
        previousNumber = [];
        currentNumber.push(answer);
    }
}

//determines which function to call based on key type
function keyType(e) {
    if (e.target !== e.currentTarget) {
        console.log(e.target);
        let clickedItem = e.target.id;
        if (clickedItem == 1 || clickedItem == 2 || clickedItem == 3 || clickedItem == 4 || clickedItem == 5 || clickedItem == 6 || clickedItem == 7 || clickedItem == 8 || clickedItem == 9 || clickedItem == 0 || clickedItem == '.') {
    numberPressed(clickedItem);
    console.log("number pressed " + clickedItem)
    }
    else if (clickedItem == "+" || clickedItem == "-" || clickedItem == "*" || clickedItem == "÷") {
    operatorPressed(clickedItem);
    console.log("operator pressed")
    }
    else if (clickedItem == "C") {
        clearAll();
    }
    else if (clickedItem == "=") {
        equalKeyPressed();
    }
    e.stopPropagation();
}
}

function clearAll() {
    currentNumber.length = 0;
    previousNumber.length = 0;
    runningCalculation.length = 0;
    calculationStarted = false;
    previousResult = NaN;
    lastOperator = null;
    document.getElementById("runningCalculation").innerHTML = runningCalculation.join('');
    document.getElementById("resultDisplay").innerHTML = "";

}


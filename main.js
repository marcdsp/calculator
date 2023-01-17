let currentNumber = [];
let currentNumberDisplay = []; //use document query string???
let previousNumber = [];
let previousNumberDisplay = [];
let runningCalculation = [];
let calculationStarted = false;
let previousResult = null;
let lastOperator = null; //might not need this
let theKeyPad = document.querySelector("#keyPanel");

//listeners
theKeyPad.addEventListener("click", keyType, false);

//calculate object
let operators = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    x: (a, b) => a * b,
    "÷": (a, b) => a / b,
  },
  calculate = function (val1, val2, sign) {
    if (sign in operators) {
      val1 = Number(val1);
      val2 = Number(val2);
      return operators[sign](val1, val2);
    }
  };

//what happens when a number is pressed
function numberPressed(val) {
  if (previousResult == null) {
    if (val == ".") {
      decimalPoint(val);
    } else if (val == "0") {
      zeroKey(val);
    } else if (currentNumberDisplay.includes("%")) {
      lastOperator = "x";
      previousNumber = [];
      previousNumberDisplay = [];
      previousNumber.push(...currentNumber);
      previousNumberDisplay.push(...currentNumberDisplay);
      currentNumber.length = 0;
      currentNumberDisplay.length = 0;
      currentNumber.push(val);
      currentNumberDisplay.push(val);
      RebuildRunningCalc();
    } else {
      currentNumber.push(val);
      currentNumberDisplay.push(val);
      previousResult = null;
      calculationStarted = true;
      RebuildRunningCalc();
    }
  } else {
    //if the user presses a number after a completed calculation, restart calculator and restart numbering
    clearAll();
    runningCalculation.push(val);
    calculationStarted = true;
    currentNumber.push(val);
    currentNumberDisplay.push(val);
    RebuildRunningCalc();
  }
}

//decimal point function block
function decimalPoint(val) {
  if (currentNumber.length == 0) {
    previousResult = null;
    val = "0.";
    runningCalculation.push(val);
    calculationStarted = true;
    currentNumber.push(val);
    currentNumberDisplay.push(val);
    RebuildRunningCalc();
  } else if (currentNumber.length == 1 && currentNumber[0] == "-") {
    previousResult = null;
    val = "0.";
    runningCalculation.push(val);
    calculationStarted = true;
    currentNumber.push(val);
    currentNumberDisplay.push(val);
    RebuildRunningCalc();
  } else if (currentNumber.includes(".") || currentNumber.includes("0.")) {
    previousResult = null;
  } else {
    runningCalculation.push(val);
    previousResult = null;
    document.getElementById("resultDisplay").innerHTML = "";
    calculationStarted = true;
    currentNumber.push(val);
    currentNumberDisplay.push(val);
    RebuildRunningCalc();
  }
}

// zero key function block
function zeroKey(val) {
  if (currentNumber.length == 0) {
  } else if (currentNumber.length == 1 && currentNumber[0] == "-") {
  } else {
    runningCalculation.push(val);
    previousResult = null;
    document.getElementById("resultDisplay").innerHTML = "";
    calculationStarted = true;
    currentNumber.push(val);
    currentNumberDisplay.push(val);
    RebuildRunningCalc();
  }
}

// operator functions
function operatorPressed(operator) {
  if (calculationStarted === false) {
    alert("No number to calculate");
  }
  // what happens when it is the first operator that has been pressed
  else if (previousNumber.length == 0 && lastOperator == null) {
    previousResult = null;
    document.getElementById("resultDisplay").innerHTML = "";
    RebuildRunningCalc();
    previousNumber = [];
    previousNumberDisplay = [];
    previousNumber.push(...currentNumber);
    previousNumberDisplay.push(...currentNumberDisplay);
    currentNumber.length = 0;
    currentNumberDisplay.length = 0;
    lastOperator = operator;
    RebuildRunningCalc();
  }

  // what happens when an operator is pressed after another operator has been pressed but there is nothing to calculate yet, basically it is just updating what operator the user has chosen
  else if (lastOperator !== null && currentNumber.length === 0) {
    previousResult = null;
    runningCalculation.pop();
    lastOperator = operator;
    RebuildRunningCalc();
  }
  //once all other cases have been passed, you can run the calculate function and update a bunch of variables
  else {
    arg1 = previousNumber.join("");
    arg2 = currentNumber.join("");
    answer = calculate(arg1, arg2, lastOperator);
    answer = ("" + answer).split("");
    runningCalculation.length = 0;
    runningCalculation.splice(0, runningCalculation.length, ...answer);
    runningCalculation.push(operator);
    RebuildRunningCalc();
    display = answer.join("");
    if (display.length > 13) display = display.substring(0, 13);
    document.getElementById("resultDisplay").innerHTML = display;
    lastOperator = operator;
    previousNumber.length = 0;
    previousNumberDisplay.length = 0;
    previousNumber.splice(0, previousNumber.length, ...answer);
    previousNumberDisplay.splice(0, previousNumber.length, ...answer);
    currentNumber.length = 0;
    currentNumberDisplay.length = 0;
  }
}

//equal key function block
function equalKeyPressed() {
  if (currentNumber.length == 0) {
  } else if (previousNumber.length !== 0 && lastOperator !== null) {
    arg1 = previousNumber.join("");
    arg2 = currentNumber.join("");
    answer = calculate(arg1, arg2, lastOperator);
    answer = ("" + answer).split("");
    runningCalculation.length = 0;
    runningCalculation.splice(0, runningCalculation.length, ...answer);
    display = answer.join("");
    if (display.length > 12) display = display.substring(0, 12);
    document.getElementById("resultDisplay").innerHTML = "= " + display;
    lastOperator = null;
    previousResult = answer;
    previousNumber.length = 0;
    previousNumberDisplay.length = 0;
    currentNumber.length = 0;
    currentNumberDisplay.length = 0;
    currentNumber.splice(0, answer.length, ...answer);
    currentNumberDisplay.splice(0, answer.length, ...answer);
  }
}

//backspace function block
function backspacePressed() {
  if (runningCalculation.length == 0) {
  } else if (lastOperator == null) {
    runningCalculation.pop();
    currentNumber.pop();
    currentNumberDisplay.pop();
    RebuildRunningCalc();
  } else if (currentNumber.length == 0 && lastOperator !== null) {
    runningCalculation.pop();
    currentNumber.push(...runningCalculation);
    currentNumberDisplay.push(...runningCalculation);
    previousNumber.length = 0;
    previousNumberDisplay.length = 0;
    lastOperator = null;
    RebuildRunningCalc();
    document.getElementById("resultDisplay").innerHTML = "";
  } else if (currentNumber.length !== 0 && lastOperator !== null) {
    currentNumber.pop();
    currentNumberDisplay.pop();
    RebuildRunningCalc();
    document.getElementById("resultDisplay").innerHTML = "";
  }
}

//plus-minus keypress function block
function plusMinusPressed() {
  if (currentNumber[0] == "-") {
    currentNumber.shift();
    currentNumberDisplay.shift();
    RebuildRunningCalc();
    document.getElementById("resultDisplay").innerHTML = "";
  } else {
    currentNumber.unshift("-");
    currentNumberDisplay.unshift("-");
    RebuildRunningCalc();
    document.getElementById("resultDisplay").innerHTML = "";
  }
}

//percentage key function block
function percentagePressed() {
  if (currentNumberDisplay[currentNumberDisplay.length - 1] == "%") {
    arg1 = currentNumber.join("");
    currentNumber = calculate(arg1, "100", "x");
    currentNumber = ("" + currentNumber).split("");
    currentNumberDisplay.pop();
    RebuildRunningCalc();
    document.getElementById("resultDisplay").innerHTML = "";
  } else {
    arg1 = currentNumber.join("");
    currentNumber = calculate(arg1, "100", "÷");
    currentNumber = ("" + currentNumber).split("");
    currentNumberDisplay.push("%");
    RebuildRunningCalc();
    document.getElementById("resultDisplay").innerHTML = "";
  }
}

//Build the running calculation display and then print
function RebuildRunningCalc() {
  runningCalculation.length = 0;
  runningCalculation = runningCalculation.concat(
    previousNumberDisplay,
    lastOperator,
    currentNumberDisplay
  );
  display = runningCalculation.join("");
  if (display.length > 18) display = display.substring(0, 18);
  document.getElementById("runningCalculation").innerHTML = display;
  document.getElementById("resultDisplay").innerHTML = "";
}

//key identifier... switches function based on key pressed
function keyType(e) {
  if (e.target !== e.currentTarget) {
    console.log(e.target);
    let clickedItem = e.target.id;
    if (
      clickedItem == 1 ||
      clickedItem == 2 ||
      clickedItem == 3 ||
      clickedItem == 4 ||
      clickedItem == 5 ||
      clickedItem == 6 ||
      clickedItem == 7 ||
      clickedItem == 8 ||
      clickedItem == 9 ||
      clickedItem == 0 ||
      clickedItem == "."
    ) {
      numberPressed(clickedItem);
      console.log("number pressed " + clickedItem);
    } else if (
      clickedItem == "+" ||
      clickedItem == "-" ||
      clickedItem == "x" ||
      clickedItem == "÷"
    ) {
      operatorPressed(clickedItem);
      console.log("operator pressed");
    } else if (clickedItem == "C") {
      clearAll();
    } else if (clickedItem == "=") {
      equalKeyPressed();
    } else if (clickedItem == "⌫") {
      backspacePressed();
    } else if (clickedItem == "⁺∕₋") {
      plusMinusPressed();
    } else if (clickedItem == "%") {
      percentagePressed();
    }
    e.stopPropagation();
  }
}

function clearAll() {
  currentNumber.length = 0;
  currentNumberDisplay.length = 0;
  previousNumber.length = 0;
  previousNumberDisplay.length = 0;
  runningCalculation.length = 0;
  calculationStarted = false;
  previousResult = null;
  lastOperator = null;
  document.getElementById("runningCalculation").innerHTML =
    runningCalculation.join("");
  document.getElementById("resultDisplay").innerHTML = "";
}

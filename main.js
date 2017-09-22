$(document).ready(initializeApp);
function initializeApp(){
    applyClickHandlers();
}

var calcInput = [];
var numInputInitiated = false;
var total = 0;
var lastButtonPressedWasEqual = false;
var orderOfOperationMode = true;

function display(toDisplay){
    if(isNaN(toDisplay) === true && toDisplay !== "-"){
        toDisplay = "ERROR";
    }
    $("#display").find("p").text(toDisplay)
}

function applyClickHandlers(){
    $(".numberButton").on("click", handleNumber);
    $("#negativeButton").on("click", handleNegative);
    $(".operatorButton").on("click", handleOperator);
    $("#op_equal").on("click", handleEqual);
    $("#clear_ce").on("click", handleCE);
    $("#clear_c").on("click", handleC);
    $("#orderOfOperationSwitch").on("click", handleOrderOfOperationSwitch);
}

function handleNumber() {
    if (lastButtonPressedWasEqual === true) {
        handleC();
    }
    lastButtonPressedWasEqual = false;
    var input = $(this).find("p").text();
    if (calcInput.length > 0){
        if(input === "."){
            if(calcInput[calcInput.length-1].indexOf(".") !== -1){
                return
            }
        }
    }
    if (!numInputInitiated) {
        numInputInitiated = true;
        calcInput.push(input);
    }
    else{
        calcInput[calcInput.length - 1] += input;
    }
    display(calcInput[calcInput.length - 1]);
    console.log("Input: ", calcInput);
}

function handleNegative(){
    if(calcInput.length === 0 || calcInput[calcInput.length-1] === "+" || calcInput[calcInput.length-1] === "-" || calcInput[calcInput.length-1] === "x" || calcInput[calcInput.length-1] === "÷") {
        if (numInputInitiated === false) {
        numInputInitiated = true;
        calcInput.push("-");
        display("-");
        }
    }
}

function handleOperator(){
    lastButtonPressedWasEqual = false;
    var operator = $(this).find("p").text().toString();
    if(calcInput.length === 0) {
        calcInput[0] = 0;
    }
    var lastIndex = calcInput.length - 1;
    if(calcInput[lastIndex].toString() === "+" || calcInput[lastIndex] === "-" || calcInput[lastIndex] === "x" || calcInput[lastIndex] === "÷"){   //implement negative number
        //repeat operator
        calcInput[lastIndex] = operator;
    }
    else{
        calcInput.push(operator);
    }
    numInputInitiated = false;
    calculateEquation();
    console.log("Input: ", calcInput);
}

function calculatePair(operatorIndex, inputArray){
    var firstNumber = inputArray[operatorIndex - 1];
    var secondNumber = inputArray[operatorIndex + 1];
    switch (inputArray[operatorIndex]) {
        case "+":
            total = parseFloat(firstNumber) + parseFloat(secondNumber);
            break;
        case "-":
            total = parseFloat(firstNumber) - parseFloat(secondNumber);
            break;
        case "x":
            total = parseFloat(firstNumber) * parseFloat(secondNumber);
            break;
        case "÷":
            if(parseFloat(secondNumber) === 0){
                total = "ERROR";
            }
            else{
                total = parseFloat(firstNumber) / parseFloat(secondNumber);
            }
            break;
    }
    //round total to nearest 100th
    if(total !== "ERROR") {
        total = Math.round((100 * total)) / 100
    }
    //remove numbers and operator - replace with total
    inputArray.splice(operatorIndex-1, 3, total);
    display(total);
}

function calculateEquation(){
    if(calcInput.length > 2) {
        var equationToSolve = [];
        for (var i = 0; i < calcInput.length; i++) {
            equationToSolve.push(calcInput[i])
        }
        var lastValueInEquationToSolve = equationToSolve[equationToSolve.length-1];
        if(lastValueInEquationToSolve === "+" || lastValueInEquationToSolve === "-" || lastValueInEquationToSolve === "x" || lastValueInEquationToSolve === "÷" ){
            equationToSolve.pop();
        }
        if(orderOfOperationMode) {
            while (equationToSolve.indexOf("x") !== -1 || equationToSolve.indexOf("÷") !== -1) {
                for (var i = 0; i < equationToSolve.length; i++) {
                    if (equationToSolve[i] === "x" || equationToSolve[i] === "÷") {
                        calculatePair(i, equationToSolve);
                        i = i - 1; //compensates for calculatePair() - which removes from array.
                    }
                }
            }
            console.log("Solve: ", equationToSolve);
            while (equationToSolve.indexOf("+") !== -1 || equationToSolve.indexOf("-") !== -1) {
                for (var i = 0; i < equationToSolve.length; i++) {
                    if (equationToSolve[i] === "+" || equationToSolve[i] === "-") {
                        calculatePair(i, equationToSolve);
                        i = i - 1;  //compensates for calculatePair() - which removes from array.
                    }
                }
            }
            console.log("Solve: ", equationToSolve)
        }
        else{
            while (equationToSolve.length > 1){
                for (var i = 0; i < equationToSolve.length; i++) {
                    if (equationToSolve[i] === "x" || equationToSolve[i] === "÷" || equationToSolve[i] === "+" || equationToSolve[i] === "-") {
                        calculatePair(i, equationToSolve);
                        i = i - 1; //compensates for calculatePair() - which removes from array.
                    }
                }
            }
            console.log("Solve: ", equationToSolve)
        }
    }
}

function handleEqual(){
    if(calcInput.length > 1) {
        if (lastButtonPressedWasEqual) {
            operationRepeat();
        }
        var lastInput = calcInput[calcInput.length - 1];
        if (lastInput === "+" || lastInput === "-" || lastInput === "x" || lastInput === "+") {
            if(calcInput.length === 2){
                partialOperand();
            }
            else{
                operationRollover();
            }
        }
        calculateEquation();
        lastButtonPressedWasEqual = true;
    }
}

function partialOperand(){
    calcInput[2] = calcInput[0];
}

function operationRepeat(){
    var secondToLastInput = calcInput[calcInput.length-2];
    var lastInput = calcInput[calcInput.length-1];
    calcInput.push(secondToLastInput);
    calcInput.push(lastInput);
}

function operationRollover(){
    calcInput.push(total.toString());
}

function handleCE(){
    if(lastButtonPressedWasEqual === true){
        var lastOperator = calcInput[calcInput.length-2];
        var lastNumber = calcInput[calcInput.length-1];
        handleC();
        calcInput[0] = 0;
        calcInput[1] = lastOperator;
        calcInput[2] = lastNumber;
        return
    }
    lastButtonPressedWasEqual = false;
    calcInput.pop();
    calcInput.push("");
    display(0);
}

function handleC(){
    lastButtonPressedWasEqual = false;
    calcInput = [];
    numInputInitiated = false;
    var total = 0;
    display(total);
}

function handleOrderOfOperationSwitch(){
    if(orderOfOperationMode === true){
        orderOfOperationMode = false;
        $("#orderOfOperationSwitch").css("background-color", "#cd0a0a");
        console.log("Order of Operation OFF")
    }
    else{
        orderOfOperationMode = true;
        $("#orderOfOperationSwitch").css("background-color", "#00f400");
        console.log("Order of Operation ON")
    }
    lastButtonPressedWasEqual = false;
}
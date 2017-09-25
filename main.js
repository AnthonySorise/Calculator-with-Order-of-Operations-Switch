$(document).ready(initializeApp);
function initializeApp(){
    applyClickHandlers();
}

var calcInput = [];
var numInputInitiated = false;
var total = 0;
var lastButtonPressedWasEqual = false;
var lastButtonPressedWasCE = false;
var pressedCEafterEqual = false;
var orderOfOperationMode = true;
var parenthesisToClose = 0;

$(window).keydown(function(event){
    switch(event.key) {
        case "0":
            $("#num_0").addClass("active");
            break;
        case "1":
            $("#num_1").addClass("active");
            break;
        case "2":
            $("#num_2").addClass("active");
            break;
        case "3":
            $("#num_3").addClass("active");
            break;
        case "4":
            $("#num_4").addClass("active");
            break;
        case "5":
            $("#num_5").addClass("active");
            break;
        case "6":
            $("#num_6").addClass("active");
            break;
        case "7":
            $("#num_7").addClass("active");
            break;
        case "8":
            $("#num_8").addClass("active");
            break;
        case "9":
            $("#num_9").addClass("active");
            break;
        case "+":
            $("#op_add").addClass("active");
            break;
        case "-":
            $("#op_subtract").addClass("active");
            break;
        case "*":
            $("#op_multiply").addClass("active");
            break;
        case "/":
            $("#op_divide").addClass("active");
            break;
        case ".":
            $("#decimal").addClass("active");
            break;
        case "Backspace":
            $("#clear_c").addClass("active");
            break;
        case "Delete":
            $("#clear_ce").addClass("active");
            break;
        case "(":
            $("#parenthesisLeft").addClass("active");
            break;
        case ")":
            $("#parenthesisRight").addClass("active");
            break;
        case "Enter":
            $("#op_equal").addClass("active");
            break;
        case "=":
            $("#op_equal").addClass("active");
            break;
        case "Pause":
            $("#negativeButton").addClass("active");
            break;
        case "End":
            $("#negativeButton").addClass("active");
            break;
        case "F9":  //what windows calc uses
            $("#negativeButton").addClass("active");
            break;
        case "Home":  //what windows calc uses
            $("#orderOfOperationSwitch").addClass("active");
            break;
    }
});

$(window).keyup(function(event){
    switch(event.key) {
        case "0":
            $("#num_0").click().removeClass("active");
            break;
        case "1":
            $("#num_1").click().removeClass("active");
            break;
        case "2":
            $("#num_2").click().removeClass("active");
            break;
        case "3":
            $("#num_3").click().removeClass("active");
            break;
        case "4":
            $("#num_4").click().removeClass("active");
            break;
        case "5":
            $("#num_5").click().removeClass("active");
            break;
        case "6":
            $("#num_6").click().removeClass("active");
            break;
        case "7":
            $("#num_7").click().removeClass("active");
            break;
        case "8":
            $("#num_8").click().removeClass("active");
            break;
        case "9":
            $("#num_9").click().removeClass("active");
            break;
        case "+":
            $("#op_add").click().removeClass("active");
            break;
        case "-":
            $("#op_subtract").click().removeClass("active");
            break;
        case "*":
            $("#op_multiply").click().removeClass("active");
            break;
        case "/":
            $("#op_divide").click().removeClass("active");
            break;
        case ".":
            $("#decimal").click().removeClass("active");
            break;
        case "Backspace":
            $("#clear_c").click().removeClass("active");
            break;
        case "Delete":
            $("#clear_ce").click().removeClass("active");
            break;
        case "(":
            $("#parenthesisLeft").click().removeClass("active");
            break;
        case ")":
            $("#parenthesisRight").click().removeClass("active");
            break;
        case "Enter":
            $("#op_equal").click().removeClass("active");
            break;
        case "=":
            $("#op_equal").click().removeClass("active");
            break;
        case "Pause":
            $("#negativeButton").click().removeClass("active");
            break;
        case "End":
            $("#negativeButton").click().removeClass("active");
            break;
        case "F9":  //what windows calc uses
            $("#negativeButton").click().removeClass("active");
            break;
        case "Home":  //what windows calc uses
            $("#orderOfOperationSwitch").click().removeClass("active");
            break;
    }
});

function display(toDisplay){
    if(isNaN(toDisplay) === true && (toDisplay !== "-" && toDisplay !== "(" && toDisplay !== ")")){
        toDisplay = "ERROR";
    }
    $("#display").find("p").text(toDisplay)
}

function applyClickHandlers(){
    $(".numberButton").on("click", handleNumber);
    $("#negativeButton").on("click", handleNegative);
    $("#parenthesisLeft").on("click", handleParenthesisLeft);
    $("#parenthesisRight").on("click", handleParenthesisRight);
    $(".operatorButton").on("click", handleOperator);
    $("#op_equal").on("click", handleEqual);
    $("#clear_ce").on("click", handleCE);
    $("#clear_c").on("click", handleC);
    $("#orderOfOperationSwitch").on("click", handleOrderOfOperationSwitch);
}

function lastButtonPressedWasOperator(){
    return (calcInput[calcInput.length - 1] === "+" || calcInput[calcInput.length - 1] === "-" || calcInput[calcInput.length - 1] === "x" || calcInput[calcInput.length - 1] === "÷")
}

function handleNumber() {
    if (lastButtonPressedWasEqual === true) {
        handleC();
    }
    if(pressedCEafterEqual){
        handleC();
    }
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
        if(input === "."){
            input = "0."
        }
        calcInput.push(input);
    }
    else{
        if(calcInput[calcInput.length-1] === "0"){
            calcInput.pop();
            calcInput.push(input)
        }
        else {
            calcInput[calcInput.length - 1] += input;
        }
    }
    display(calcInput[calcInput.length - 1]);
    console.log("Input: ", calcInput);
    lastButtonPressedWasEqual = false;
    lastButtonPressedWasCE = false;
    pressedCEafterEqual = false;
}

function handleNegative() {
    if (numInputInitiated === false && (calcInput.length === 0 || lastButtonPressedWasOperator() === true)) {
        numInputInitiated = true;
        calcInput.push("-");
        display("-");
    }
    else if(lastButtonPressedWasEqual === false){
        if (calcInput[calcInput.length - 1] === "-") {
            calcInput.pop();
            display(0);
            numInputInitiated = false;
        }
        else{
            calcInput[calcInput.length-1] = calcInput[calcInput.length-1] * -1;
            display(calcInput[calcInput.length-1])
        }
    }
    else{
        total = total*-1;
        calcInput = [];
        calcInput[0] = total;
        display(total);
    }
    console.log("Input: ", calcInput);
    lastButtonPressedWasEqual = false;
    lastButtonPressedWasCE = false;
    pressedCEafterEqual = false;
}

function handleParenthesisLeft(){
    if (numInputInitiated === false && (calcInput.length === 0 || lastButtonPressedWasOperator() === true)) {
        calcInput.push("(");
        display("(");
        parenthesisToClose += 1;
        lastButtonPressedWasEqual = false;
        lastButtonPressedWasCE = false;
        pressedCEafterEqual = false;
        console.log("Input: ", calcInput)
    }

}
function handleParenthesisRight(){
    if(parenthesisToClose > 0 && calcInput[calcInput.length-1] !== "("){
        calcInput.push(")");
        display(")");
        parenthesisToClose -= 1;
        lastButtonPressedWasEqual = false;
        lastButtonPressedWasCE = false;
        pressedCEafterEqual = false;
        console.log("Input: ", calcInput)
    }

}

function handleOperator(){
    var operator = $(this).find("p").text().toString();
    if(pressedCEafterEqual === true){
        handleC();
        calcInput[0] = 0;
        calcInput.push(operator);
    }
    if(calcInput.length === 0) {
        calcInput[0] = 0;
    }
    else if(lastButtonPressedWasOperator() === true){
        //repeat operator
        calcInput[calcInput.length-1] = operator;
    }
    else{
        calcInput.push(operator);
    }
    calculateEquation();
    console.log("Input: ", calcInput);
    numInputInitiated = false;
    lastButtonPressedWasEqual = false;
    lastButtonPressedWasCE = false;
    pressedCEafterEqual = false;
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
        for (var i = 0; i < calcInput.length; i++) {    //make clone of calcInput to preserve it
            equationToSolve.push(calcInput[i])
        }
        var lastValueInEquationToSolve = equationToSolve[equationToSolve.length-1];
        if(lastValueInEquationToSolve === "("){
            equationToSolve.pop();
        }
        lastValueInEquationToSolve = equationToSolve[equationToSolve.length-1];
        if(lastValueInEquationToSolve === "+" || lastValueInEquationToSolve === "-" || lastValueInEquationToSolve === "x" || lastValueInEquationToSolve === "÷" ){
            equationToSolve.pop();
        }
        if(orderOfOperationMode) {
            solveEquationWithOrderOfOperation(equationToSolve, true)
        }
        else{
            solveEquationWithSuccessiveOperation(equationToSolve)
        }
    }
}

function solveEquationWithOrderOfOperation(equationToSolve, logToConsole){
    while (equationToSolve.indexOf("(") !== -1 || equationToSolve.indexOf(")") !== -1) {
        var leftParenIndexes = [];
        var rightParenIndexes = [];
        for (var i = 0; i < equationToSolve.length; i++){
            if(equationToSolve[i] === "("){
                leftParenIndexes.push(i);
            }
            if(equationToSolve[i] === ")"){
                rightParenIndexes.push(i);
            }
        }
        if (rightParenIndexes.length < leftParenIndexes.length){    //close parenthesis if it hasn't been done already
            equationToSolve.push(")");
            rightParenIndexes.push(equationToSolve.length-1)
        }
        //get the inner parenthesis - last left, first right
        //do regular order of operation (copy and paste?)
        //remove the used parenthesis, and equation, replace with total
        //console log
        var lastLeftParen = leftParenIndexes[leftParenIndexes.length-1];
        var firstRightParen = rightParenIndexes[0];
        var parenEquation = [];
        for(var i = lastLeftParen + 1; i < firstRightParen; i++){
            parenEquation.push(equationToSolve[i]);
        }
        equationToSolve.splice(firstRightParen, 1);
        equationToSolve.splice(lastLeftParen, firstRightParen-lastLeftParen, solveEquationWithOrderOfOperation(parenEquation, false)[0]);
        console.log("Solve Parentheses: ", equationToSolve)
    }
    while (equationToSolve.indexOf("x") !== -1 || equationToSolve.indexOf("÷") !== -1) {
        for (var i = 0; i < equationToSolve.length; i++) {
            if (equationToSolve[i] === "x" || equationToSolve[i] === "÷") {
                calculatePair(i, equationToSolve);
                i = i - 1; //compensates for calculatePair() - which removes from array.
            }
        }
        if(logToConsole === true) {
            console.log("Solve Multiplication/Division: ", equationToSolve);
        }
    }
    while (equationToSolve.indexOf("+") !== -1 || equationToSolve.indexOf("-") !== -1) {
        for (var i = 0; i < equationToSolve.length; i++) {
            if (equationToSolve[i] === "+" || equationToSolve[i] === "-") {
                calculatePair(i, equationToSolve);
                i = i - 1;  //compensates for calculatePair() - which removes from array.
            }
        }
        if(logToConsole === true) {
            console.log("Solve Addition/Subtraction: ", equationToSolve)
        }
    }
    return equationToSolve;
}
function solveEquationWithSuccessiveOperation(equationToSolve){
    for (var i = 0; i < equationToSolve.length; i++){   //remove parenthesis
        if(equationToSolve[i] === "("){
            equationToSolve.splice(i, 1);
        }
        if(equationToSolve[i] === ")"){
            equationToSolve.splice(i, 1);
        }
    }
    while (equationToSolve.length > 1){
        for (var i = 0; i < equationToSolve.length; i++) {
            if (equationToSolve[i] === "x" || equationToSolve[i] === "÷" || equationToSolve[i] === "+" || equationToSolve[i] === "-") {
                calculatePair(i, equationToSolve);
                i = i - 1; //compensates for calculatePair() - which removes from array.
            }
        }
    }
    console.log("Solve: ", equationToSolve)
    return equationToSolve;
}

function handleEqual(){
    if(calcInput.length > 1) {
        if (lastButtonPressedWasEqual) {
            operationRepeat();
        }
        if(lastButtonPressedWasCE){
            if(lastButtonPressedWasOperator()){
                calcInput.push(0)
            }
        }
        if (lastButtonPressedWasOperator() === true) {
            if(calcInput.length === 2){
                partialOperand();
            }
            else{
                operationRollover();
            }
        }
        calculateEquation();
        lastButtonPressedWasEqual = true;
        lastButtonPressedWasCE = false;
        pressedCEafterEqual = false;
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

function handleCE() {
    if(!lastButtonPressedWasCE) {
        if(lastButtonPressedWasOperator() || calcInput[calcInput.length - 1] === "(" || calcInput[calcInput.length - 1] === ")"){
            while (lastButtonPressedWasOperator() || calcInput[calcInput.length - 1] === "(" || calcInput[calcInput.length - 1] === ")") {
                if (lastButtonPressedWasOperator() || calcInput[calcInput.length - 1] === "(" || calcInput[calcInput.length - 1] === ")") {
                    calcInput.pop();
                    console.log("Input: ", calcInput)
                    lastButtonPressedWasEqual = false;
                    lastButtonPressedWasCE = true;
                    numInputInitiated = false;
                }
            }
        }
        else{
            if (lastButtonPressedWasEqual) {
                pressedCEafterEqual = true;
                var lastOperator = calcInput[calcInput.length - 2];
                var lastNumber = calcInput[calcInput.length - 1];
                handleC();
                calcInput[0] = 0;
                calcInput[1] = lastOperator;
                calcInput[2] = lastNumber;
                console.log("Input: ", calcInput);
                lastButtonPressedWasEqual = false;
                lastButtonPressedWasCE = true;
                return
            }
            calcInput.pop();
            display(0);
            console.log("Input: ", calcInput);
            lastButtonPressedWasEqual = false;
            lastButtonPressedWasCE = true;
            numInputInitiated = false;
        }
    }
}

function handleC(){
    calcInput = [];
    numInputInitiated = false;
    var total = 0;
    display(total);
    lastButtonPressedWasEqual = false;
    console.log("Input: ", calcInput)
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
    pressedCEafterEqual = false;
}
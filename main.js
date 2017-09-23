$(document).ready(initializeApp);
function initializeApp(){
    applyClickHandlers();
}

var calcInput = [];
var numInputInitiated = false;
var total = 0;
var lastButtonPressedWasEqual = false;
var pressedCEafterEqual = false;
var orderOfOperationMode = true;

$(window).keyup(function(event){
    switch(event.key) {
        case "0":
            $("#num_0").click();
            break;
        case "1":
            $("#num_1").click();
            break;
        case "2":
            $("#num_2").click();
            break;
        case "3":
            $("#num_3").click();
            break;
        case "4":
            $("#num_4").click();
            break;
        case "5":
            $("#num_5").click();
            break;
        case "6":
            $("#num_6").click();
            break;
        case "7":
            $("#num_7").click();
            break;
        case "8":
            $("#num_8").click();
            break;
        case "9":
            $("#num_9").click();
            break;
        case "+":
            $("#op_add").click();
            break;
        case "-":
            $("#op_subtract").click();
            break;
        case "*":
            $("#op_multiply").click();
            break;
        case "/":
            $("#op_divide").click();
            break;
        case ".":
            $("#decimal").click();
            break;
        case "Backspace":
            $("#clear_c").click();
            break;
        case "Delete":
            $("#clear_ce").click();
            break;
        case "Enter":
            $("#op_equal").click();
            break;
    }
});

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
        calcInput.push(input);
    }
    else{
        calcInput[calcInput.length - 1] += input;
    }
    display(calcInput[calcInput.length - 1]);
    console.log("Input: ", calcInput);
    lastButtonPressedWasEqual = false;
    pressedCEafterEqual = false;
}

function handleNegative() {
    if (numInputInitiated === false) {
        if (calcInput.length === 0 || lastButtonPressedWasOperator() === true) {
            numInputInitiated = true;
            calcInput.push("-");
            display("-");
        }
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
}

function handleOperator(){

    if(pressedCEafterEqual === true){
        handleC();
    }
    var operator = $(this).find("p").text().toString();
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
        if(calcInput[calcInput.length-1] === ""){
            calcInput[calcInput.length-1] = 0;
        }
        var equationToSolve = [];
        for (var i = 0; i < calcInput.length; i++) {    //make clone of calcInput to preserve it
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
                console.log("Solve Multiplication/Division: ", equationToSolve);
            }
            while (equationToSolve.indexOf("+") !== -1 || equationToSolve.indexOf("-") !== -1) {
                for (var i = 0; i < equationToSolve.length; i++) {
                    if (equationToSolve[i] === "+" || equationToSolve[i] === "-") {
                        calculatePair(i, equationToSolve);
                        i = i - 1;  //compensates for calculatePair() - which removes from array.
                    }
                }
                console.log("Solve Addition/Subtraction: ", equationToSolve)
            }
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

function handleCE(){
    if(lastButtonPressedWasEqual){
        pressedCEafterEqual = true;
    }
    if(lastButtonPressedWasEqual === true){
        var lastOperator = calcInput[calcInput.length-2];
        var lastNumber = calcInput[calcInput.length-1];
        handleC();
        calcInput[0] = 0;
        calcInput[1] = lastOperator;
        calcInput[2] = lastNumber;
        console.log("Input: ", calcInput);
        lastButtonPressedWasEqual = false;
        return
    }
    calcInput.pop();
    calcInput.push("");
    display(0);
    console.log("Input: ", calcInput);
    lastButtonPressedWasEqual = false;
}

function handleC(){
    calcInput = [];
    numInputInitiated = false;
    var total = 0;
    display(total);
    lastButtonPressedWasEqual = false;
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
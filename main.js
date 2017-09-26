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
var calcHistory = [];
var logSolve = false;

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
function display(toDisplay){
    if(isNaN(toDisplay) === true && (toDisplay !== "-" && toDisplay !== "(" && toDisplay !== ")")){
        toDisplay = "ERROR";
    }
    $("#display").find("p").text(toDisplay)
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
    log("Input: " + calcInput.join(" "));
    lastButtonPressedWasEqual = false;
    lastButtonPressedWasCE = false;
    pressedCEafterEqual = false;
}
function handleNegative() {
    if (numInputInitiated === false && (calcInput.length === 0 || lastButtonPressedWasOperator() === true) || calcInput[calcInput.length-1] === "(") {
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
    log("Input: " + calcInput.join(" "));
    lastButtonPressedWasEqual = false;
    lastButtonPressedWasCE = false;
    pressedCEafterEqual = false;
}
function handleParenthesisLeft(){
    if(numInputInitiated){
        if(calcInput[calcInput.length-1] === "-"){
            calcInput[calcInput.length-1] += 1;
        }
        calcInput.push("x");
        numInputInitiated = false;
        log("Input: " + calcInput.join(" "));
    }


    if (numInputInitiated === false && (calcInput.length === 0 || lastButtonPressedWasOperator() === true) || calcInput[calcInput.length-1] === "(") {
        calcInput.push("(");
        display("(");
        parenthesisToClose += 1;
        lastButtonPressedWasEqual = false;
        lastButtonPressedWasCE = false;
        pressedCEafterEqual = false;
        console.log("Input: ", calcInput)
        log("Input: " + calcInput.join(" "));
    }
}
function handleParenthesisRight(){
    if(parenthesisToClose > 0 && calcInput[calcInput.length-1] !== "(" && numInputInitiated === true){
        calcInput.push(")");
        display(")");
        parenthesisToClose -= 1;
        lastButtonPressedWasEqual = false;
        lastButtonPressedWasCE = false;
        pressedCEafterEqual = false;
        console.log("Input: ", calcInput)
        log("Input: " + calcInput.join(" "));
    }

}
function handleOperator(){
    if(calcInput[calcInput.length-1] === "("){
        return;
    }
    if(calcInput[calcInput.length-1] === "-" && numInputInitiated === true && calcInput.length !== 0) {
        return
    }
    var operator = $(this).find("p").text().toString();
    if(pressedCEafterEqual === true){
        handleC();
        calcInput[0] = 0;
        calcInput.push(operator);
    }
    if(calcInput.length === 0) {
        calcInput[0] = 0;
        calcInput.push(operator)
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
    log("Input: " + calcInput.join(" "));
    numInputInitiated = false;
    lastButtonPressedWasEqual = false;
    lastButtonPressedWasCE = false;
    pressedCEafterEqual = false;
}
function handleC(){
    calcInput = [];
    numInputInitiated = false;
    var total = 0;
    display(total);
    lastButtonPressedWasEqual = false;
    console.log("Input: ", calcInput)
    log("Input: " + calcInput.join(" "));
    clearLogHistory();
}
function handleCE() {
    if(!lastButtonPressedWasCE) {
        if(lastButtonPressedWasOperator() || calcInput[calcInput.length - 1] === "(" || calcInput[calcInput.length - 1] === ")"){
            while (lastButtonPressedWasOperator() || calcInput[calcInput.length - 1] === "(" || calcInput[calcInput.length - 1] === ")") {
                if (lastButtonPressedWasOperator() || calcInput[calcInput.length - 1] === "(" || calcInput[calcInput.length - 1] === ")") {
                    calcInput.pop();
                    console.log("Input: ", calcInput);
                    log("Input: " + calcInput.join(" "));
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
                log("Input: " + calcInput.join(" "));
                lastButtonPressedWasEqual = false;
                lastButtonPressedWasCE = true;
                return
            }
            calcInput.pop();
            display(0);
            console.log("Input: ", calcInput);
            log("Input: " + calcInput.join(" "));
            lastButtonPressedWasEqual = false;
            lastButtonPressedWasCE = true;
            numInputInitiated = false;
        }
    }
}
function handleOrderOfOperationSwitch(){
    if(orderOfOperationMode === true){
        orderOfOperationMode = false;
        $("#orderOfOperationSwitch").css("background-color", "#cd0a0a");
        console.log("Order of Operation OFF");
        log("Order of Operation OFF");

    }
    else{
        orderOfOperationMode = true;
        $("#orderOfOperationSwitch").css("background-color", "#00f400");
        console.log("Order of Operation ON")
        log("Order of Operation ON");
    }
    lastButtonPressedWasEqual = false;      //should this switch?
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
    //round total to nearest 100th  //OR USER INPUT  - TODO
    if(total !== "ERROR") {
        var userInputRounding = "100";
        // var userDecimalValue = 0;
        // for(var i = 0; i<calcInput.length; i++){
        //     if(calcInput[i].indexOf(".")!== -1){
        //         var decimalValue = 0;
        //         var decimalFound = false;
        //         for(var j = 0; j < calcInput[i].length; j++){
        //             if(decimalFound){
        //                 decimalValue +=1;
        //             }
        //             if(calcInput[i][j] === "."){
        //                 decimalFound = true;
        //             }
        //         }
        //         if(userInputRounding < decimalValue){
        //             userInputRounding = decimalValue
        //         }
        //     }
        //
        // }
        // if(userDecimalValue > 2){
        //     userDecimalValue = userDecimalValue - 2;
        //     for(var i = 0; i < userDecimalValue; i++){
        //         userInputRounding += "0";
        //     }
        // }
        total = Math.round((userInputRounding * total)) / userInputRounding
    }
    //remove numbers and operator - replace with total
    inputArray.splice(operatorIndex-1, 3, total);
    display(total);
}
function calculateEquation(){
    // if(numInputInitiated && lastButtonPressedWasEqual){
    //     while(calcInput[calcInput.length-1] === "-" || calcInput[calcInput.length-1] === "+" || calcInput[calcInput.length-1] === "-" || calcInput[calcInput.length-1] === "x" || calcInput[calcInput.length-1] === "÷" ){
    //         calcInput.pop()
    //     }
    // }    //Attempt to fix infinite loop on (((((((-  <--- where last input it negative number.  TODO
    if(calcInput.length > 2) {
        var equationToSolve = [];
        for (var i = 0; i < calcInput.length; i++) {    //make clone of calcInput to preserve it
            equationToSolve.push(calcInput[i])
        }
        while(equationToSolve[equationToSolve.length-1] === "(" || equationToSolve[equationToSolve.length-1] === "+" || equationToSolve[equationToSolve.length-1] === "-" || equationToSolve[equationToSolve.length-1] === "x" || equationToSolve[equationToSolve.length-1] === "÷" ) {   //remove operators and unclosed parentheses at end
            equationToSolve.pop();
        }
        if(orderOfOperationMode) {
            solveEquationWithOrderOfOperation(equationToSolve, true)
        }
        else{
            solveEquationWithSuccessiveOperation(equationToSolve)
        }
        if (equationToSolve.length === 0){
            calcInput = [];
            total = 0;
            display(total);
            log("Input: " + calcInput.join())
        }
    }
}
function solveEquationWithOrderOfOperation(equationToSolve, logToConsole){
    while (equationToSolve.indexOf("(") !== -1) {
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
            while(rightParenIndexes.length - leftParenIndexes.length !== 0)
            {
                equationToSolve.push(")");
                rightParenIndexes.push(equationToSolve.length - 1);
            }
        }
        var leftParen = 0;
        var rightParen = 0;
        var foundMatchingLeftParen = false;
        for(var i = equationToSolve.length-1; i >=0; i--){
            if(equationToSolve[i] === ")"){
                rightParen = i;
            }
        }
        for(var i = rightParen; i >=0; i--){
            if(equationToSolve[i] === "("){
                if(foundMatchingLeftParen === false){
                    leftParen = i;
                    foundMatchingLeftParen = true;
                }
            }
        }
        var parenEquation = [];
        for(var i = leftParen + 1; i < rightParen; i++){
            parenEquation.push(equationToSolve[i]);
        }
        equationToSolve.splice(rightParen, 1);
        equationToSolve.splice(leftParen, rightParen-leftParen, solveEquationWithOrderOfOperation(parenEquation, false)[0]);
        console.log("Solve Parentheses: " + equationToSolve);
        if(logSolve) {
            log("Solve Parentheses: " + equationToSolve.join(" "));
        }
    }
    while (equationToSolve.indexOf("x") !== -1 || equationToSolve.indexOf("÷") !== -1) {
        for (var i = 0; i < equationToSolve.length; i++) {
            if (equationToSolve[i] === "x" || equationToSolve[i] === "÷") {
                calculatePair(i, equationToSolve);
                i = i - 1; //compensates for calculatePair() - which removes from array.
            }
        }
        if(logToConsole === true) {
            console.log("Solve Multiplication/Division: " + equationToSolve);
            if(logSolve) {
                log("Solve Multiplication/Division: " + equationToSolve.join(" "));
            }
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
            console.log("Solve Addition/Subtraction: ", equationToSolve);
            if(logSolve) {
                log("Solve Addition/Subtraction: " + equationToSolve.join(" "));
            }
        }
    }
    return equationToSolve;
}
function solveEquationWithSuccessiveOperation(equationToSolve){
    while(equationToSolve.indexOf("(") !== -1 || equationToSolve.indexOf(")") !== -1) { //remove parenthesis
        for (var i = 0; i < equationToSolve.length; i++) {
            if (equationToSolve[i] === "(") {
                equationToSolve.splice(i, 1);
            }
            if (equationToSolve[i] === ")") {
                equationToSolve.splice(i, 1);
            }
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
    console.log("Solve: ", equationToSolve);
    if(logSolve){
        log("Solve: " + equationToSolve.join(" "));
    }
    return equationToSolve;
}
function handleEqual(){
    logSolve = true;
    // while(calcInput[calcInput.length-1] === "(") {
    //     calcInput.pop();
    // }
    // if (calcInput[calcInput.length-1] === "-"){
    //     var indexToLookBack = 2;
    //     while(calcInput.length - indexToLookBack === "("){
    //         indexToLookBack +=1
    //     }
    //     if(calcInput[calcInput.length-indexToLookBack] === "+" || (calcInput[calcInput.length-indexToLookBack] === "-") || (calcInput[calcInput.length-indexToLookBack] === "x") || (calcInput[calcInput.length-indexToLookBack] === "÷")){    //if two operators in a row (second is -), then it's a negative symbol.  Remove it.{
    //         calcInput.pop();
    //     }
    // }
    log("Input: " + calcInput.join(" "))
    if(calcInput.length > 1) {
        if (lastButtonPressedWasEqual) {
            operationRepeat();
        }
        if(lastButtonPressedWasCE){
            if(lastButtonPressedWasOperator()){
                calcInput.push(0)
            }
        }
        if (lastButtonPressedWasOperator() === true && numInputInitiated === false) {
            if(calcInput.length === 2){
                partialOperand();
            }
            else{
                operationRollover();
            }
        }
        calculateEquation();
    }
    logSolve = false;
    lastButtonPressedWasEqual = true;
    lastButtonPressedWasCE = false;
    pressedCEafterEqual = false;
    numInputInitiated = false;
}
function partialOperand(){
    calcInput[2] = calcInput[0];
}
function operationRepeat(){
    var lastOperator;
    var lastNumber;
    for(var i = calcInput.length-1; i>=0; i--){
        if(isNaN(parseInt(calcInput[i])) === false && typeof lastNumber === "undefined"){
            lastNumber = calcInput[i];
        }
        else if((calcInput[i] === "+" ||  calcInput[i] === "-" || calcInput[i] === "x" || calcInput[i] === "÷") && typeof lastOperator === "undefined"){
            lastOperator = calcInput[i]
        }
    }
    calcInput.push(lastOperator);
    calcInput.push(lastNumber);
    log("Input: " + calcInput.join(" "))
}
function operationRollover(){
    calcInput.push(total.toString());
    log("Input: " + calcInput.join(" "))
}
function log(message){
    if(message.indexOf("NaN") !== -1){
        message = "CANNOT DIVIDE BY ZERO"
    }
    calcHistory.unshift(message);
    if(calcHistory.length > 25){
        calcHistory.pop();
    }
    for(var i = 0; i < calcHistory.length-1; i++){
        var logLI = "#log_" + (i);
        $(logLI).text(calcHistory[i]).css("list-style-type", "square")
    }
}
function clearLogHistory(){
    calcHistory = [];
    for(var i = 0; i < 25; i++){
        var logLI = "#log_" + (i);
        $(logLI).text("").css("list-style-type", "none")
    }
}
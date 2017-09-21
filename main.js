$(document).ready(initializeApp);
function initializeApp(){
    applyClickHandlers();
}
var calcInput = [];
var numInputInitiated = false;
var total = 0;
var lastButtonPressedWasEqual = false;
var lastInputHasDecimal = false;

function applyClickHandlers(){
    $(".numberButton").on("click", handleNumber);
    $(".operatorButton").on("click", handleOperator);
    $("#op_equal").on("click", handleEqual);
    $("#clear_ce").on("click", handleCE);
    $("#clear_c").on("click", handleC);
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
    $("#display").find("p").text(calcInput[calcInput.length - 1]);
    console.log("Input: ", calcInput);

}

function handleOperator(){
    lastButtonPressedWasEqual = false;
    var operator = $(this).find("p").text().toString();
    if(calcInput.length !== 0){
        var lastIndex = calcInput.length - 1;
        if(calcInput[lastIndex].toString() === "+" || calcInput[lastIndex] === "-" || calcInput[lastIndex] === "x" || calcInput[lastIndex] === "÷"){   //three equals doesn't work
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
            if(parseFloat(secondNumber) == 0){
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

    $("#display").find("p").text(total);
    return total;   //unused return
}

function calculateEquation(){
    if(calcInput.length > 2) {
        if(lastButtonPressedWasEqual === true){
            //check last input to determine what to do

        }
        //clone calcInput (don't want to change it if implementing order of operations functionality later)
        var equationToSolve = [];
        for (var i = 0; i < calcInput.length; i++) {
            equationToSolve.push(calcInput[i])
        }
        //if operator is at the end, get rid of it
        var lastValueInEquationToSolve = equationToSolve[equationToSolve.length-1];
        if(lastValueInEquationToSolve === "+" || lastValueInEquationToSolve === "-" || lastValueInEquationToSolve === "x" || lastValueInEquationToSolve === "÷" ){
            equationToSolve.pop();
        }
        while(equationToSolve.indexOf("x") !== -1 || equationToSolve.indexOf("÷") !== -1) {
            for (var i = 0; i < equationToSolve.length; i++) {
                // var didMath = false;
                if (equationToSolve[i] === "x" || equationToSolve[i] === "÷") {  //TO DO implement order of operation switch
                    calculatePair(i, equationToSolve);
                    i=i-1; //compensates for calculatePair() - which removes from array.
                }
            }
            console.log("Solve: ", equationToSolve)
        }
        while(equationToSolve.indexOf("+") !== -1 || equationToSolve.indexOf("-") !==-1) {
            for (var i = 0; i < equationToSolve.length; i++) {
                // var didMath = false;
                if (equationToSolve[i] === "+" || equationToSolve[i] === "-") {
                    calculatePair(i, equationToSolve);
                    i=i-1;  //compensates for calculatePair() - which removes from array.
                }
            }
            console.log("Solve: ", equationToSolve)
        }
    }
}

function handleEqual(){
    if(lastButtonPressedWasEqual){
        operationRepeat();
    }
    var lastInput = calcInput[calcInput.length-1];
    if (lastInput === "+" || lastInput === "-" || lastInput === "x" || lastInput === "+"){
        operationRollover();
    }
    calculateEquation();
    lastButtonPressedWasEqual = true;
}

//pressing equal more than once
function operationRepeat(){     //NEEDS WORK!  REPEAT AFTER ROLLOVER IS BROKEN!
    var secondToLastInput = calcInput[calcInput.length-2];
    var lastInput = calcInput[calcInput.length-1];
    console.log("REPEATING, ADDING " + secondToLastInput + " " + lastInput);
    console.log(calcInput);
    calcInput.push(secondToLastInput);
    calcInput.push(lastInput);

}

function operationRollover(){   //NEEDS WORK!  REPEAT AFTER ROLLOVER IS BROKEN!
    console.log("ROLLOVER - PUSHING " + total);
    console.log(calcInput);
    calcInput.push(total.toString());
}
//pressing equal more than once

function handleCE(){
    lastButtonPressedWasEqual = false;
    calcInput.pop();
    calcInput.push("");
    $("#display").find("p").text(0);
}
function handleC(){
    lastButtonPressedWasEqual = false;
    calcInput = [];
    numInputInitiated = false;
    var total = 0;
    $("#display").find("p").text(total);
}
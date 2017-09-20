$(document).ready(initializeApp);
function initializeApp(){
    applyClickHandlers();
}

var firstNumber = "";
var operator = "";
var secondNumber = "";
var logSecondNumber = false;

function applyClickHandlers(){
    $(".numberButton").on("click", handleNumber);
    $(".operatorButton").on("click", handleOperator);
    $("#op_equal").on("click", handleEqual);
    $("#clear_ce").on("click", handleCE);
    $("#clear_c").on("click", handleC);
}
function handleNumber(){
    var input = $(this).find("p").text();
    if(!logSecondNumber){
        firstNumber += input;
        $("#display").find("p").text(firstNumber);
    }
    else{
        secondNumber += input;
        $("#display").find("p").text(secondNumber);
    }

}
function handleOperator(){
    operator = $(this).find("p").text();
    secondNumber = "";
    logSecondNumber = true;
}
function handleEqual(){
    if(firstNumber === ""){
        firstNumber = 0;
    }
    if(secondNumber!== "") {
        var display = $("#display").find("p");
        var result = parseFloat(display.text());
        switch (operator) {
            case "+":
                result = parseFloat(firstNumber) + parseFloat(secondNumber);
                break;
            case "-":
                result = parseFloat(firstNumber) - parseFloat(secondNumber);
                break;
            case "x":
                result = parseFloat(firstNumber) * parseFloat(secondNumber);
                break;
            case "÷":
                result = parseFloat(firstNumber) / parseFloat(secondNumber);
                break;
            // default:
            // //if no operator, do nothing
        }
        result = Math.round((100 * result)) / 100;    //round to nearest 100th
        firstNumber = result;
        display.text(result);
    }
}
function handleCE() {
    var display = $("#display").find("p");
    if(logSecondNumber === false){
        handleC();
    }
    else if(parseFloat(display.text()) === firstNumber){
        logSecondNumber = false;
        firstNumber = "";
    }
    else{
        secondNumber = "";
    }
    display.text(0);
}
function handleC(){
    $("#display").find("p").text(0);
    firstNumber = "";
    operator = "";
    secondNumber = "";
    logSecondNumber = false;
}
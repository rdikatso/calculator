function add (a,b) {
    return a + b;   
}

function subtract (a,b) {
    return a - b;
}
    
function multiply(a,b){
    return a * b;
}

function divide(a,b){
    return a / b; 
}


function operate(operator, a, b){
    rev_a = parseFloat(a);
    rev_b = parseFloat(b);
    switch(operator){
        case "+":
            return add(rev_a,rev_b);
            break;
        case "-":
            return subtract(rev_a,rev_b);
            break;
        case "*": 
            return multiply(rev_a,rev_b);
            break;
        case "/":
            if(rev_b === 0){
                return "ERROR";
            }else{
                return divide(rev_a,rev_b);
            }
        break;
    
    }
}

const display = document.querySelector(".calculator-screen");
const clearButton = document.querySelector(".clear");
const deleteButton = document.querySelector(".delete");
const decimalButton = document.querySelector(".decimal");
const equalButton = document.querySelector(".equal-sign");
const operatorButtons = document.querySelectorAll(".operator");
const numberButtons = document.querySelectorAll(".number");

const calculator = {
    firstoperand : "",
    operator : "",
    waitingForSecondOperand : false,
    secondoperand : "",
    waitingForEqualSign : false
}

clearButton.addEventListener("click", clear);
deleteButton.addEventListener("click", del);
decimalButton.addEventListener("click", decimal);
equalButton.addEventListener("click", equal);
operatorButtons.forEach((btn) => 
    btn.addEventListener("click", () => {
        let displayValue = btn.value;
        setOperation(displayValue)
    })
);
numberButtons.forEach((btn) =>
    btn.addEventListener("click", () => {
        let displayValue = btn.value;
        setNumber(displayValue)
    })
);
    
function equal(){
    if(calculator.firstoperand && calculator.secondoperand && calculator.operator){
        let calculate = operate(calculator.operator,calculator.firstoperand,calculator.secondoperand);
        if((calculate === "ERROR") || (calculate.toString().length <= 7)){
            display.setAttribute("value",calculate);
        }else{
            display.setAttribute("value",calculate.toPrecision(7));
        }
        calculator.firstoperand = display.value;
        calculator.waitingForEqualSign = true; 
    }
}

function setNumber(displayValue){
    if(calculator.waitingForEqualSign){
        display.setAttribute("value",displayValue);
        calculator.waitingForEqualSign = false;
        calculator.firstoperand = "";
        calculator.operator = "";
        calculator.secondoperand = "";
        calculator.waitingForSecondOperand = false;
    }
    if (!calculator.waitingForSecondOperand){
        if (!calculator.firstoperand
        ){
            calculator.firstoperand = displayValue;
            display.setAttribute("value", calculator.firstoperand)
        }else{
            calculator.firstoperand = display.value + displayValue;
            display.setAttribute("value", calculator.firstoperand)
        } 
    }
    if (calculator.waitingForSecondOperand){
        calculator.secondoperand = displayValue;
        if (display.value === calculator.firstoperand){
            display.setAttribute("value", calculator.secondoperand)
        }else{
            calculator.secondoperand = display.value + displayValue;
          display.setAttribute("value", calculator.secondoperand);
        } 
    }
                       
}

function decimal(){
    if(!display.value.includes(".")){
        calculator.firstoperand = display.value;
        display.setAttribute("value", calculator.firstoperand + ".")
    }
    if (calculator.waitingForSecondOperand){
        display.setAttribute("value", "0.")
        calculator.waitingForEqualSign = false;
    }
}

function setOperation(displayValue){
    if (calculator.firstoperand && calculator.operator && calculator.secondoperand){
        let calcValue = operate(calculator.operator, calculator.firstoperand, calculator.secondoperand)
        display.setAttribute("value", calcValue);
        calculator.firstoperand = String(calcValue);
        calculator.secondoperand = "";
        calculator.operator = displayValue;
    }else{
        calculator.operator = displayValue;
        display.setAttribute("value", calculator.firstoperand);
        calculator.waitingForSecondOperand = true;
    }
}

function clear (){
    display.setAttribute("value","0");
    calculator.operator = "";
    calculator.firstoperand = "";
    calculator.secondoperand = "";
    calculator.waitingForSecondOperand = "";

}

function del (){
    let newdisplay = display.value.substring(0,display.value.length-1);
    display.setAttribute("value",newdisplay)
    if(!calculator.waitingForSecondOperand){
        calculator.firstoperand = display.value;
    }else{
        calculator.secondoperand = display.value;
    }

}



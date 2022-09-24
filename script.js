const screen = document.getElementsByClassName("screen")[0];

const clear = function(e) {
    displayValue = 0;
    screen.textContent = displayValue
    hasOperated = "false"
    operator = "empty";
    screen.classList.remove("fontSizeClass")
}

const clearEntry = function(e) {
    displayValue = 0;
    screen.textContent = displayValue
    hasOperated = "false"
    screen.classList.remove("fontSizeClass")
}

const backspace = function(e) {
    if (hasOperated == "true") return
    displayValue = displayValue.toString()
    if (displayValue === 0 || displayValue === "0") {
        return
    } else {
        if (displayValue.length == 1) {
            displayValue = 0
        } else {
            displayValue = displayValue.split("")
            displayValue.pop()
            displayValue = displayValue.join("")
        }
    }
    console.log("display = " + displayValue)
    screen.textContent = displayValue
}

const setFloat = function() {
    if (hasOperated == "true") displayValue = 0
    displayValue = displayValue.toString()
    if (Array.from(displayValue).some(element => element == ".")) return
    displayValue = displayValue.split("")
    displayValue.push(".")
    displayValue = displayValue.join("")
    screen.textContent = displayValue
    hasOperated = "false"
    return displayValue
}

const setPosNeg = function() {
    displayValue = (displayValue * -1)
    screen.textContent = displayValue
    return displayValue
}

const calcSquareRoot = function() {
    if (displayValue < 0) {
        screen.textContent = "Invalid Input"
        screen.classList.add("fontSizeClass")
        return
    }
    displayValue = Math.sqrt(displayValue)
    roundResult();
}

const calcSquare = function() {
    displayValue = (displayValue * displayValue)
    roundResult();
}

const calcDivideByX = function() {
    if (displayValue == 0) {
        screen.textContent = "Can't divide by zero"
        screen.classList.add("fontSizeClass")
        return
    }
    displayValue = (1 / displayValue)
    roundResult(displayValue);
}

// ########### ROUND RESULT #############

const roundResult = function() {
    //displayValue = (Math.round(displayValue * 1000000000) / 1000000000)
    displayValue = displayValue.toString()
    if (displayValue.length > 9) {
        screen.classList.add("fontSizeClass")
    } else {
        if (screen.classList.contains("fontSizeClass")) screen.classList.remove("fontSizeClass")
    }
    screen.textContent = displayValue
    hasOperated = "true"
}

const setKeydownX = function(e) {
    let x = document.querySelector(`div[data-key="${e.keyCode}"]`).textContent;
    console.log("x = " + x)
    getDisplayValue(x)
}

function setClickedX(numberClicked) {
    let x = numberClicked;
    console.log("x = " + x);
    getDisplayValue(x);
}

const checkKeydownButton = function(e) {
    if (!isNaN(document.querySelector(`div[data-key="${e.keyCode}"]`).textContent)) {
        setKeydownX(e)
    } else {
        checkKeydownOperator(e)
    }
}

const checkClickedButton = function(button) {
    if (!isNaN(button.textContent)) {
        console.log(button.textContent)
        let numberClicked = button.textContent
        console.log("checkClick " + numberClicked)
        setClickedX(numberClicked)
    } else {
        let operatorByClick = button.textContent
        checkClickedOperator(operatorByClick)
    }
}

const checkClickedOperator = function(operatorByClick) {
    let temp = operatorByClick
    if (temp == "⌫") {
        backspace();
    } else if (temp == "C") {
        clear();
    } else if (temp == "CE") {
        clearEntry();
    } else if (temp == "/") {
        operate(temp);
    } else if (temp == "*") {
        operate(temp);
    } else if (temp == "-") {
        operate(temp);
    } else if (temp == "+") {
        operate(temp);
    } else if (temp == "=") {
        calculate();
    } else if (temp == ".") {
        setFloat();
    } else if (temp == "+/-") {
        setPosNeg();
    } else if (temp == "√x") {
        calcSquareRoot();
    } else if (temp == "x²") {
        calcSquare();
    } else if (temp == "1/x") {
        calcDivideByX();
    } else if (temp == "%") {
        operate(temp);
    } 
}

const checkKeydownOperator = function(e) {
    let temp = document.querySelector(`div[data-key="${e.keyCode}"]`).textContent
    if (temp == "⌫") {
        backspace();
    } else if (temp == "C") {
        clear();
    } else if (temp == "CE") {
        clearEntry();
    } else if (temp == "/") {
        setKeydownOperator(temp);
    } else if (temp == "*") {
        setKeydownOperator(temp);
    } else if (temp == "-") {
        setKeydownOperator(temp);
    } else if (temp == "+") {
        setKeydownOperator(temp);
    } else if (temp == "=") {
        calculate();
    } else if (temp == ".") {
        setFloat();
    } else if (temp == "+/-") {
        setPosNeg();
    } else if (temp == "√x") {
        calcSquareRoot();
    } else if (temp == "x²") {
        calcSquare();
    } else if (temp == "1/x") {
        calcDivideByX();
    } else if (temp == "%") {

    } 
}

const setKeydownOperator = function(temp) {
    operator = checkKeydownOperator();
    
    displayValue = 0;
    return displayValue
}

const setClickedOperator = function() {
    operator = checkClickedOperator();
    
    displayValue = 0;
    return displayValue
}

// const getFirstValue = function() {
//     let firstValue = displayValue
//     displayValue = 0
//     return firstValue
// }

// const getSecondValue = function() {
//     let secondValue = displayValue
//     displayValue = 0
//     return secondValue
// }

let firstValue

let secondValue

let hasOperated = "false"

let operator = "empty"

let result

// const getSecondValue = function() {
//     if (operator == "empty") 


// }

const calculate = function() {
    if (operator == "empty") return
    console.log(operator)
    secondValue = displayValue
    result
    if (operator == "+") result = (Number(firstValue) + Number(secondValue))
    if (operator == "-") result = (Number(firstValue) - Number(secondValue))
    if (operator == "*") result = (Number(firstValue) * Number(secondValue))
    if (operator == "/") {
        if (firstValue == 0 && secondValue == 0) {
            result = "Result is undefined"
            screen.classList.add("fontSizeClass")
        } else if (secondValue == 0) {
            result = "Can't divide by zero"
            screen.classList.add("fontSizeClass")
        } else result = (Number(firstValue) / Number(secondValue))
    }
    screen.textContent = result
    firstValue = result
    hasOperated = "true"
}

const operate = function(temp) {
    console.log(operator)

    firstValue = displayValue
    operator = temp
    hasOperated = "true"
    return
}

let displayValue = 0

function getDisplayValue(x) {
    if (displayValue === 0 || displayValue === "0" || hasOperated == "true") {
        displayValue = x

    } else if (displayValue.length >= 9) {
        return
    } else {
        displayValue = displayValue.split("")
        displayValue.push(x)
        displayValue = displayValue.join("")
    }
    console.log("display = " + displayValue)
    screen.textContent = displayValue
    hasOperated = "false"
    screen.classList.remove("fontSizeClass")
    return displayValue
}

document.addEventListener("keydown", checkKeydownButton)

const buttons = Array.from(document.querySelectorAll('.button'));

buttons.forEach(button => button.addEventListener('click', () => {
    checkClickedButton(button)
}));

buttons.forEach(button => button.addEventListener('mouseover', () => {
    button.style.backgroundColor ="rgb(63, 63, 63)"
}));

buttons.forEach(button => button.addEventListener('mousedown', () => {
    button.style.backgroundColor ="rgb(150, 150, 150)"
}));

buttons.forEach(button => button.addEventListener('mouseup', () => {
    button.style.backgroundColor =""
}));

buttons.forEach(button => button.addEventListener('mouseleave', () => {
    button.style.backgroundColor =""
}));
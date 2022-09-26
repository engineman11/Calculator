
const percentButton = document.getElementById("percent");
const posNegButton = document.getElementById("posNeg");
const dotButton = document.getElementById("dot");
const oneDividedByButton = document.getElementById("oneDividedBy");
const squareButton = document.getElementById("square");
const squareRootButton = document.getElementById("squareRoot");
const divideButton = document.getElementById("divide");
const multiplyButton = document.getElementById("multiply");
const addButton = document.getElementById("add");
const subtractButton = document.getElementById("subtract");


const screen = document.getElementsByClassName("screen")[0];

const buttons = Array.from(document.querySelectorAll('.button'));

let displayValue = 0

let firstValue

let secondValue

let operator = "empty"

let hasReceivedOperator = "false"

let hasCalculated = "false"

let operatorHasCalculated = "false"

let hasReceivedErrorOutput = "false"

const disableButtons = function() {
    hasReceivedErrorOutput = "true"
    percentButton.style.color = "rgb(30, 30, 30)"
    posNegButton.style.color = "rgb(30, 30, 30)"
    dotButton.style.color = "rgb(30, 30, 30)"
    oneDividedByButton.style.color = "rgb(30, 30, 30)"
    squareButton.style.color = "rgb(30, 30, 30)"
    squareRootButton.style.color = "rgb(30, 30, 30)"
    divideButton.style.color = "rgb(30, 30, 30)"
    multiplyButton.style.color = "rgb(30, 30, 30)"
    addButton.style.color = "rgb(30, 30, 30)"
    subtractButton.style.color = "rgb(30, 30, 30)"
}

const enableButtons = function() {
    hasReceivedErrorOutput = "false"
    percentButton.style.color = ""
    posNegButton.style.color = ""
    dotButton.style.color = ""
    oneDividedByButton.style.color = ""
    squareButton.style.color = ""
    squareRootButton.style.color = ""
    divideButton.style.color = ""
    multiplyButton.style.color = ""
    addButton.style.color = ""
    subtractButton.style.color = ""
}

const clear = function(e) {
    displayValue = 0;
    screen.textContent = displayValue
    screen.classList.remove("fontSizeClass")
    firstValue = undefined
    secondValue = undefined
    operator = "empty";
    hasReceivedOperator = "false"
    hasCalculated = "false"
    operatorHasCalculated = "false"
    if (hasReceivedErrorOutput = "true") enableButtons();
}

const clearEntry = function(e) {
    if (hasReceivedErrorOutput == "true") clear()
    displayValue = 0;
    screen.textContent = displayValue
    screen.classList.remove("fontSizeClass")
    hasCalculated = "false"
    operatorHasCalculated = "false"
}

const backspace = function(e) {
    if (hasReceivedErrorOutput == "true") clear()
    if (hasCalculated == "true") return
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
    if (hasReceivedErrorOutput == "true") return
    if (hasCalculated == "true") displayValue = 0
    displayValue = displayValue.toString()
    if (Array.from(displayValue).some(element => element == ".")) return
    displayValue = displayValue.split("")
    displayValue.push(".")
    displayValue = displayValue.join("")
    screen.textContent = displayValue
    return displayValue
}

const setPosNeg = function() {
    if (hasReceivedErrorOutput == "true") return
    displayValue = (displayValue * -1)
    screen.textContent = displayValue
    return displayValue
}

const calcSquareRoot = function() {
    if (hasReceivedErrorOutput == "true") return
    if (displayValue < 0) {
        screen.textContent = "Invalid Input"
        disableButtons();
        screen.classList.add("fontSizeClass")
        return
    }
    displayValue = Math.sqrt(displayValue)
    roundResult();
}

const calcSquare = function() {
    if (hasReceivedErrorOutput == "true") return
    displayValue = (displayValue * displayValue)
    roundResult();
}

const calcDivideByX = function() {
    if (hasReceivedErrorOutput == "true") return
    if (displayValue == 0) {
        screen.textContent = "Can't divide by zero"
        disableButtons();
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
    hasCalculated = "true"
}

const setKeydownX = function(e) {
    let x = document.querySelector(`div[data-key="${e.keyCode}"]`).textContent;
    getDisplayValue(x)
}

function setClickedX(numberClicked) {
    let x = numberClicked;
    getDisplayValue(x);
}


const subtract = function() {
    if (secondValue != undefined) {
        firstValue = (Number(firstValue) - Number(secondValue))
        displayValue = firstValue
        // secondValue = undefined
    } else {
        firstValue = (Number(firstValue) - Number(displayValue))
    }
    screen.textContent = firstValue
    hasCalculated = "true"

    console.log("displayValue = " + displayValue)
    console.log("firstValue = " + firstValue)
    console.log("secondValue = " + secondValue)
}

const multiply = function() {
    if (secondValue != undefined) {
        
        firstValue = (Number(firstValue) * Number(secondValue))
        displayValue = firstValue
        // secondValue = undefined
    } else {
        secondValue = displayValue
        firstValue = (Number(firstValue) * Number(secondValue))
    }
    screen.textContent = firstValue
    hasCalculated = "true"

    console.log("displayValue = " + displayValue)
    console.log("firstValue = " + firstValue)
    console.log("secondValue = " + secondValue)
}

// const divide = function() {
//     {
//         if (firstValue == 0 && secondValue == 0) {
//             firstValue = "Result is undefined"
//             screen.classList.add("fontSizeClass")
//         } else if (secondValue == 0) {
//             firstValue = "Can't divide by zero"
//             screen.classList.add("fontSizeClass")
//         } else result = (Number(firstValue) / Number(secondValue))
//     }
//     if (secondValue != undefined) {
//         firstValue = (Number(firstValue) / Number(secondValue))
//         displayValue = firstValue
//         // secondValue = undefined
//     } else {
//         firstValue = (Number(firstValue) / Number(displayValue))
//     }
//     screen.textContent = firstValue
//     hasCalculated = "true"

//     console.log("displayValue = " + displayValue)
//     console.log("firstValue = " + firstValue)
//     console.log("secondValue = " + secondValue)
// }

const add = function() {
    if (secondValue != undefined) {
        firstValue = (Number(firstValue) + Number(secondValue))
        displayValue = firstValue
        // secondValue = undefined
    } else {
        secondValue = displayValue
        firstValue = (Number(firstValue) + Number(secondValue))
    }
    screen.textContent = firstValue
    hasCalculated = "true"
    console.log("hasReceivedOperator = " + hasReceivedOperator)
    console.log("displayValue = " + displayValue)
    console.log("firstValue = " + firstValue)
    console.log("secondValue = " + secondValue)
}

const calculateWithEquals = function() {
    if (hasReceivedErrorOutput == "true") clear()
    if (operator == "empty") return
    if (operator == "+") add();
    if (operator == "-") subtract();
    if (operator == "*") multiply();
    if (operator == "/") divide(); 
}

const calculateWithOperator = function() {
    if (operator == "+") add();
    if (operator == "-") subtract();
    if (operator == "*") multiply();
    if (operator == "/") divide();


    operatorHasCalculated = "true"
}

const getOperator = function(temp) {
    if (hasReceivedErrorOutput == "true") return
    if (hasReceivedOperator == "false" && firstValue == undefined) {
        firstValue = displayValue;
    } else if (hasReceivedOperator == "true" && secondValue != undefined && operatorHasCalculated == "false") {
        (calculateWithOperator());
    // } else if (hasReceivedOperator == "true" && firstValue != undefined) {

    } 
    operator = temp;
    hasReceivedOperator = "true"
    console.log("hasReceivedOperator = " + hasReceivedOperator)
    console.log("operator = " + operator);
    console.log("displayValue = " + displayValue)
    console.log("firstValue = " + firstValue)
    console.log("secondValue = " + secondValue)
}

function getDisplayValue(x) {
    if (hasReceivedErrorOutput == "true") clear()
    displayValue = displayValue.toString()
    if (hasReceivedOperator == "true" || secondValue != undefined) {
        displayValue = x
        if (secondValue == undefined) {
            secondValue = displayValue
        }
    } else if (displayValue === 0 || displayValue === "0") {
        displayValue = x

    } else if (displayValue.length >= 9) {
        return
    } else {
        displayValue = displayValue.split("")
        displayValue.push(x)
        displayValue = displayValue.join("")
    }
    screen.textContent = displayValue
    operatorHasCalculated = "false"
    // hasReceivedOperator = "false"
    screen.classList.remove("fontSizeClass")
    console.log("hasReceivedOperator = " + hasReceivedOperator)
    console.log("displayValue = " + displayValue)
    console.log("firstValue = " + firstValue)
    console.log("secondValue = " + secondValue)
    return displayValue
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
        getOperator(temp);
    } else if (temp == "*") {
        getOperator(temp);
    } else if (temp == "-") {
        getOperator(temp);
    } else if (temp == "+") {
        getOperator(temp);
    } else if (temp == "=") {
        calculateWithEquals();
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
        getOperator(temp);
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
        getOperator(temp);
    } else if (temp == "*") {
        getOperator(temp);
    } else if (temp == "-") {
        getOperator(temp);
    } else if (temp == "+") {
        getOperator(temp);
    } else if (temp == "=") {
        calculateWithEquals();
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
        getOperator();
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

const checkKeydownButton = function(e) {
    if (!isNaN(document.querySelector(`div[data-key="${e.keyCode}"]`).textContent)) {
        setKeydownX(e)
    } else {
        checkKeydownOperator(e)
    }
}

const checkClickedButton = function(button) {
    if (!isNaN(button.textContent)) {
        let numberClicked = button.textContent
        setClickedX(numberClicked)
    } else {
        let operatorByClick = button.textContent
        checkClickedOperator(operatorByClick)
    }
}

document.addEventListener("keydown", checkKeydownButton)


// function addEventListenerToButtons() {

// }
buttons.forEach(button => button.addEventListener('click', () => {
    checkClickedButton(button)
}));

//SaddEventListenerToButtons();

buttons.forEach(button => button.addEventListener('mouseover', () => {
    button.style.backgroundColor ="rgb(80, 80, 80)"
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
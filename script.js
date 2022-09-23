let screen = document.getElementById("screen");

const percent = document.getElementById("%");
const ce = document.getElementById("CE")
const c = document.getElementById("C")
const del = document.getElementById("DEL")
const oneDividedBy = document.getElementById("1/x")
const square = document.getElementById("x²")
const squareRoot = document.getElementById("√x")
const divide = document.getElementById("/")
const seven = document.getElementById("7")
const eight = document.getElementById("8")
const nine = document.getElementById("9")
const multiply = document.getElementById("*")
const four = document.getElementById("4")
const five = document.getElementById("5")
const six = document.getElementById("6")
const minus = document.getElementById("-")
const one = document.getElementById("1")
const two = document.getElementById("2")
const three = document.getElementById("3")
const plus = document.getElementById("+")
const posNeg = document.getElementById("+/-")
const zero = document.getElementById("0");
const dot = document.getElementById(".");
const equals = document.getElementById("=");


const checkKeyDown = function(e) {
    if (!isNaN(Number(document.querySelector(`div[data-key="${e.keyCode}"]`).textContent))) {
        setX()
    } else {
        setOperator()
    }
}


const setX = function() {
    let x = document.querySelector(`div[data-key="${e.keyCode}"]`).textContent;
    console.log("x = " + x)
    getDisplayValue(x)       
}

const setOperator = function(e) {
    let operator = document.querySelector(`div[data-key="${e.keyCode}"]`).textContent;
    if (operator == "=") {

    }
}

const operate = function() {
    let temp = displayValue
    let b = setOperator();
    displayValue = 0
    let firstValue = temp
    let secondValue = 
    if (b == "+") displayValue = (firstValue + secondValue)
    if (b == "-") displayValue = (firstValue - secondValue)
    if (b == "*") displayValue = (firstValue * secondValue)
    if (b == "/") {
         if (firstValue == 0 && secondValue == 0) displayValue = "Resut is undefined"
    } else if (secondValue == 0) displayValue = "Can't divide by zero"
    else displayValue = (firstValue / secondValue)
    document.getElementById("screen").textContent = displayValue
}

let displayValue = 0

function getDisplayValue(x) {
    if (displayValue == 0) {
        displayValue = x
    } else if (displayValue.length >= 9) {
        return
    } else {
        displayValue = Array.from(displayValue)
        displayValue.push(x)
        displayValue = displayValue.join("")
    }
    
    // displayValue = parseInt(displayValue)
    console.log("display = " + displayValue)
    document.getElementById("screen").textContent = displayValue
    return displayValue

}

// function addClassPressed() {
//     document.getElementById("3").classList.add("buttonPressed");
// }
// function removeClassPressed() {
//     button.classList.remove("buttonPressed");
// }


// // document.querySelectorAll(".button")

// document.getElementById("3").addEventListener("mousedown", addClassPressed)

// document.querySelectorAll(".button").addEventListener("mouseup", removeClassPressed)


document.addEventListener("keydown", checkKeyDown)

// 96 - 0 in the numeric keypad
// 97 - 1 in the numeric keypad
// 98 - 2 in the numeric keypad
// 99 - 3 in the numeric keypad
// 100 - 4 in the numeric keypad
// 101 - 5 in the numeric keypad
// 102 - 6 in the numeric keypad
// 103 - 7 in the numeric keypad
// 104 - 8 in the numeric keypad
// 105 - 9 in the numeric keypad
// 106 - * in the numeric keypad
// 107 - + in the numeric keypad
// 109 - - in the numeric keypad
// 110 - . in the numeric keypad
// 111 - / in the numeric keypad



// document.addEventListener("")
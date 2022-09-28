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
const previousOperandScreen = document.getElementsByClassName("previousOperand")[0]

const buttons = Array.from(document.querySelectorAll('.button'));

let currentOperand = "0"

let previousOperand = ""

let percentCalcOperand = ''

let operation = undefined

let hasCalculated = false

let hasReceivedErrorOutput = false

const disableButtons = function() {
    hasReceivedErrorOutput = true
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
    hasReceivedErrorOutput = false
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
    previousOperand = ""
    currentOperand = ""
    operation = undefined;
    hasReceivedOperator = false
    hasCalculated = false
    percentCalcOperand = ''
    updateDisplay();
    if (hasReceivedErrorOutput) enableButtons();
}

const clearEntry = function(e) {
    if (hasReceivedErrorOutput) clear()
    previousOperand = ""
    currentOperand = ""
    hasCalculated = false
    percentCalcOperand = ''
    updateDisplay();
}

const backspace = function(e) {
    if (hasReceivedErrorOutput) clear()
    if (hasCalculated) return
    if (currentOperand.toString() === "0") {
        return
    } else {
        if (currentOperand.toString().length == 1) {
            currentOperand = "0"
        } else {
            currentOperand = currentOperand.slice(0, -1)
        }
    }
    updateDisplay();
    if (hasCalculated) previousOperandScreen.textContent = ''
}

const setFloat = function() {
    if (hasReceivedErrorOutput) return
    if (hasCalculated) currentOperand = "0"
    if (currentOperand.toString().includes(".")) return
    if (currentOperand === '') currentOperand = '0'
    currentOperand = currentOperand.toString() + '.'
    updateDisplay()
}

const setPosNeg = function() {
    if (hasReceivedErrorOutput) return
    if (currentOperand === '0' || currentOperand === '') return
    if (currentOperand.toString().includes('-')) {
        currentOperand = currentOperand.slice(1)
    } else {
        currentOperand = '-' + currentOperand.toString()
    }
    updateDisplay();
}

const calcSquareRoot = function() {
    if (hasReceivedErrorOutput) return
    if (currentOperand < 0) {
        currentOperand = "Invalid Input"
        disableButtons();
        updateDisplay();
        return
    }
    currentOperand = Math.sqrt(currentOperand)
    updateDisplay();
    hasCalculated = true
}

const calcSquare = function() {
    if (hasReceivedErrorOutput) return
    currentOperand = (Math.round((currentOperand * currentOperand) * 1000000000000000) / 1000000000000000)

    updateDisplay();
    hasCalculated = true
}

const calcDivideByX = function() {
    if (hasReceivedErrorOutput) return
    if (currentOperand == 0) {
        currentOperand = "Only Chuck Norris can divide by zero."
        disableButtons();
        updateDisplay();
        return
    }
    currentOperand = (1 / currentOperand)
    updateDisplay();
    hasCalculated = true
}

const percent = function() {
    if (hasReceivedErrorOutput) return
    if (previousOperand === '') {
        if (percentCalcOperand === '' && (hasCalculated)) { 
            percentCalcOperand = currentOperand
        }
        currentOperand = (currentOperand / 100) * percentCalcOperand
    } else { 
        currentOperand = (currentOperand / 100) * previousOperand
    }
    updateDisplay();
    hasCalculated = true
}

// const add = function() {
//     currentOperand = (Number(previousOperand) + Number(currentOperand))
//     previousOperand = currentOperand
//     screen.textContent = currentOperand
//     hasCalculated = true
// }

const compute = function() {
    if (hasReceivedErrorOutput) clear()
    let computation
    const prev = parseFloat(previousOperand)
    const current = parseFloat(currentOperand)
    if (isNaN(prev) || isNaN(current)) return
    switch (operation) {
        case "+":
            computation = prev + current
            break
        case "-":
            computation = prev - current
            break   
        case "*":
            computation = prev * current
            break
        case "/":
            if (current == 0 && prev == 0) {
                currentOperand = "Result is undefined"
                disableButtons();
                updateDisplay();
                return
            } else if (current == 0) {
                currentOperand = "Only Chuck Norris can divide by zero."
                disableButtons();
                updateDisplay();
                return
            }
            computation = prev / current
            break
        default:
            return
    }
    currentOperand = (Math.round(computation * 1000000000000000) / 1000000000000000)
    operation = undefined
    previousOperand = ""
    updateDisplay();
    hasCalculated = true
}

const chooseOperation = function(specialButton) {
    if (hasReceivedErrorOutput) return
    
    if (currentOperand === '') {
        operation = specialButton
        updateDisplay()
        return
    }
    if (previousOperand !== '') {
        compute()
    }
    operation = specialButton
    previousOperand = currentOperand;
    currentOperand = ''
    updateDisplay()
}

function appendNumber(number) {
    if (hasReceivedErrorOutput) clear()
    if (currentOperand.toString() === "0" || currentOperand === '' || (hasCalculated)) {
        currentOperand = number.toString()
    } else if (!hasCalculated && (currentOperand.toString().length >= 16 && !(currentOperand.toString().includes(".")))) {
        return
    } else if (!hasCalculated && currentOperand.toString().length >= 17) {
        return
    // } else if (operation != undefined && previousOperand !== '') {
    //     currentOperand = number.toString()
    } else {
        currentOperand = currentOperand.toString() + number.toString()
    }
    updateDisplay();
    hasCalculated = false
}

const updateDisplay = function() {
    if (currentOperand === "") currentOperand = "0"
  //  else 
    screen.textContent = currentOperand
    if (currentOperand.toString().length > 10 && currentOperand.toString().length < 17) {
        screen.classList.add("fontSizeClassMedium")
        screen.classList.remove("fontSizeClassSmall")
    } else if (currentOperand.toString().length > 16) {
        screen.classList.add("fontSizeClassSmall")
        screen.classList.remove("fontSizeClassMedium")
    } else {
        screen.classList.remove("fontSizeClassSmall")
        screen.classList.remove("fontSizeClassMedium")
    }
    currentOperand = currentOperand.toString();
    if (operation != null) {
        previousOperandScreen.textContent = `${previousOperand} ${operation}`
    } else {
        previousOperandScreen.textContent = `${previousOperand}`
    }
    if (currentOperand == "Infinity") {
        currentOperand = "🤡 Fullstackoverflow, or something like that. 🤡"
        screen.textContent = currentOperand
        screen.classList.add("fontSizeClassSmall")
        disableButtons();
    }
    if (currentOperand == "666") previousOperandScreen.textContent = `👹🎃💀👿💀🎃👹`
    if (currentOperand == "1337") previousOperandScreen.textContent = `😎💻`
    if (currentOperand == "80085") previousOperandScreen.textContent = `heh...`
    if (currentOperand == "420") previousOperandScreen.textContent = `Don't do drugs plx.`
    if (currentOperand == "69") previousOperandScreen.textContent = `👀`
    if (currentOperand == "42") previousOperandScreen.textContent = `correct`
    if (currentOperand == "777") previousOperandScreen.textContent = `🎉🎉🎉`
    if (currentOperand.includes('25.8069758011')) previousOperandScreen.textContent = `Root of all evil.`


    
}

const setKeydownNumber = function(e) {
    let number = document.querySelector(`div[data-key="${e.keyCode}"]`).textContent;
    appendNumber(number)
}

function setClickedNumber(number) {
    appendNumber(number);
}

const checkClickedOperator = function(specialButton) {
    if (specialButton == "⌫") {
        backspace();
    } else if (specialButton == "C") {
        clear();
    } else if (specialButton == "CE") {
        clearEntry();
    } else if (specialButton == "/" || specialButton == "*" || specialButton == "-" || specialButton == "+") {
        chooseOperation(specialButton);
    } else if (specialButton == "%") {
        percent();
    } else if (specialButton == "=") {
        compute();
    } else if (specialButton == ".") {
        setFloat();
    } else if (specialButton == "+/-") {
        setPosNeg();
    } else if (specialButton == "√x") {
        calcSquareRoot();
    } else if (specialButton == "x²") {
        calcSquare();
    } else if (specialButton == "1/x") {
        calcDivideByX();
    }
}

const checkKeydownOperator = function(e) {
    specialButton = document.querySelector(`div[data-key="${e.keyCode}"]`).textContent
    if (specialButton == "⌫") {
        backspace();
    } else if (specialButton == "C") {
        clear();
    } else if (specialButton == "CE") {
        clearEntry();
    } else if (specialButton == "/" || specialButton == "*" || specialButton == "-" || specialButton == "+") {
        chooseOperation(specialButton);
    } else if (specialButton == "%") {
        percent();
    } else if (specialButton == "=") {
        compute();
    } else if (specialButton == ".") {
        setFloat();
    } else if (specialButton == "+/-") {
        setPosNeg();
    } else if (specialButton == "√x") {
        calcSquareRoot();
    } else if (specialButton == "x²") {
        calcSquare();
    } else if (specialButton == "1/x") {
        calcDivideByX();
    } else {
        return
    }
}

const setKeydownOperator = function(specialButton) {
    specialButton = checkKeydownOperator();
    // currentOperand = 0;
    return currentOperand
}

const setClickedOperator = function() {
    specialButton = checkClickedOperator();
    //currentOperand = 0;
    return currentOperand
}

const checkKeydownButton = function(e) {
    if (isNaN(document.querySelector(`div[data-key="${e.keyCode}"]`).textContent)) {
        console.log(document.querySelector(`div[data-key="${e.keyCode}"]`).textContent)
        checkKeydownOperator(e)
        
    } else {
        setKeydownNumber(e)
    }
}

const checkClickedButton = function(button) {
    if (isNaN(button.textContent)) {
        specialButton = button.textContent
        checkClickedOperator(specialButton)
    } else {
        let number = button.textContent
        setClickedNumber(number)
    }
}

document.addEventListener("keydown", checkKeydownButton)

buttons.forEach(button => button.addEventListener('click', () => {
    checkClickedButton(button)
}));


// const mouseMoveListener = function(button) {
//     'pointerover', () => {
//     button.style.backgroundColor ="rgb(80, 80, 80)"
//     }
// }

// buttons.forEach(button);

buttons.forEach(button => button.addEventListener('pointerover', () => {
    button.style.backgroundColor ="rgb(80, 80, 80)"
}));

buttons.forEach(button => button.addEventListener('pointerdown', () => {
    button.style.backgroundColor ="rgb(150, 150, 150)"
}));

buttons.forEach(button => button.addEventListener('pointerup', () => {
    button.style.backgroundColor ="rgb(80, 80, 80)"
}));

buttons.forEach(button => button.addEventListener('pointerleave', () => {
    button.style.backgroundColor =""
}));



// document.addEventListener('pointerdown', mouseDownListener, true);
// document.addEventListener('pointerup', mouseUpListener, true);

// function mouseDownListener(e) {
//     document.removeEventListener('pointerover', mouseMoveListener, true);

// }

// function mouseUpListener(e) {
//     document.addEventListener('pointerover', mouseMoveListener, true);
// }    
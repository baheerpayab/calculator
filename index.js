const allBtns = document.querySelectorAll("button");
const prevTxtDisplay = document.getElementById("previousTxt");
const crntTxtDisplay = document.getElementById("currentTxt");

// ADD KEYBOARD FUNCTIONALITY

let currentNum = "";
let previousNum = "";
let newNum = "";
let selectedOperator = "";
let currentTxt = "";
let previousTxt = "";
let summaryTxt = "";


allBtns.forEach((button) => {
    button.addEventListener('click', () => {
        btnChecker(button);
    })
});

function btnChecker(button) {
    let btnAtt = button.getAttribute("data-type")
    if (btnAtt == "operation") {
        operation(button);
    }
    if (btnAtt == "input") {
        numberInput(button);
    }
    if (btnAtt == "function") {
        calcFunction(button);
    }
}

// BUTTON INPUT

function numberInput(button) {
    let numValue = button.getAttribute("value");
    currentNum += numValue;
    updateDisplay();
    console.log(currentNum);
}

function operation(button) {
    if (button.getAttribute("id") == "equals") {
        prevTxtDisplay.textContent += " " + `${currentNum}`
        equals();
    } else if (selectedOperator !== "" && currentNum == "") {
        selectedOperator = button.getAttribute("id");
        updateDisplay();
    } 
    else if (selectedOperator !== "") {
        equals();
    }
    selectedOperator = button.getAttribute("id");
    nextNumber();
}

function calcFunction(button) {
    if (button.getAttribute("id") == "clear") {
        currentNum = "";
        previousNum = "";
        selectedOperator = "";
    }
    if (button.getAttribute("id") == "delete") {
        currentNum = currentNum.slice(0, -1);
        console.log(currentNum);
    }
}

// NUMBER STORING

function storeNum(numValue) {
    if (currentNum == "") {
    currentNum = numValue;
    }
    else {
        currentNum += numValue;
    }
}

function nextNumber() {
    if (currentNum == "") {
        return;
    } else {
    previousNum = currentNum;
    currentNum = "";
    console.log(previousNum);
    }
    updateDisplay();
}

// MATH FUNCTIONS

function divide(a, b) {
    let divided = Math.round((parseFloat(a) / parseFloat(b)) * 1000) / 1000;
    currentNum = divided.toString();
    console.log(currentNum);
    return a / b;
}

function multiply(a, b) {
    let multiplied = Math.round(parseFloat(a) * parseFloat(b) * 1000) / 1000;
    currentNum = multiplied.toString();
    console.log(currentNum);
    return a * b;
}

function subtract(a, b) {
    let sub = parseFloat(a) - parseFloat(b);
    currentNum = sub.toString();
    console.log(currentNum);
    return a - b;
}

function add(a, b) {
    let sum = parseFloat(a) + parseFloat(b);
    currentNum = sum.toString();
    console.log(currentNum);
    return a + b;
}

function equals() {
    if (selectedOperator == "add") {
        add(previousNum, currentNum);
        selectedOperator = "";
    } if (selectedOperator == "subtract") {
        subtract(previousNum, currentNum);
        selectedOperator = "";
    } if (selectedOperator == "divide") {
        divide(previousNum, currentNum);
        selectedOperator = "";
    } if (selectedOperator == "multiply") {
        multiply(previousNum, currentNum);
        selectedOperator = "";
    }
    updateDisplay();
}

// DISPLAY TEXT

function updateDisplay() {
    if (selectedOperator == "") {
        crntTxtDisplay.textContent = `${currentNum}`;
    }
    if (selectedOperator == "add") {
        crntTxtDisplay.textContent = `${currentNum}`;
        prevTxtDisplay.textContent = `${previousNum}`;
        prevTxtDisplay.textContent += " " + "+";
    } if (selectedOperator == "subtract") {
        crntTxtDisplay.textContent = `${currentNum}`;
        prevTxtDisplay.textContent = `${previousNum}`;
        prevTxtDisplay.textContent += " " + "-";
    } if (selectedOperator == "divide") {
        crntTxtDisplay.textContent = `${currentNum}`;
        prevTxtDisplay.textContent = `${previousNum}`;
        prevTxtDisplay.textContent += " " + "÷";
    } if (selectedOperator == "multiply") {
        crntTxtDisplay.textContent = `${currentNum}`;
        prevTxtDisplay.textContent = `${previousNum}`;
        prevTxtDisplay.textContent += " " + "×";
    } if (selectedOperator == "equals") {
        prevTxtDisplay.textContent += " " + "=";
        crntTxtDisplay.textContent = `${previousNum}`;
    }
    
}

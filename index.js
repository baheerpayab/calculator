let allBtns = document.querySelectorAll("button");
let currentNum = 0;
let previousNum = 0;
let selectedOperator;

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

/* MATH OPERATIONS */

function storeNum(numValue) {
    if (currentNum == 0) {
    currentNum = numValue;
    }
    else {
        currentNum += numValue;
    }
}

function nextNumber() {
    previousNum = currentNum;
    currentNum = 0;
    console.log(previousNum);
}

function numberInput(button) {
    let numValue = button.getAttribute("value");
    storeNum(numValue);
}

function operation(button) {
    if (button.getAttribute("id") == "equals") {
        equals();
    } else {
    selectedOperator = button.getAttribute("id");
    nextNumber();
    }
}

function divide(a, b) {
    return a / b;
}

function multiply(a, b) {
    return a * b;
}

function subtract(a, b) {
    return a - b;
}

function add(a, b) {
    let sum = parseInt(a) + parseInt(b);
    currentNum = sum.toString();
    console.log(currentNum);
    return ;
}

function equals() {
    if (selectedOperator == "add") {
        add(previousNum, currentNum);
        selectedOperator = "none";
    }
}
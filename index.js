const allBtns = document.querySelectorAll("button");
const prevTxtDisplay = document.getElementById("previousTxt");
const crntTxtDisplay = document.getElementById("currentTxt");

// ADD KEYBOARD FUNCTIONALITY
// Can't divide by 0
// Clear and delete functions - completed

let currentNum = "";
let previousNum = "0";
let newNum = "";
let selectedOperator = "";
let currentTxt = "";
let previousTxt = "";
let summaryTxt = "";
let operated = false;
let numbers = 0;

allBtns.forEach((button) => {
    button.addEventListener('click', () => {
        btnChecker(button);
    })
});


document.addEventListener("keydown", (e) => {
    if (e.key == "." || (e.key >= 0 && e.key <= 9)) {
      e.preventDefault();
      document.querySelector(`button[value="${e.key}"`).click(); 
      console.log(e.key);
    } else if (e.key == "Enter" || e.key == "=") {
        e.preventDefault();
        document.getElementById("equals").click();
    } else if (e.key == "Backspace") {
        e.preventDefault();
      document.getElementById("delete").click()
      } else if (e.key == "Escape") {
        e.preventDefault();
      document.getElementById("clear").click()
      } else if (e.key == "Add" || e.key == "+") {
        e.preventDefault();
      document.getElementById("add").click()
      } else if (e.key == "Subtract" || e.key == "-") {
        e.preventDefault();
      document.getElementById("subtract").click()
      } else if (e.key == "Divide" || e.key == "/") {
        e.preventDefault();
      document.getElementById("divide").click()
      } else if (e.key == "Multiply" || e.key == "*") {
        e.preventDefault();
      document.getElementById("multiply").click()
      }
});

/*function handleKeyboardInput(e) {
    if (e.key >= 0 && e.key <= 9) btnChecker(e.)
    if (e.key === '.') appendPoint()
    if (e.key === '=' || e.key === 'Enter') evaluate()
    if (e.key === 'Backspace') deleteNumber()
    if (e.key === 'Escape') clear()
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/')
      setOperation(convertOperator(e.key))
  }
  
  function convertOperator(keyboardOperator) {
    if (keyboardOperator === '/') return '÷'
    if (keyboardOperator === '*') return '×'
    if (keyboardOperator === '-') return '−'
    if (keyboardOperator === '+') return '+'
  }*/

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
    if (currentNum.includes(".") && numValue == ".") {
        return;
    } else {
    currentNum += numValue;
    if (selectedOperator == "equals") {
        if (prevTxtDisplay.textContent.includes("+")) selectedOperator = "add";
        if (prevTxtDisplay.textContent.includes("-")) selectedOperator = "subtract";
        if (prevTxtDisplay.textContent.includes("÷")) selectedOperator = "divide";
        if (prevTxtDisplay.textContent.includes("×")) selectedOperator = "multiply";
    }
    updateDisplay();
    console.log(currentNum);
    }
}

function operation(button) {
    if (button.getAttribute("id") == "equals" && prevTxtDisplay.textContent.includes("=") == true && currentNum == "") {
        return;
    }
    else if (button.getAttribute("id") == "equals" && prevTxtDisplay.textContent.includes("=") == false && currentNum !== "") {
        prevTxtDisplay.textContent += " " + `${currentNum}`;
        console.log(selectedOperator);
        operated = false;
        equals();
        console.log("this runs");
    }
    else if (selectedOperator !== "" && currentNum == "") {
        selectedOperator = button.getAttribute("id");
        operated = false;
        updateDisplay();
        console.log("nah this runs ")
    } 
    else if (selectedOperator !== "") {
        operated = false;
        equals();
        console.log("this runs too fsr")
    }
    selectedOperator = button.getAttribute("id");
    console.log(selectedOperator);
    nextNumber();
}

function calcFunction(button) {
    if (button.getAttribute("id") == "clear") {
        currentNum = "";
        previousNum = "0";
        selectedOperator = "";
        prevTxtDisplay.textContent = "";
        crntTxtDisplay.textContent = "";
    }
    if (button.getAttribute("id") == "delete") {
        currentNum = crntTxtDisplay.textContent;
        currentNum = currentNum.slice(0, -1);
        console.log(currentNum);
        crntTxtDisplay.textContent = crntTxtDisplay.textContent.slice(0, -1);     
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
    //console.log(previousNum + "dop");
    }
    //console.log(numbers);
    console.log(selectedOperator);
    updateDisplay();
}

// MATH FUNCTIONS

function divide(a, b) {
    if (b == "0") {
        alert("Why would you divide by 0? Just why?");

    } else {
    let divided = Math.round((parseFloat(a) / parseFloat(b)) * 1000) / 1000;
    currentNum = divided.toString();
    console.log(currentNum);
    return a / b;
    }
}

function multiply(a, b) {
    let multiplied = Math.round(parseFloat(a) * parseFloat(b) * 1000) / 1000;
    currentNum = multiplied.toString();
    //console.log(currentNum);
    return a * b;
}

function subtract(a, b) {
    let sub = parseFloat(a) - parseFloat(b);
    currentNum = sub.toString();
    //console.log(currentNum);
    return a - b;
}

function add(a, b) {
    let sum = parseFloat(a) + parseFloat(b);
    currentNum = sum.toString();
    //console.log(currentNum);
    return a + b;
}

function equals() {
    if (selectedOperator == "add") {
        add(previousNum, currentNum);
        selectedOperator = "";
        operated = true;
    } if (selectedOperator == "subtract") {
        subtract(previousNum, currentNum);
        selectedOperator = "";
        operated = true;
    } if (selectedOperator == "divide") {
        divide(previousNum, currentNum);
        selectedOperator = "";
        operated = true;
    } if (selectedOperator == "multiply") {
        multiply(previousNum, currentNum);
        selectedOperator = "";
        operated = true;
    }
    console.log(selectedOperator);
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
    } if (selectedOperator == "equals" && prevTxtDisplay.textContent.includes("=") && currentNum == "") {
        console.log("false")
        return;
    } else if (selectedOperator == "equals" && currentNum !== "" && previousNum == "") {
        prevTxtDisplay.textContent += " " + "=";
        crntTxtDisplay.textContent = `${previousNum}`;
        console.log("equals sign boo")
        selectedOperator = "";
    } else if (selectedOperator == "equals" && operated == true) {
        prevTxtDisplay.textContent += " " + "=";
        crntTxtDisplay.textContent = `${previousNum}`;
        console.log("equals sign")
        selectedOperator = "";
        operated = false;
    } else if (selectedOperator == "equals") {
        crntTxtDisplay.textContent = `${currentNum}`;
    }

    console.log(selectedOperator);
    
}

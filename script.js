const lastOperation = document.querySelector(".last-operation");
const currentOperation = document.querySelector(".current-operation");
const buttonLayout = document.querySelectorAll("button");

let firstValue = "0";
let secondValue = "";
let operator = null;
let operatorUsedOnce = false;

function operate(firstValue, secondValue, operator) {
  firstValue = Number(firstValue);
  secondValue = Number(secondValue);
  switch (operator) {
    case "+":
      return firstValue + secondValue;
    case "-":
      return firstValue - secondValue;
    case "x":
      return firstValue * secondValue;
    case "÷":
      if (secondValue === 0) {
        setTimeout(clear, 1500);
        return "error";
      } else {
        return firstValue / secondValue;
      }
  }
}
function checkOperator(value) {
  switch (value) {
    case "+":
      return true;
    case "-":
      return true;
    case "x":
      return true;
    case "÷":
      return true;
  }
  return false;
}
function deletefunction() {
  if (secondValue === "") {
    firstValue = firstValue.substring(0, firstValue.length - 1);
    currentOperation.textContent = `${firstValue}`;
    if (firstValue === "") {
      firstValue = "0";
      currentOperation.textContent = firstValue;
      return;
    }
  } else {
    secondValue = secondValue.substring(0, secondValue.length - 1);
    currentOperation.textContent = `${secondValue}`;
    if (secondValue === "") {
      secondValue = "0";
      currentOperation.textContent = secondValue;
      return;
    }
  }
}

buttonLayout.forEach((button) =>
  button.addEventListener("click", (e) => {
    let currentValue = e.target.value;
    if (currentValue === "clear") {
      clear();
    } else if (currentValue === "delete") {
      deletefunction();
    } else if (currentValue === "result") {
      if (firstValue != null && secondValue != "" && operator != null) {
        result();
      }
    } else if (checkOperator(currentValue)) {
      handleOperator(currentValue);
    } else {
      handleOperand(currentValue);
    }
  })
);

function clear() {
  firstValue = "0";
  secondValue = "";
  operator = null;
  operatorUsedOnce = false;
  lastOperation.textContent = "";
  currentOperation.textContent = `${firstValue}`;
}

function handleOperand(value) {
  if (operator === null) {
    if (firstValue === "0") {
      firstValue = "0";
    }
    if (value === ".") {
      if (!firstValue.includes(".")) {
        firstValue = firstValue + value;
      }
    } else {
      firstValue = firstValue + value;
    }
    currentOperation.textContent = `${firstValue}`;
  } else {
    if (value === ".") {
      if (!secondValue.includes(".")) {
        secondValue = secondValue + value;
      }
    } else {
      secondValue = secondValue + value;
    }
    currentOperation.textContent = `${secondValue}`;
  }
}

function handleOperator(value) {
  if (secondValue == "") {
    updateOperation(value);
  } else if (operatorUsedOnce) {
    if (secondValue != "") {
      result();
      updateOperation(value);
    }
  } else {
    updateOperation(value);
  }
  operatorUsedOnce = true;
}

function updateOperation(value) {
  lastOperation.textContent = "";
  operator = value;
  lastOperation.append(`${firstValue} `);
  lastOperation.append(`${operator} `);
}

function result() {
  lastOperation.textContent = `${firstValue} ${operator} ${secondValue} =`;
  firstValue = operate(firstValue, secondValue, operator);
  if (!Number.isInteger(firstValue) && typeof firstValue !== "string") {
    firstValue = firstValue.toFixed(3);
  }
  firstValue = firstValue.toString();
  currentOperation.textContent = `${firstValue}`;
  secondValue = "";
  operator = null;
  operatorUsedOnce = false;
}

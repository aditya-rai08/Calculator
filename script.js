
let number = document.querySelectorAll(".number");
let display = document.querySelector("#display");
let backspace = document.querySelector("#backspace");
let clear = document.querySelector("#clear");
let operator = document.querySelectorAll(".operator");
let result = document.querySelector("#result");

let firstNum = null;
let secondNum = null;
let choice = null;
let justCalculated = false;

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function division(num1, num2) {
    if (num2 === 0) {
        return "Bruh, you can't divide by zero!";
    }
    return num1 / num2;
}

function modulo(num1, num2) {
    return num1 % num2;
}

function calculate(num1, num2, operator) {
    switch (operator) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "X":
            return multiply(num1, num2);
        case "/":
            return division(num1, num2);
        case "%":
            return num2 === 0
                ? "Bruh, you can't divide by zero!"
                : modulo(num1, num2);
        default:
            return null;
    }
}

// Number buttons
for (let i = 0; i < number.length; i++) {
    number[i].addEventListener("click", () => {

        if (justCalculated) {
            display.textContent = "";
            firstNum = null;
            secondNum = null;
            choice = null;
            justCalculated = false;
        }

        display.textContent += number[i].textContent;
    });
}

// Backspace
backspace.addEventListener("click", () => {
    if (!justCalculated) {
        display.textContent = display.textContent.slice(0, -1);
    }
});

// Clear
clear.addEventListener("click", () => {
    display.textContent = "";
    firstNum = null;
    secondNum = null;
    choice = null;
    justCalculated = false;
});

// Operator buttons
for (let i = 0; i < operator.length; i++) {
    operator[i].addEventListener("click", () => {

        let nextChoice = operator[i].textContent.trim();

        // Ignore an operator if no number has been entered
        if (display.textContent === "" && firstNum === null) {
            return;
        }

        // If a previous operation is waiting, calculate it
        if (choice !== null && display.textContent !== "") {

            secondNum = Number(display.textContent);

            let answer = calculate(firstNum, secondNum, choice);

            display.textContent = answer;

            // Stop if the result is an error message
            if (typeof answer !== "number" || !Number.isFinite(answer)) {
                firstNum = null;
                secondNum = null;
                choice = null;
                justCalculated = true;
                return;
            }

            firstNum = answer;

        } else if (display.textContent !== "") {

            // Save the first number
            firstNum = Number(display.textContent);
        }

        // Store the newly clicked operator
        choice = nextChoice;
        secondNum = null;
        justCalculated = false;

        // Clear display for the next number
        display.textContent = "";
    });
}

// Equals button
result.addEventListener("click", () => {

    // Check that both numbers and an operator exist
    if (
        firstNum === null ||
        choice === null ||
        display.textContent === ""
    ) {
        return;
    }

    secondNum = Number(display.textContent);

    let answer = calculate(firstNum, secondNum, choice);

    // Round long decimal results
    if (typeof answer === "number" && Number.isFinite(answer)) {
        answer = Number(answer.toPrecision(10));
    }

    display.textContent = answer;

    firstNum = typeof answer === "number" && Number.isFinite(answer)
        ? answer
        : null;

    secondNum = null;
    choice = null;
    justCalculated = true;
});

const buttonBsp = document.getElementById("button--bsp");
const inputElement = document.getElementById("button--result");
const buttonEquals = document.getElementById("button--equals");
const buttonClr = document.getElementById("button--clear");
const buttonDec = document.getElementById("button--dec");

const addTextNodeToInput = (textNode) => {
    inputElement.textContent += textNode;
};

const numberButton = document.querySelectorAll(".number");
const operatorButton = document.querySelectorAll(".operator");
const buttons = document.querySelectorAll(".button");

//defining variables
let variable1 = "";
let variable2 = "";
let variable3 = "";
let operator = "";

numberButton.forEach((button) => {
    button.addEventListener("click", () => {
        if (operator === "") {
            variable1 += button.value;
        } else {
            variable2 += button.value;
        }
    });
});
let variable4 = variable1 + operator + variable2;

operatorButton.forEach((button) => {
    button.addEventListener("click", () => {
        if (variable2) {
            variable1 = variable1 + operator + variable2;
            operator = variable2 = "";
        }
        if (operator === "") {
            operator = button.value;
        }
    });
});

buttonDec.addEventListener("click", () => {
    if (operator == "" && !variable1.includes(".")) {
        variable1 += buttonDec.value;
        document.getElementById("input").innerHTML =
            variable1 + operator + variable2;
    } else if (operator !== "" && !variable2.includes(".")) {
        variable2 += buttonDec.value;
        document.getElementById("input").innerHTML =
            variable1 + operator + variable2;
    } else {
        document.getElementById("input").innerHTML =
            variable1 + operator + variable2;
    }
});

//function that toggles operator from + to - to * to / to + when clicked

//enacting the operator toggling function and refreshing the display

const calculateFunction = (a, b, o) => {
    switch (o) {
        case "-":
            return parseFloat(a) - parseFloat(b);
            break;
        case "+":
            return parseFloat(a) + parseFloat(b);
            break;
        case "*":
            return parseFloat(a) * parseFloat(b);
            break;
        case "/":
            return a / b;
    }
};

buttonEquals.addEventListener("click", () => {
    let variable3 = calculateFunction(variable1, variable2, operator);
    if (variable2 !== "") {
        document.getElementById("input").innerHTML = variable3;
        variable1 = "";
        variable1 += variable3;
        //if variable2 exists, print variable3.
    }
    variable2 = operator = variable3 = "";
    //clearing all variables except variable1
});

buttonClr.addEventListener("click", () => {
    variable1 = variable2 = variable3 = operator = "";
    document.getElementById("input").innerHTML = "";
    //clears all output and unassigns all variables
});

buttonBsp.addEventListener("click", () => {
    if (operator === "") {
        variable1 = variable1.substring(0, variable1.length - 1);
        //backspacing variable1 if no operator (and therefore no variable2)
    } else if (variable2 === "") {
        operator = "";
        //removing operator if backspacing while operator exists but no variable2
    } else {
        variable2 = variable2.substring(0, variable2.length - 1);
        //backspacing variable2 if variable2 exists
    }
});

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        document.getElementById("input").innerHTML =
            variable1 + operator + variable2;
    });
});
//refreshes display every time any button EXCEPT decimal button is clicked.

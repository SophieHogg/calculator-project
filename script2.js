const buttonBsp = document.getElementById("button--bsp");
const inputElement = document.getElementById("button--result");
const buttonEquals = document.getElementById("button--equals");
const buttonClr = document.getElementById("button--clear");
const buttonDec = document.getElementById("button--dec");
const buttonToggle = document.getElementById("button--toggle");

const numberButton = document.querySelectorAll(".number");
const operatorButton = document.querySelectorAll(".operator");
const buttons = document.querySelectorAll(".button");
//defines all buttons in regards to the HTML

let exp = "";
//exp is the variable that displays in the inputElement

numberButton.forEach((button) => {
    button.addEventListener("click", () => {
        exp += button.value;
    });
});
//if a number button is pressed, the value (as defined in the HTML) is added to the end of the exp string

//Whenever an operator button is pressed, the character value of that button is added to the current string.
//These buttons do nothing if the last character of the current string is an operation or a decimal point.
operatorButton.forEach((button) => {
    button.addEventListener("click", () => {
        if (exp == "") {
            exp;
        } else {
            switch (exp.charAt(exp.length - 1)) {
                case "+":
                case "-":
                case "/":
                case "*":
                case ".":
                    break;
                default:
                    exp += button.value;
            }
        }
    });
});

//The decimal point button adds a decimal point to the current string.
//This button does nothing if last character of the current string is an operation or a decimal point.
buttonDec.addEventListener("click", () => {
    if (exp == "") {
        exp += ".";
    } else {
        for (let i = exp.length; i > 0; i--) {
            if (exp[i] == "/" || "*" || "+" || "-") {
                exp += ".";
                break;
            }

            if (exp[i] == ".") {
                break;
            }
        }
    }
    document.getElementById("input").innerHTML = exp;
});

//This function takes in an expression, as a string.
//It returns the value of the expression, as a string.
const calculateFunction = (string) => {
    let i = string.search(/[\+\-]/);
    if (i > -1) {
        string = calculateFunctionHelper(
            string.substr(0, i),
            string.charAt(i),
            string.substr(i + 1)
        );
    }

    i = string.search(/[\*\/]/);
    if (i > -1) {
        string = calculateFunctionHelper(
            string.substr(0, i),
            string.charAt(i),
            string.substr(i + 1)
        );
    }

    return string;
};

//The calculateFunction helper takes in an expression (string), an operator (char) and another expresson (string).
//The function returns the value of the two expressions with the relevant operator applied to them.
//The value is returned as a string.
const calculateFunctionHelper = (a, o, b) => {
    switch (o) {
        case "*":
            return (
                "" +
                parseFloat(calculateFunction(a)) *
                    parseFloat(calculateFunction(b))
            );
        case "/":
            if (b == 0) {
                return "ERROR!";
            } else {
                return (
                    "" +
                    parseFloat(calculateFunction(a)) /
                        parseFloat(calculateFunction(b))
                );
            }
        case "+":
            return (
                "" +
                (parseFloat(calculateFunction(a)) +
                    parseFloat(calculateFunction(b)))
            );
        case "-":
            return (
                "" +
                (parseFloat(calculateFunction(a)) -
                    parseFloat(calculateFunction(b)))
            );
        default:
            return "";
    }
};

buttonEquals.addEventListener("click", () => {
    switch (exp.charAt(exp.length - 1)) {
        case "+":
        case "-":
        case "/":
        case "*":
        case ".":
            break;
        default:
            exp = calculateFunction(exp);
    }
});
//the equals button calculates the function. If the most recent button is a decimal or any of the operators, it breaks (i.e. does nothing)

buttonClr.addEventListener("click", () => {
    exp = "";
    //clears exp variable. display refreshes on click anyway
});

buttonBsp.addEventListener("click", () => {
    exp = exp.substring(0, exp.length - 1);
});
//removes last digit from exp, display refreshes on click

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        document.getElementById("input").innerHTML = exp;
    });
});
//refreshes display every time any button EXCEPT decimal button is clicked.

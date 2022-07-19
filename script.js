const buttonBsp = document.getElementById("button--bsp");
const inputElement = document.getElementById("button--result");
const buttonEquals = document.getElementById("button--equals");
const buttonClr = document.getElementById("button--clear");
const buttonDec = document.getElementById("button--dec");
const buttonNegMinus = document.getElementById("button--negNumber");

const numberButton = document.querySelectorAll(".number");
const operatorButton = document.querySelectorAll(".operator");
const buttons = document.querySelectorAll(".button");

let exp = "";

numberButton.forEach((button) => {
    button.addEventListener("click", () => {
        exp += button.value;
    });
});

buttonNegMinus.addEventListener("click", () => {
    if (exp === "") {
        exp += "-";
    } else {
        switch (exp[exp.length - 1]) {
            case "/":
            case "*":
            case "+":
                exp += "-";
                break;
            default:
                break;
        }
    }
});

operatorButton.forEach((button) => {
    button.addEventListener("click", () => {
        if (exp === "") {
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

buttonDec.addEventListener("click", () => {
    let decAllowed = true;
    let variableStartReached = false;
    let lengthIterator = exp.length;
    while (
        decAllowed === true &&
        variableStartReached === false &&
        lengthIterator >= 0
    ) {
        switch (exp[lengthIterator--]) {
            case "+":
            case "-":
            case "/":
            case "*":
                variableStartReached = true; //
                break;
            case ".":
                decAllowed = false;
                break;
            default:
                break;
        }
    }
    if (decAllowed) {
        exp += ".";
    }
    document.getElementById("input").innerHTML = exp;
});

const calculate = (string) => {
    i = string.search(/[\*\/]/);
    if (i > 0) {
        string = calculateHelper(
            string.substr(0, i),
            string.charAt(i),
            string.substr(i + 1)
        );
    }

    i = string.search(/[\+\-]/);
    if (i === 0) {
        i = string.substr(1).search(/[\+\-]/) + 1;
    }
    if (i > 0) {
        string = calculateHelper(
            string.substr(0, i),
            string[i],
            string.substr(i + 1)
        );
    }
    if (i === 0) {
        i = string.substr(i + 1).search(/[\*\/]/) + 1;
    }
    return string;
};

const calculateHelper = (a, o, b) => {
    switch (o) {
        case "*":
            return "" + parseFloat(calculate(a)) * parseFloat(calculate(b));
        case "/":
            if (b == 0) {
                return "ERROR!";
            } else {
                return "" + parseFloat(calculate(a)) / parseFloat(calculate(b));
            }
        case "+":
            return "" + (parseFloat(calculate(a)) + parseFloat(calculate(b)));
        case "-":
            return "" + (parseFloat(calculate(a)) - parseFloat(calculate(b)));
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
            exp = calculate(exp);
    }
});

buttonClr.addEventListener("click", () => {
    exp = "";
});

buttonBsp.addEventListener("click", () => {
    exp = exp.substring(0, exp.length - 1);
});

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        document.getElementById("input").innerHTML = exp;
    });
});

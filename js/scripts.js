const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button")

class Calculator {
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText;
        this.currentOperationText = currentOperationText;
        this.currentOperation = "";
    }

    // Adiciona dígito à tela da calculadora
    addDigit(digit) {
        // Checa se a operação atual já tem um ponto
        if(digit === "." && this.currentOperationText.innerText.includes(".")) {
            return;
        }            

        this.currentOperation = digit;
        this.updateScreen();
    }

    // Muda os valores da tela da calculadora
    updateScreen() {
        this.currentOperationText.innerText += this.currentOperation;
    }
}

const calc = new Calculator(previousOperationText, currentOperationText);

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;

        if(+value >= 0 || value === ".") {
            calc.addDigit(value);
        } else {
            console.log("Op: " +value);
        }
    })
})
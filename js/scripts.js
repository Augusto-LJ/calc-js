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

    // Processa as operações da calculadora
    processOperation(operation) {
        // Pega o valor atual e o valor anterior
        let operationValue;
        const previous = +this.previousOperationText.innerText.split(" ")[0];
        const current = +this.currentOperationText.innerText;

        switch(operation) {
            case "+":
                operationValue = previous + current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "-":
                operationValue = previous - current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "/":
                operationValue = previous / current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "*":
                operationValue = previous * current;
                this.updateScreen(operationValue, operation, current, previous);
                            break;
            default:
                return;
        }
    }

    // Muda os valores da tela da calculadora
    updateScreen(
        operationValue = null,
        operation = null,
        current = null,
        previous = null
        ) {
            console.log(operationValue, operation, current, previous);
            if(operationValue === null){
                this.currentOperationText.innerText += this.currentOperation;
            } else {
                // Checa se o valor é zero. Se for, adiciona o valor atual
                if(previous === 0){
                    operationValue = current;
                }

                // Adiciona o valor atual ao anterior
                this.previousOperationText.innerText = `${operationValue} ${operation}`;
                this.currentOperationText.innerText = "";
            }
    }
}

const calc = new Calculator(previousOperationText, currentOperationText);

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;

        if(+value >= 0 || value === ".") {
            calc.addDigit(value);
        } else {
            calc.processOperation(value);
        }
    })
})
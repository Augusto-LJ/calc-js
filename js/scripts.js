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
        // Checa se o valor atual está vazio
        if(currentOperationText.innerText === "" && operation !== "C") {
            // Muda a operação
            if(this.previousOperationText.innerText !== "") {
                this.changeOperation(operation);
            }
            return;
        }

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
            case "DEL":
                this.processDelOperator();
                break;
            case "CE":
                this.processClearCurrentOperation();
                break;
            case "C": 
                this.processClearCurrentOperation();
                this.processClearPreviousOperation();
                break;
            case "=":
                this.processEqualOperator();
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

    // Altera a operação matemática
    changeOperation(operation){
        const MathOperations = ["*", "/", "+", "-"]

        if(!MathOperations.includes(operation)){
            return;
        }

        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation;
    }

    // Deleta o último dígito
    processDelOperator() {
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1);
    }

    // Limpa a operação atual
    processClearCurrentOperation() {
        this.currentOperationText.innerText = "";
    }

    // Limpa a operação anterior
    processClearPreviousOperation() {
        this.previousOperationText.innerText = "";
    }

    // Retorna o resultado da operação
    processEqualOperator() {
        const operation = previousOperationText.innerText.split(" ")[1];
        this.processOperation(operation);
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
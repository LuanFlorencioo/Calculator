const calc = {
    equation: '',
    addValue(value) {
        this.equation += value
        return console.log(this.equation)
    },
    getLastValue() {
        const lastValue = this.equation.at(-1);
        return lastValue;
    },
    removeLastValue() {
        this.equation = this.equation.slice(0, -1)
        this.modifyScreen();
        return console.log(this.equation)
    },
    cleanEquation() {
        this.equation = '';
        this.modifyScreen();
        return console.log(this.equation)
    },
    calculateEquation() {
        try {
            const result = eval(this.equation);
            if (isNaN(result) || !isFinite(result))
                this.equation = '0'
            else
                this.equation = `${result}`

            this.modifyScreen();
            return console.log(this.equation)
        }
        catch {
            alert('Ops! Parece que a sua operação está incorreta. Verifique novamente. Talvez seja um operador ou algum número fora de lugar.')
        }
    },
    modifyScreen() {
        const screen = document.querySelector('.screen-result');
        screen.innerText = this.equation;
    }
};

{

    const insertValueClick = ({ target }) => {
        const key = target.classList[2];
        const lastValue = calc.getLastValue();

        if (lastValue) {
            if (isNaN(+lastValue) && isNaN(+key)) {
                console.error("Erro202: Já foi inserido outro operador matemático");
            }
            else {
                calc.addValue(key);
                calc.modifyScreen();

            }
        }
        else {
            if (key == '-' || !isNaN(+key)) {
                calc.addValue(key)
                calc.modifyScreen();

            }
            else {
                console.error('Erro101: Primeiro você deve inserir um número')
            }
        }
    }

    const getAllKeys = Array.from(document.querySelectorAll('button'));
    getAllKeys.forEach(keyButton => {
        switch (keyButton.classList[0]) {
            case 'value':
                keyButton.addEventListener('click', insertValueClick);
                break;

            case 'delete':
                keyButton.addEventListener('click', () => calc.removeLastValue());
                break;

            case 'reset':
                keyButton.addEventListener('click', () => calc.cleanEquation());
                break;

            case 'equal':
                keyButton.addEventListener('click', () => calc.calculateEquation());
                break;

            default:
                break;
        }
    })
}
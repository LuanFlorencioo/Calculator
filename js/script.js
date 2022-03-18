const calc = {
    equation: '',
    addValue(value) {
        this.equation += value;
        this.changeResultScreen();
        document.querySelector('.calc-screen').scroll(300, 0)
    },
    changeResultScreen() {
        const screen = document.querySelector('.screen-result');
        screen.innerText = this.equation;
    },
    valueVerification(value) {
        const key = value;
        const lastValue = calc.getLastValue();

        if (lastValue) {
            if (isNaN(+lastValue) && isNaN(+key))
                calc.errorMessage("Ops! Não pode haver dois operadores juntos. Verifique os valores novamente.");

            else
                calc.addValue(key);
        }
        else {
            if (key == '-' || !isNaN(+key))
                calc.addValue(key);

            else
                calc.errorMessage('Para começar, você deve iniciar inserindo um número ou o valor de menos(-).');
        }
    },
    getLastValue() {
        const lastValue = this.equation.at(-1);
        return lastValue;
    },
    removeLastValue() {
        this.equation = this.equation.slice(0, -1);
        this.changeResultScreen();
    },
    resetEquation() {
        /* atribuir equation.setValue(new value) */
        this.equation = '';
        this.changeResultScreen();
    },
    errorMessage(errorAlert) {
        const modal = document.querySelector('.modalIn');
        modal.querySelector('p').innerText = errorAlert;

        if (!modal.classList.contains('active')) {
            modal.classList.toggle('active');
            setTimeout(() => {
                modal.classList.replace('modalIn', 'modalOut')
            }, 4000);
            setTimeout(() => {
                modal.classList.toggle('active')
                modal.classList.replace('modalOut', 'modalIn')
            }, 5000);
        }
    },
    calculateEquation() {
        try {
            const resultEquation = eval(this.equation);
            if (this.equation == '0/0')
                calc.errorMessage('Zero dividido por zero??? HaHaHa você só pode está brincando comigo.');

            if (isNaN(resultEquation) || !isFinite(resultEquation))
                this.equation = '0';
            else
                this.equation = `${resultEquation}`;

            this.changeResultScreen();
            document.querySelector('.calc-screen').scroll(0, 0)
        }
        catch {
            calc.errorMessage('Ops! Parece que a sua operação está incorreta. Verifique novamente. Talvez seja um operador ou algum número fora de lugar.')
            console.warn(errorAlert);
        }
    }
}


window.addEventListener('keyup', (e) => insertValueClick(e));
const insertValueClick = (e) => {
    if (e.type == 'keyup') {
        const key = e.key;
        if (!isNaN(+key) || key == '/' || key == '*' || key == '-' || key == '+' || key == '.')
            calc.valueVerification(key)
        else if (key == 'Backspace')
            calc.removeLastValue();
        else if (key == 'Enter')
            calc.calculateEquation();
    }
    else {
        const key = e.target.classList[2];
        calc.valueVerification(key)
    }
}

const getAllKeys = Array.from(document.querySelectorAll('button'));
getAllKeys.forEach(keyButton => {
    switch (keyButton.classList[0]) {
        case 'value':
            keyButton.addEventListener('click', (e) => insertValueClick(e));
            break;

        case 'delete':
            keyButton.addEventListener('click', () => calc.removeLastValue());
            break;

        case 'reset':
            keyButton.addEventListener('click', () => calc.resetEquation());
            break;

        case 'equal':
            keyButton.addEventListener('click', () => calc.calculateEquation());
            break;

        default:
            break;
    };
});

const toggleButton = document.querySelector('.toggle');
toggleButton.addEventListener('click', () => themeToggle.changeNextTheme());
const themeToggle = {
    changeNextTheme() {
        document.body.classList.replace(`${this.getCurrentTheme()}`, `${this.getNextTheme()}`)
    },
    getCurrentTheme() {
        const currentTheme = document.body.className.split('-')[1];
        return `theme-${currentTheme}`
    },
    getNextTheme() {
        const nextTheme = this.getCurrentTheme().split('-')[1];
        if (+(nextTheme) + 1 == 4) {
            return `theme-1`
        } else {
            return `theme-${+(nextTheme) + 1}`
        }
    }
}
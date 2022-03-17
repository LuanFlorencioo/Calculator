const calc = {
    equation: '',
    addValue(value) {
        this.equation += value;

        this.changeResultScreen();
        document.querySelector('.calc-screen').scroll(300, 0)
        return console.log(this.equation)
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
        this.equation = this.equation.slice(0, -1)
        this.changeResultScreen();
        return console.log(this.equation)
    },
    resetEquation() {
        this.equation = '';
        this.changeResultScreen();
        return console.log(this.equation)
    },
    errorMessage(errorAlert) {
        if (!(document.querySelector('main.calc').contains(document.querySelector('.modal')))) {
            const modalElement = document.createElement('div');
            modalElement.classList.add('modal');
            const imageElement = document.createElement('img');
            imageElement.setAttribute('src', './../images/icon-circle.png')
            modalElement.appendChild(imageElement)
            const phraseElement = document.createElement('p');
            phraseElement.innerText = errorAlert;
            modalElement.appendChild(phraseElement)
            document.querySelector('main.calc').appendChild(modalElement)

            setTimeout(() => {
                document.querySelector('main.calc div.modal').classList.add('out')
            }, 4000)

            setTimeout(() => {
                document.querySelector('main.calc').removeChild(modalElement)
            }, 5000)
        }

    },
    calculateEquation() {
        try {
            if (this.equation == '0/0')
                calc.errorMessage('Zero dividido por zero??? HaHaHa você só pode está brincando comigo.')
            const resultEquation = eval(this.equation);
            if (isNaN(resultEquation) || !isFinite(resultEquation))
                this.equation = '0'
            else
                this.equation = `${resultEquation}`

            this.changeResultScreen();
            document.querySelector('.calc-screen').scroll(0, 0)
            return console.log(this.equation)
        }
        catch {
            calc.errorMessage('Ops! Parece que a sua operação está incorreta. Verifique novamente. Talvez seja um operador ou algum número fora de lugar.')
            console.warn(errorAlert);
        }
    }
}

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

window.addEventListener('keyup', (e) => insertValueClick(e));

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

const themeToggle = {
    getCurrentTheme() {
        const currentTheme = document.body.className.split('-')[1];
        return console.log(currentTheme)
    }
}

document.querySelector('.toggle').addEventListener('click', () => themeToggle.getCurrentTheme())
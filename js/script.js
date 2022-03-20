const calc = {
    equation: '',
    addValue(value) {
        calc.equation += value;
        calc.changeResultScreen();
        document.querySelector('.calc-screen').scroll(300, 0)
    },
    changeResultScreen() {
        const screen = document.querySelector('.screen-result');
        screen.innerText = calc.equation;
    },
    valueVerification(newValue) {
        const lastValue = calc.getLastValue();

        if (lastValue) {
            if (isNaN(+lastValue) && isNaN(+newValue))
                calc.errorMessage("Ops! Não pode haver dois operadores juntos. Verifique os valores novamente.");

            else
                calc.addValue(newValue);
        }
        else {
            if (newValue == '-' || !isNaN(+newValue))
                calc.addValue(newValue);

            else
                calc.errorMessage('Para começar, você deve iniciar inserindo um número ou o valor de menos(-).');
        }
    },
    getLastValue() {
        const lastValue = calc.equation.at(-1);
        return lastValue;
    },
    removeLastValue() {
        calc.equation = calc.equation.slice(0, -1);
        calc.changeResultScreen();
    },
    resetEquation() {
        calc.equation = '';
        calc.changeResultScreen();
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
            const resultEquation = eval(calc.equation);
            if (calc.equation == '0/0')
                calc.errorMessage('Zero dividido por zero??? HaHaHa você só pode está brincando comigo.');

            if (isNaN(resultEquation) || !isFinite(resultEquation))
                calc.equation = '0';
            else
                calc.equation = `${resultEquation}`;

            calc.changeResultScreen();
            document.querySelector('.calc-screen').scroll(0, 0)
        }
        catch {
            calc.errorMessage('Ops! Sua operação está incorreta. Verifique novamente. Talvez seja um operador ou algum número fora de lugar.')
            console.warn(errorAlert);
        }
    }
}

const body = document.body;
const currentTheme = window.getComputedStyle(body).backgroundColor;
if (currentTheme == 'rgb(58, 71, 100)')
    body.setAttribute('data-theme', '1');
else
    body.setAttribute('data-theme', '3');

const changeNextTheme = () => {
    const idCurrentTheme = body.dataset.theme;
    if (idCurrentTheme == '3')
        body.dataset.theme = '1';
    else
        body.dataset.theme = +(body.dataset.theme) + 1;
}

const toggle = document.querySelector('.toggle');
toggle.addEventListener('click', changeNextTheme);

window.addEventListener('keyup', (e) => insertValueClick(e));

const insertValueClick = (e) => {
    if (e.type == 'keyup') {
        const key = e.key;
        if (!isNaN(+key) || key == '/' || key == '*' || key == '-' || key == '+' || key == '.')
            calc.valueVerification(key);

        else if (key == 'Backspace')
            calc.removeLastValue();

        else if (key == 'Enter')
            calc.calculateEquation();
    }
    else {
        const key = e.target.classList[2];
        calc.valueVerification(key);
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
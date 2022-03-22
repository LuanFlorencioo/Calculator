const calc = {
    equation: '',

    valueVerification(newValue) {

        const getLastValue = () => {
            const lastValue = calc.equation.at(-1);
            return lastValue;
        };
        const isNumberTheLastValue = !isNaN(+getLastValue());
        const isNumberTheNewValue = !isNaN(+newValue);
        const isValueCorrect = (isNumberTheLastValue && isNumberTheNewValue) || (isNumberTheLastValue && !isNumberTheNewValue) || (!isNumberTheLastValue && isNumberTheNewValue);

        const addValue = (value) => {
            calc.equation += value;
            calc.changeResultScreen();
            document.querySelector('.calc-screen').scroll(300, 0);
        };

        if (getLastValue()) {
            (isValueCorrect) ? addValue(newValue) : calc.errorMessage("Oops! It is not possible to have two operators together. check the values again.");
        } else {
            (newValue == '-' || isNumberTheNewValue) ? addValue(newValue) : calc.errorMessage('First, you must start by entering a number or the value of minus (-).');
        };
    },

    errorMessage(errorAlert) {
        const modal = document.querySelector('.modalIn');
        const modalNotActivated = !modal.classList.contains('active');

        const showTheModal = () => {
            modal.querySelector('p').innerText = errorAlert;
            modal.classList.toggle('active');

            setTimeout(() => {
                modal.classList.replace('modalIn', 'modalOut')
            }, 4000);

            setTimeout(() => {
                modal.classList.toggle('active')
                modal.classList.replace('modalOut', 'modalIn')
            }, 5000);
        }

        (modalNotActivated) ?
            showTheModal() :
            console.warn("Wait a second! There is a modal explaining the error.");
    },

    changeResultScreen() {
        const screen = document.querySelector('.screen-result');
        screen.innerText = calc.equation;
    },

    removeLastValue() {
        calc.equation = calc.equation.slice(0, -1);
        calc.changeResultScreen();
    },

    resetEquation() {
        calc.equation = '';
        calc.changeResultScreen();
    },

    calculateEquation() {
        try {
            const finalResultEquation = eval(calc.equation);
            const isResultNumber = !isNaN(finalResultEquation);
            const isResultFinite = isFinite(finalResultEquation);

            if (calc.equation == '0/0')
                calc.errorMessage('Zero divided by zero??? HAHAHA you can only be kidding me');

            (isResultNumber || isResultFinite) ?
                calc.equation = `${finalResultEquation}` :
                calc.equation = '0';

            calc.changeResultScreen();
            document.querySelector('.calc-screen').scroll(0, 0)
        }
        catch {
            calc.errorMessage("Oops! Your operation is incorrect. Check again. Maybe it's an operator or some number out of place.")
        }
    }
}

const body = document.body;
const toggle = document.querySelector('.toggle');
const getAllButtons = Array.from(document.querySelectorAll('button'));
const systemColorCurrent = window.getComputedStyle(body).backgroundColor;
(systemColorCurrent == 'rgb(58, 71, 100)') ?
    body.setAttribute('data-theme', '1') :
    body.setAttribute('data-theme', '3');

const changeNextTheme = () => {
    const idCurrentTheme = body.dataset.theme;
    (idCurrentTheme == '3') ?
        body.dataset.theme = '1' :
        body.dataset.theme = +(body.dataset.theme) + 1;
}
toggle.addEventListener('click', changeNextTheme);


const insertValueClick = ({ type, key, target }) => {
    const handleKeyup = () => {
        const isNumberKey = () => {
            const numberKey = !isNaN(+key);
            if (numberKey)
                return key;
        }

        const isOperationKey = () => {
            const operationKey = (key === '+') ||
                (key === '-') ||
                (key === '*') ||
                (key === '/') ||
                (key === '.');
            if (operationKey)
                return key;
        };

        switch (key) {
            case isNumberKey():
                calc.valueVerification(key);
                break;

            case isOperationKey():
                calc.valueVerification(key);
                break;

            case 'Backspace':
                calc.removeLastValue();
                break;

            case 'Enter':
                calc.calculateEquation();
                break;

            case 'c':
                calc.resetEquation();
                break;

            default:
                break;
        }
    }

    const handleClick = () => {
        const valueClicked = target.classList[2];
        calc.valueVerification(valueClicked);
    }

    (type == 'keyup') ?
        handleKeyup() :
        handleClick();
};
window.addEventListener('keyup', (e) => insertValueClick(e));
getAllButtons.forEach(button => {

    const functionButton = button.classList[0];

    switch (functionButton) {
        case 'value':
            button.addEventListener('click', (e) => insertValueClick(e));
            break;

        case 'delete':
            button.addEventListener('click', () => calc.removeLastValue());
            break;

        case 'reset':
            button.addEventListener('click', () => calc.resetEquation());
            break;

        case 'equal':
            button.addEventListener('click', () => calc.calculateEquation());
            break;

        default:
            break;
    };
});
const getAllButtons = Array.from(document.querySelectorAll('button'));
getAllButtons.forEach(button => () => { button.preventDefault() })

let equacion = ''

const insertValue = (e) => {
    const lastValue = equacion[equacion.length - 1]

    if (+lastValue || lastValue === '0' || equacion === '' && e.target.classList[2] === '-') {
        equacion += e.target.classList[2]
        console.log(equacion)
    }
    else {
        if (e.target.classList[1] === 'number') {
            equacion += e.target.classList[2]
            console.log(equacion)
        }
        else {
            console.log('Não dá pra inserir dois sinais!')
        }
    }
}

const getValueButtons = Array.from(document.querySelectorAll('button.value'))
getValueButtons.forEach(button => button.addEventListener('click', insertValue))

const deleteValue = () => {
    const newValue = equacion.slice(0, equacion.length - 1);
    equacion = newValue
    console.log(equacion)
}

const getDeleteButton = document.querySelector('button.delete')
getDeleteButton.addEventListener('click', deleteValue)

const resetValue = () => {
    equacion = ''
    console.log('valor resetado!')
}

const getResetButton = document.querySelector('button.reset')
getResetButton.addEventListener('click', resetValue)

const equalValue = () => {
    const lastValue = equacion[equacion.length - 1];

    if (+lastValue || lastValue === '0') {

        const finalResult = eval(equacion);

        if (isNaN(finalResult) || !isFinite(finalResult)) {
            console.log('valor quebrado!')
        }
        else {
            const resultSplit = String(finalResult).split('.');

            if (resultSplit[1].length > 4) {
                equacion = `${resultSplit[0]}.${resultSplit[1].slice(0, 4)}`
            }
            else {
                equacion = `${finalResult}`
            }
            console.log(equacion)

        }
    }
    else {
        console.log('cálculo em falso!')
    }
}

const getEqualButton = document.querySelector('button.equal')
getEqualButton.addEventListener('click', equalValue)
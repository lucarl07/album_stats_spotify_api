/* LOGIN VALIDATION: */

// Button to perform the login:
const btnLogin = document.getElementById('btnLogin');

// Input fields:
let inEmail = document.getElementById('inEmail'),
inPassword = document.getElementById('inPassword');

// Other HTML elements:
const errorMessages = document.querySelectorAll('.error-msg')

btnLogin.addEventListener('click', () => {
    const email = inEmail.value,
    password = inPassword.value;

    if(isEmailValid(email) && isPasswordValid(password)) {
        errorMessages.forEach(msg => {
            msg.style.display = 'none';
        })

        window.location.href = './search-album.html';
    } else {
        if(!isEmailValid(email) && !isPasswordValid(password)) {
            allInputsInvalid(inEmail, inPassword, errorMessages)

            throw new Error('Credenciais inválidas, por favor verifique seu e-mail e senha.');
        } else if (!isEmailValid(email)) {
            oneInputInvalid(inPassword, inEmail, errorMessages, 1)

            throw new Error('E-mail inválido ou não existente em nosso banco de dados. Por favor, tente novamente.');
        } else {
            oneInputInvalid(inEmail, inPassword, errorMessages, 0)

            throw new Error('Senha inválida ou não existente em nosso banco de dados. Por favor, tente novamente.');
        }
    }
})

function isEmailValid(email) {
    const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

    if(email.match(regex)) {
        return true;
    } else {
        return false;
    }
}

function isPasswordValid(password) {
    /** IMPORTANT REMINDER:
     * Replace this with actual login validation.
     * Regex: /^[a-zA-Z0-9#_\-)]{8,}$/
     */

    if(password.length >= 8) {
        return true;
    } else {
        return false;
    }
}

function allInputsInvalid(inv01, inv02, msg) {
    msg.forEach(element => {
        element.style.display = 'initial';
    })

    inv01.style.border = '2px solid #c5221f';
    inv02.style.border = '2px solid #c5221f';
}

function oneInputInvalid(val, inv, msg, i) {
    msg.forEach(element => {
        element.style.display = 'initial';
    })
    msg[i].style.display = 'none';

    inv.style.border = '2px solid #c5221f';
    val.style.border = '1px solid #302b2c';
}

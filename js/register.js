/* ACCOUNT VALIDATION: */

// Function imports:
import { isEmailValid } from "./common.js";

// Input array:
const inputs = [
    document.querySelector('#inUsername'),
    document.querySelector('#inEmail'),
    document.querySelector('#inPassword'),
    document.querySelector('#confPassword')
];

// Other HTML arrays:
const errors = document.querySelectorAll('.error-msg');

// Strike event when #btnRegister is clicked
document.querySelector('#btnRegister').addEventListener('click', () => {
    const username = inputs[0].value,
    email = inputs[1].value, 
    password = inputs[2].value,
    repeatPassword = inputs[3].value;

    if (isUsernameValid(username) && isEmailValid(email) && isPasswordValid(password, username, email) && arePasswordsEqual(password, repeatPassword)) {
        errors.forEach(msg => {
            msg.style.display = 'none';
        })

        window.location.href = './search-album.html';
    } else {
        if (!isUsernameValid(username)) {
            invalidInput(errors, inputs, 0)
        } else {
            validInput(errors, inputs, 0)
        }

        if (!isEmailValid(email)) {
            invalidInput(errors, inputs, 1)
        } else {
            validInput(errors, inputs, 1)
        }

        if (!isPasswordValid(password, username, email)) {
            invalidInput(errors, inputs, 2)
        } else {
            validInput(errors, inputs, 2)
        }

        if (!arePasswordsEqual(password, repeatPassword)) {
            invalidInput(errors, inputs, 3)
        } else {
            validInput(errors, inputs, 3)
        }
    }
})

function isUsernameValid(name) {
    const invalidNames = /^(null|[0])+$/i

    if(name.length > 3 && !name.match(invalidNames)) {
        return true;
    } else {
        return false;
    }
}

function isPasswordValid(password, username, email) {
    const regex = /^(?=.*[A-Za-zÇç])(?=.*\d)(?=.*[!@#$%&*-_;])[A-Za-zÇç\d!@#$%&*-_;]{8,}/
    const invalidName = new RegExp(`^(${username}|${email})+$`, "i")

    if(password.match(regex) && !password.match(invalidName)) {
        return true;
    } else {
        return false;
    }
}

function arePasswordsEqual(password, confirm) {
    if(password === confirm) {
        return true;
    } else {
        return false;
    }
}

function invalidInput(msgArray, inArray, index) {
    msgArray[index].style.display = 'initial';
    inArray[index].style.border = '2px solid #c5221f';
}

function validInput(msgArray, inArray, index) {
    msgArray[index].style.display = 'none';
    inArray[index].style.border = '1px solid #302b2c';
}

// DEBUGGING:
// console.log(isUsernameValid("null"))
// console.log(isUsernameValid("olaaa0"))
// console.log(isPasswordValid("102ç@!@!", "johnDoe_101", "johndoe123@email.com"))]
console.log(inputs)
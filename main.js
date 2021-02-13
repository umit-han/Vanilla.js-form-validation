const form = document.getElementById('form');
const firstname = document.getElementById('firstname');
const lastname = document.getElementById('lastname');
const age = document.getElementById('age');
const email = document.getElementById('mail');
const cMail = document.getElementById('confirm-mail');
const phoneNumber = document.getElementById('phone-number');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');


//! Show input error message
function showError(input, massage) {
    const formControl = input;
    const feedback = input.nextElementSibling;
    formControl.className = 'form-control is-invalid';
    feedback.classList.remove("valid-feedback");
    feedback.className = 'feedback invalid-feedback';
    feedback.innerText = massage;
}

//! Show success message
function showSuccess(input) {
    const formControl = input;
    formControl.className = 'form-control is-valid'
    const feedback = input.nextElementSibling;
    feedback.className = 'feedback valid-feedback';
    feedback.innerText = "Looks good!";
}

//! Check required fields
function checkRequired(inputArr) {
    inputArr.forEach(function (input) {
        if (input.value.trim() === '') {
            showError(input, 'This field is required');
        } else {
            showSuccess(input);
        }
    });
}

//! Check age is valid
function checkAge(input) {
    if (isNaN(input.value)) {
        showError(input, 'Please enter number')
    } else if (input.value < 18 || input.value > 70) {
        showError(input, 'Your age must be between 18 and 70')
    } else {
        showSuccess(input);
    }
}

//! Check email is valid
function checkEmail(input) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'Email is not valid');
    }
}

//! Check phone is valid
function checkPhone(input) {
    var exp = /^\d{10}$/;

    if (!exp.test(input.value)) {
        showError(input, "Phone number must be ten digits");
    } else {
        showSuccess(input);
    }
}

//! Check input lenght
function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(
            input,
            `Must be at least ${min} characters`
        );
    } else if (input.value.length > max) {
        showError(
            input,
            `No more than ${max} characters`
        );
    } else {
        showSuccess(input);
    }
}

//! Check password match
function checkPasswordMatch(input1, input2) {
    if (input1.value !== input2.value) {
        showError(input2, 'Password do not match');
    }
}

//! Check email match
function checkMailMatch(input1, input2) {
    if (input1.value !== input2.value) {
        showError(input2, 'E-mail do not match');
    }
}

//! Event Listeners
form.addEventListener('submit', function (e) {
    e.preventDefault();

    checkRequired([firstname, lastname, age, mail, cMail, phoneNumber, password, confirmPassword]);
    checkLength(firstname, 3, 15);
    checkLength(lastname, 2, 15);
    checkLength(password, 6, 15);
    checkAge(age);
    checkEmail(mail);
    checkPhone(phoneNumber);
    checkPasswordMatch(password, confirmPassword);
    checkMailMatch(mail, cMail);
});
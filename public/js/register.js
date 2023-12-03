let alertBoxTimer;
function showAlertBox(msg) {
    const alertBox = document.getElementById('alertBox');
    alertBox.textContent = msg;
    alertBox.style.top = '3%'
    if (alertBoxTimer) {
        clearInterval(alertBoxTimer);
    }
    alertBoxTimer = setInterval(() => {
        alertBox.style.top = '-50%';
        clearInterval(alertBoxTimer)
    }, 3000);
}

let alertBoxErrorTimer;
function showAlertErrorBox(msg) {
    const alertBox = document.getElementById('alertBoxError');
    alertBox.textContent = msg;
    alertBox.style.top = '3%'
    if (alertBoxErrorTimer) {
        clearInterval(alertBoxErrorTimer);
    }
    alertBoxErrorTimer = setInterval(() => {
        alertBox.style.top = '-50%';
        clearInterval(alertBoxErrorTimer)
    }, 3000);
}

const form = document.getElementById('registerForm');
const registerBtn = document.getElementById('registerBtn');
const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const firstName = document.getElementById('firstName')
const lastName = document.getElementById('lastName')
const email = document.getElementById('email');
const username = document.getElementById('username');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');

form.addEventListener('submit', (e) => {
    let valid = true;
    if (firstName.value == '') {
        showAlertBoxRegister('Invalid First Name');
        valid = false;
    }
    else if (lastName.value == '') {
        showAlertBoxRegister('Invalid Last Name');
        valid = false;
    }
    else if (email.value == '') {
        showAlertBoxRegister('Invalid Email');
        valid = false;
    }
    else if (username.value == '') {
        showAlertBoxRegister('Invalid Username');
        valid = false;
    }
    else if (password.value == '') {
        showAlertBoxRegister('Password should be atleast 8 characters long');
        valid = false;
    }
    else if (confirmPassword.value === '' || confirmPassword.value !== password.value) {
        showAlertBoxRegister('Passwords do not match');
        valid = false; 
    }
    if (!valid) {
        e.preventDefault();
        // e.stopPropagation();
    }
    console.log('Register');
});
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

const form = document.getElementById('loginForm');
const loginBtn = document.getElementById('login');

const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

form.addEventListener('submit', (e) => {
    let valid = true;
    if (emailInput.value === '' || !emailInput.value.includes('@')) {
        showAlertBoxLogin('Invalid email');
        valid = false;
    }
    else if (password === '' || passwordInput.value.length < 8) {
            showAlertBoxLogin('Password should be atleast 8 characters long');
            valid = false;
    }
    else if (!valid) {
        e.preventDefault();
    }
});

const showPasswordBtn = document.getElementById('showPasswordBtn');
const showHideIcon = document.querySelector('.show-hide-icon');

showPasswordBtn.addEventListener('click', () => {
    if(showHideIcon.textContent == 'visibility_off') {
        showHideIcon.textContent = 'visibility';
        passwordInput.type = 'text';
    }
    else {
        showHideIcon.textContent = 'visibility_off';
        passwordInput.type = 'password';
    }
})
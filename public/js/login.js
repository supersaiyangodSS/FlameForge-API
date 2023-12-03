let alertBoxTimer;
function showAlertBoxLogin(msg) {
    const alertBox = document.getElementById('alertBoxLogin');
    alertBox.textContent = msg;
    alertBox.style.top = '3%'
    if (alertBoxTimer) {
        clearInterval(alertBoxTimer);
    }
    alertBoxTimer= setInterval(() => {
        alertBox.style.top = '-50%';
        clearInterval(alertBoxTimer)
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


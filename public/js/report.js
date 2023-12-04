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

const iname = document.getElementById('name');
const email = document.getElementById('email');
const errorUrl = document.getElementById('errorUrl');
const message = document.getElementById('message');
const reportForm = document.getElementById('reportForm');

reportForm.addEventListener('submit', (e) => {
    let valid = true;
    if (email.value === '' || !email.value.includes('@')) {
        showAlertErrorBox('Invalid Email!');
        valid = false;
    }
    else if (iname.value === '') {
        showAlertErrorBox('Invalid Name!');
        valid = false;
    }
    else if (errorUrl.value === '') {
        showAlertErrorBox('Invalid URL!');
        valid = false;
    }
    else if (message.value === '') {
        showAlertErrorBox('Invalid Message!');
        valid = false;
    }
    else if (!valid) {
        e.preventDefault();
    }
});

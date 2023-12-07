let alertBoxTimer = null;
let alertBoxErrorTimer = null;

function showAlertBox(msg) {
    const alertBox = document.getElementById('alertBox');
    alertBox.textContent = msg;
    alertBox.style.top = '3%';

    if (alertBoxTimer) {
        clearInterval(alertBoxTimer);
    }
    alertBoxTimer = setInterval(() => {
        alertBox.style.top = '-50%';
    }, 3000);
}

function showAlertErrorBox(msg) {
    const alertBox = document.getElementById('alertBoxError');
    alertBox.textContent = msg;
    alertBox.style.top = '3%'
    if (alertBoxErrorTimer) {
        clearInterval(alertBoxErrorTimer);
    }
    alertBoxErrorTimer = setInterval(() => {
        alertBox.style.top = '-50%';
    }, 3000);
}

function hideLoader() {
    const loader = document.getElementById('loader');
    loader.style.display = 'none';
}

window.addEventListener('load', hideLoader);

const saveBtn = document.getElementById('save');
const confirmSave = document.getElementById('confirmSave');

confirmSave.addEventListener('input', () => {
    if (confirmSave.value === 'GENSHIN') {
        saveBtn.classList.remove('disable-save-btn')
    }
    else {
        saveBtn.classList.add('disable-save-btn')
    }
});

if (confirmSave.value === 'GENSHIN') {
    saveBtn.classList.remove('disable-save-btn');
}
else {
    saveBtn.classList.add('disable-save-btn');
}
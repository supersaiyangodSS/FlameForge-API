let alertBoxTimer = null;
function showAlertBox(msg) {
    const alertBox = document.getElementById('alertBox');
    alertBox.textContent = msg;
    alertBox.style.top = '3%';

    if (alertBoxTimer) {
        clearInterval(alertBoxTimer);
    }
    alertBoxTimer= setInterval(() => {
        alertBox.style.top = '-50%';
    }, 3000);
}
function hideLoader() {
    const loader = document.getElementById('loader');
    loader.style.display = 'none';
}

window.addEventListener('load', hideLoader);
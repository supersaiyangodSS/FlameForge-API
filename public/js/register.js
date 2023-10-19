function showAlertBoxRegister(msg) {
    const alertBox = document.getElementById('alertBoxRegister');
    alertBox.textContent = msg;
    alertBox.style.top = '3%'
    setTimeout(() => {
        alertBox.style.top = '-50%'
    }, 3000);
}
showAlertBoxRegister('SSJ2')
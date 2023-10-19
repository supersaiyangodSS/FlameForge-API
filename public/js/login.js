
function showAlertBoxLogin(msg) {
    const alertBox = document.getElementById('alertBoxLogin');
    alertBox.textContent = msg;
    alertBox.style.top = '3%'
    setTimeout(() => {
        alertBox.style.top = '-50%'
    }, 3000);
}
showAlertBoxLogin('SSJ3')
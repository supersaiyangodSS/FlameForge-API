let alertBoxTimer = null;
function showAlertBoxRegister(msg) {
    const alertBox = document.getElementById('alertBoxRegister');
    alertBox.textContent = msg;
    alertBox.style.top = '3%';

    if (alertBoxTimer) {
        clearInterval(alertBoxTimer);
    }
    alertBoxTimer= setInterval(() => {
        alertBox.style.top = '-50%';
    }, 3000);
}

const saveBtn = document.getElementById('save');
const confirmSave = document.getElementById('confirmSave');

confirmSave.addEventListener('input', () => {
    if(confirmSave.value === 'GENSHIN') {
        saveBtn.classList.remove('disable-save-btn')
    }
    else {
        saveBtn.classList.add('disable-save-btn')
    }
});

const characterName = document.getElementById('name');
const birthDay = document.getElementById('birthday');
const versionRelease = document.getElementById('vr');
const model = document.getElementById('model');

const fiveStar = document.getElementsByName('rarity');

const desc = document.getElementById('desc');
const vision = document.getElementsByName('vision');
const weapon = document.getElementsByName('weapon')
// const region = document.getElementsByName('region')

const linkProfile = document.getElementById('imgProfile');
const linkCard = document.getElementById('imgCard');
const linkGacha = document.getElementById('imgGacha');

const title = document.getElementById('title');
const wikiUrl = document.getElementById('wikiUrl');
const constellation = document.getElementById('constellation');
const affiliation = document.getElementById('affiliation');

let visions = document.querySelectorAll('input[type="vision"]');
let visionSelected = false;
visions.forEach((vision) => {
    if (vision.checked) {
        visionSelected = true;
        return
    }
})

saveBtn.addEventListener('click', () => {
    let valid = true;
    if (characterName.value == '') {
        showAlertBoxRegister('Invalid Name');
        valid = false;
    }
    else if (birthDay.value == '') {
        showAlertBoxRegister('Invalid BirthDay');
        valid = false;
    }
    else if (versionRelease.value == '') {
        showAlertBoxRegister('Invalid Version Release')
        valid = false;
    }
    else if (model.value == '') {
        showAlertBoxRegister('Invalid Model')
        valid = false;
    }
    else if (linkProfile.value == '') {
        showAlertBoxRegister('Invalid Profile Picture Link')
        valid = false;
    }
    else if (linkCard.value == '') {
        showAlertBoxRegister('Invalid Card Picture Link')
        valid = false;
    }
    else if (linkGacha.value == '') {
        showAlertBoxRegister('Invalid Gacha Art Link')
        valid = false;
    }
    else if (constellation.value == '') {
        showAlertBoxRegister('Invalid Constellation')
        valid = false;
    }
    else if (visionSelected === false) {
        showAlertBoxRegister('Invalid Vision')
        valid = false;
    }
    else if (affiliation.value == '') {
        showAlertBoxRegister('Invalid Affiliations')
        valid = false;
    }
    else if (wikiUrl.value == '') {
        showAlertBoxRegister('Invalid Wiki Link')
        valid = false;
    }
})
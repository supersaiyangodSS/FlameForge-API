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

const weaponName = document.getElementById('name');
const desc = document.getElementById('desc');
const source = document.getElementById('source');
const baseAtk = document.getElementById('baseAtk');
const subStatType = document.getElementById('subStatType');
const baseSubStat = document.getElementById('baseSubStat');
const affix = document.getElementById('affix');
const passive = document.getElementById('passive');
const vr = document.getElementById('vr');
const icon = document.getElementById('icon');
const original = document.getElementById('original');
const awakened = document.getElementById('awakened');
const gacha = document.getElementById('gacha');
const wikiUrl = document.getElementById('wikiUrl');


let famalies = document.querySelectorAll('input[name="family"]');
let familySelected = false;
famalies.forEach((item) => {
    if (item.checked) {
        familySelected = true;
        return
    }
});

let rarity = document.querySelectorAll('input[name="rarity"]');
let raritySelected = false;
rarity.forEach((item) => {
    if (item.checked) {
        raritySelected = true;
        return
    }
});

let regions = document.querySelectorAll('input[name="region"]');
let regionSelected = false;
regions.forEach((item) => {
    if (item.checked) {
        regionSelected = true;
        return
    }
});

saveBtn.addEventListener('click', (event) => {
    let valid = true;
    if (weaponName.value == '') {
        showAlertBox('Invalid Name');
        valid = false;
    }
    else if (desc.value == '') {
        showAlertBox('Invalid Description')
        valid = false;
    }
    else if (source.value == '') {
        showAlertBox('Invalid Source');
        valid = false;
    }
    else if (baseAtk.value == '') {
        showAlertBox('Invalid Base Attack');
        valid = false;
    }
    else if (subStatType.value == '') {
        showAlertBox('Invalid Sub Stat Type');
        valid = false;
    }
    else if (baseSubStat.value == '') {
        showAlertBox('Invalid Sub Stat Value');
        valid = false;
    }
    else if (affix.value == '') {
        showAlertBox('Invalid Affix');
        valid = false;
    }
    else if (passive.value == '') {
        showAlertBox('Invalid Passive');
        valid = false;
    }
    else if (vr.value == '') {
        showAlertBox('Invalid Version Release');
        valid = false;
    }
    else if (icon.value == '') {
        showAlertBox('Invalid Icon Link');
        valid = false;
    }
    else if (original.value == '') {
        showAlertBox('Invalid Image Link');
        valid = false;
    }
    else if (awakened.value == '') {
        showAlertBox('Invalid Awakened Image Link');
        valid = false;
    }
    else if (gacha.value == '') {
        showAlertBox('Invalid Gacha Art Link');
        valid = false;
    }
    else if (wikiUrl.value == '') {
        showAlertBox('Invalid Wiki URL');
        valid = false;
    }
    else if (!familySelected) {
        showAlertBox('Invalid Family Selection');
        valid = false;
    }
    else if (!raritySelected) {
        showAlertBox('Invalid Rarity Selected');
        console.log(raritySelected);
        valid = false;
    }
    else if (!regionSelected) {
        showAlertBox('Invalid Region Selected');
        valid = false;
    }
    if (!valid) {
        event.preventDefault();
    }
})

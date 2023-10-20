const characters = document.getElementById('nav-1');
const weapons = document.getElementById('nav-2');
const artifacts = document.getElementById('nav-3');
const home = document.getElementById('nav-0');
const people = document.getElementById('nav-4');
const settings = document.getElementById('nav-5');

const contentData = document.getElementById('content-data');
const heading = document.getElementById('heading');

const homeContent = document.getElementById('content-0');
const charactersContent = document.getElementById('content-1');
const weaponsContent = document.getElementById('content-2');
const artifactsContent = document.getElementById('content-3');
const poepleContent = document.getElementById('content-4');
const settingsContent = document.getElementById('content-5');

function showTitle(title) {
    heading.innerText = title;
}

const characterTitle = characters.innerText;
const weaponsTitle = weapons.innerText;
const artifcatsTitle = artifacts.innerText;
const peopleTitle = 'People'
const settingsTitle = 'Settings'

showTitle(characterTitle)

function loadDefaults() {
    // characters.classList.add('light-gray')
    showTitle('');
    charactersContent.style.display = 'none';
    weaponsContent.style.display = 'none';
    artifactsContent.style.display = 'none'
    poepleContent.style.display = 'none';
    settingsContent.style.display = 'none';
    homeContent.style.display = 'block';
}
loadDefaults();

function toggleActive(navOrder) {
    for (let i = 1; i <= 4; i++) {
        document.getElementById(`nav-${i}`).classList.remove('light-gray');
    }
    document.getElementById(`nav-${navOrder}`).classList.add('light-gray');
}

function toggleContent(contentOrder) {
    for (let i = 0; i <= 5; i++) {
        document.getElementById(`content-${i}`).style.display = 'none';
    }
    document.getElementById(`content-${contentOrder}`).style.display = 'block';
}

home.addEventListener('click', () => {
    toggleContent(0);
    showTitle('');
})

characters.addEventListener('click', () => {
    toggleContent(1);
    toggleActive(1)
    showTitle(characterTitle)
});

weapons.addEventListener('click', () => {
    toggleContent(2);
    toggleActive(2)
    showTitle(weaponsTitle)
});

artifacts.addEventListener('click', () => {
    toggleContent(3);
    toggleActive(3)
    showTitle(artifcatsTitle)
});

people.addEventListener('click', () => {
    toggleContent(4);
    showTitle(peopleTitle);
});

settings.addEventListener('click', () => {
    toggleContent(5)
    showTitle(settingsTitle);
})


function handleFileInputDisplay(uploadFile, file_display) {
    const fileInput = document.getElementById(uploadFile);
    const fileDisplay = document.getElementById(file_display);

    fileInput.addEventListener('change', (e) => {
        const fileName = e.target.files[0].name;
        fileDisplay.innerText = fileName;
    })
}

handleFileInputDisplay('uploadFile', 'file_display');
handleFileInputDisplay('uploadFile2', 'file_display2');
handleFileInputDisplay('uploadFile3', 'file_display3');


//test only
toggleContent(0);



function accountDeleteConfirmation() {
    const deleteBtn = document.getElementById('btn-delete');
    const deleteInput = document.getElementById('input-delete');
    deleteInput.addEventListener('input', () => {
        if (deleteInput.value === 'DELETE') {
            deleteBtn.classList.remove('disable-btn');
        }
        else {
            deleteBtn.classList.add('disable-btn');
        }
    })
}

let alertBoxTimer;
function showAlertBox(msg) {
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

// test

const copyButtons = document.querySelectorAll('.copyBtn');

copyButtons.forEach(button => {
    button.addEventListener('click', () => {

        const codeId = button.getAttribute('data-code');
        const codeToCopy = document.getElementById(codeId).innerText;
        navigator.clipboard.writeText(codeToCopy)
        .then(() => {
            showAlertBox('Code copied to clipboard');
        })
        .catch(err => {
            showAlertBox('Could not copy to clipboard', err);
        });
    })
});


accountDeleteConfirmation();

function hideLoader() {
    const loader = document.getElementById('loader');
    loader.style.display = 'none';
}

window.addEventListener('load', hideLoader);

function hideModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}

const closeBtn = document.getElementById('btn-modal-close');
closeBtn.addEventListener('click', () => {
    hideModal();
});

const loginModal = document.getElementById('modal');
const navLogoutBtn = document.getElementById('nav-logout');
navLogoutBtn.addEventListener('click', () => {
    loginModal.style.display = 'block';
});
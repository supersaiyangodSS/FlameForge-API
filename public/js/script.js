const body = document.body;
const characters = document.getElementById('nav-1');
const weapons = document.getElementById('nav-2');
const artifacts = document.getElementById('nav-3');
const home = document.getElementById('nav-0');
const admin = document.getElementById('nav-4');
const people = document.getElementById('nav-5');
const settings = document.getElementById('nav-6');

const contentData = document.getElementById('content-data');
const heading = document.getElementById('heading');

const homeContent = document.getElementById('content-0');
const charactersContent = document.getElementById('content-1');
const weaponsContent = document.getElementById('content-2');
const artifactsContent = document.getElementById('content-3');
const adminContent = document.getElementById('content-4');
const poepleContent = document.getElementById('content-5');
const settingsContent = document.getElementById('content-6');

const documentHeight = () => {
    const doc = document.documentElement
    doc.style.setProperty('--doc-height', `${window.innerHeight}`)
}
window.addEventListener('resize', documentHeight)
documentHeight();


function showTitle(title) {
    heading.innerText = title;
}

const characterTitle = characters.innerText;
const weaponsTitle = weapons.innerText;
const artifcatsTitle = artifacts.innerText;
const peopleTitle = 'People'
const settingsTitle = 'Settings'
const adminTitle = 'Admin Control'
const welcomTitle = 'Welcome To FlameForge'

showTitle(welcomTitle)

function loadDefaults() {
    let activeNav = localStorage.getItem('activeNav');
    let activeContent = localStorage.getItem('activeContent');
    if (!activeNav || !activeContent) {
        activeNav = 1;
        activeContent = 1;
    }
    // showTitle('');
    // charactersContent.style.display = 'none';
    // weaponsContent.style.display = 'none';
    // artifactsContent.style.display = 'none'
    // poepleContent.style.display = 'none';
    // settingsContent.style.display = 'none';
    // homeContent.style.display = 'block';
    toggleActive(activeNav);
    toggleContent(activeContent)
}
loadDefaults();
function toggleActive(navOrder) {
    for (let i = 1; i <= 5; i++) {
        document.getElementById(`nav-${i}`).classList.remove('light-gray');
    }
    document.getElementById(`nav-${navOrder}`).classList.add('light-gray');
    localStorage.setItem('activeNav', navOrder);
}

function toggleContent(contentOrder) {
    for (let i = 0; i <= 6; i++) {
        document.getElementById(`content-${i}`).style.display = 'none';
    }
    document.getElementById(`content-${contentOrder}`).style.display = 'block';
    localStorage.setItem('activeContent', contentOrder);
}

home.addEventListener('click', () => {
    toggleContent(0);
    showTitle('');
    sidebar.classList.toggle('sidebar-mob');
    body.classList.toggle('body-overflow');
})

characters.addEventListener('click', () => {
    toggleContent(1);
    toggleActive(1)
    showTitle(characterTitle)
    sidebar.classList.toggle('sidebar-mob');
    body.classList.toggle('body-overflow');
});

weapons.addEventListener('click', () => {
    toggleContent(2);
    toggleActive(2)
    showTitle(weaponsTitle)
    sidebar.classList.toggle('sidebar-mob');
    body.classList.toggle('body-overflow');
});

artifacts.addEventListener('click', () => {
    toggleContent(3);
    toggleActive(3)
    showTitle(artifcatsTitle)
    sidebar.classList.toggle('sidebar-mob');
    body.classList.toggle('body-overflow');
});

if (adminContent && admin) {
    admin.addEventListener('click', () => {
        toggleContent(4);
        toggleActive(4)
        showTitle(adminTitle);
        sidebar.classList.toggle('sidebar-mob');
        body.classList.toggle('body-overflow');
    })
}

people.addEventListener('click', () => {
    toggleContent(5);
    showTitle(peopleTitle);
    sidebar.classList.toggle('sidebar-mob');
    body.classList.toggle('body-overflow');
});

settings.addEventListener('click', () => {
    toggleContent(6)
    showTitle(settingsTitle);
    sidebar.classList.toggle('sidebar-mob');
    body.classList.toggle('body-overflow');
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
// toggleContent(4);


function accountDeleteConfirmation() {
    const deleteBtn = document.getElementById('btn-delete');
    const deleteInput = document.getElementById('input-delete');
    deleteInput.addEventListener('input', () => {
        if (deleteInput.value === 'DISAPPEAR') {
            deleteBtn.classList.remove('disable-btn');
            deleteBtn.classList.add('deleteAccountBtn');
        }
        else {
            deleteBtn.classList.add('disable-btn');
            deleteBtn.classList.remove('deleteAccountBtn');
        }
    });
}

let alertBoxTimer;
function showAlertBox(msg) {
    const alertBox = document.getElementById('alertBox');
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

let alertBoxErrorTimer;
function showAlertErrorBox(msg) {
    const alertBox = document.getElementById('alertBoxError');
    alertBox.textContent = msg;
    alertBox.style.top = '3%'
    if (alertBoxErrorTimer) {
        clearInterval(alertBoxErrorTimer);
    }
    alertBoxErrorTimer= setInterval(() => {
        alertBox.style.top = '-50%';
        clearInterval(alertBoxErrorTimer)
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

const hamburgerBtn = document.getElementById('hamburger-btn')
const sidebar = document.getElementById('sidebar-main')

hamburgerBtn.addEventListener('click', () => {
    body.classList.toggle('body-overflow');
    sidebar.classList.toggle('sidebar-mob');
})

window.addEventListener('load', () => {
    const deleteButtons = document.querySelectorAll('.delete-btn');
    const confirmModal = document.getElementById('character-delete-confirm-modal');
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');

    deleteButtons.forEach(button => {
        button.addEventListener('click', function () {
            const characterId = this.getAttribute('data-character-id');
            const form = confirmModal.querySelector('form');
            form.action = `/dashboard/character/delete/${characterId}`;

            confirmModal.classList.remove('hidden');
        })
    });

    confirmDeleteBtn.addEventListener('click', () => {
        const form = confirmModal.querySelector('form');
        form.submit();
    });

    cancelDeleteBtn.addEventListener('click', () => {
        confirmModal.classList.add('hidden');
    })
})
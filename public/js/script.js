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
const peopleContent = document.getElementById('content-5');
const settingsContent = document.getElementById('content-6');

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

// function loadDefaults() {
//     let activeNav = localStorage.getItem('activeNav');
//     let activeContent = localStorage.getItem('activeContent');
//     if (!activeNav || !activeContent) {
//         activeNav = 1;
//         activeContent = 1;
//     }
//     // showTitle('');
//     // charactersContent.style.display = 'none';
//     // weaponsContent.style.display = 'none';
//     // artifactsContent.style.display = 'none'
//     // poepleContent.style.display = 'none';
//     // settingsContent.style.display = 'none';
//     // homeContent.style.display = 'block';
//     toggleActive(activeNav);
//     toggleContent(activeContent)
// }
function loadDefaults() {
    let activeNav = localStorage.getItem('activeNav') || 1;
    let activeContent = localStorage.getItem('activeContent') || 1;
    toggleActive(activeNav);
    toggleContent(activeContent);
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
    // body.classList.toggle('sm:body-overflow');
    if (body.classList.contains('body-overflow')) {
        body.classList.remove('body-overflow')
    }
})

characters.addEventListener('click', () => {
    toggleContent(1);
    toggleActive(1)
    showTitle(characterTitle)
    sidebar.classList.toggle('sidebar-mob');
    // body.classList.toggle('sm:body-overflow');
    if (body.classList.contains('body-overflow')) {
        body.classList.remove('body-overflow')
    }
});

weapons.addEventListener('click', () => {
    toggleContent(2);
    toggleActive(2)
    showTitle(weaponsTitle)
    sidebar.classList.toggle('sidebar-mob');
    // body.classList.toggle('sm:body-overflow');
    if (body.classList.contains('body-overflow')) {
        body.classList.remove('body-overflow')
    }
});

artifacts.addEventListener('click', () => {
    toggleContent(3);
    toggleActive(3)
    showTitle(artifcatsTitle)
    sidebar.classList.toggle('sidebar-mob');
    // body.classList.toggle('sm:body-overflow');
    if (body.classList.contains('body-overflow')) {
        body.classList.remove('body-overflow')
    }
});

if (adminContent && admin) {
    admin.addEventListener('click', () => {
        toggleContent(4);
        toggleActive(4)
        showTitle(adminTitle);
        sidebar.classList.toggle('sidebar-mob');
        // body.classList.toggle('sm:body-overflow');
        if (body.classList.contains('body-overflow')) {
            body.classList.remove('body-overflow')
        }
    })
}

people.addEventListener('click', () => {
    toggleContent(5);
    showTitle(peopleTitle);
    sidebar.classList.toggle('sidebar-mob');
    // body.classList.toggle('sm:body-overflow');
    if (body.classList.contains('body-overflow')) {
        body.classList.remove('body-overflow')
    }
});

settings.addEventListener('click', () => {
    toggleContent(6)
    showTitle(settingsTitle);
    sidebar.classList.toggle('sidebar-mob');
    // body.classList.toggle('sm:body-overflow');
    if (body.classList.contains('body-overflow')) {
        body.classList.remove('body-overflow')
    }
});

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


const deleteBtn = document.getElementById('btn-delete');
function accountDeleteConfirmation() {
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

const deleteAccount = async () => {
    const userId = deleteBtn.dataset.userid;
    try {
        // const response = await axios.delete(`http://localhost:4000/dashboard/delete/${userId}`);
        const response = await axios.delete(`/dashboard/delete/${userId}`);
        const status = response.status;
        if (status === 404) {
            return showAlertBox('User does not exists!')
        }
        if (status === 200) {
            window.location.href = '/sign-in';
        }
        else {
            showAlertBox('Internal Server Error!');
        }
    } catch (error) {
        console.error(error);
    }
}

deleteBtn.addEventListener('click', () => {
    deleteAccount()
});

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
});

const deleteCharacterBtns = document.querySelectorAll('.delete-character-btn');
const modalDeleteCharacter = document.getElementById('modal-delete-character');
const confirmDeleteBtn = document.getElementById('btn-modal-delete');

deleteCharacterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        console.log('btn');
        modalDeleteCharacter.classList.remove('hidden');
        const cancelModal = modalDeleteCharacter.querySelector('.btn-delete-character-modal-close');
        
        const characterId = btn.dataset.characterid;
        const customUrl = `/dashboard/character/delete/${characterId}`;

        const form = modalDeleteCharacter.querySelector('#character-delete-form');
        form.action = customUrl;

        confirmDeleteBtn.addEventListener('click', () => {
            form.submit();
        });

        cancelModal.addEventListener('click', () => {
            modalDeleteCharacter.classList.add('hidden');
        });
    });
});

const deleteWeaponBtns = document.querySelectorAll('.delete-weapon-btn');
const modalDeleteWeapon = document.getElementById('modal-delete-weapon');
const confirmDeleteBtnWeapon = document.getElementById('btn-modal-delete-weapon');

deleteWeaponBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        modalDeleteWeapon.classList.remove('hidden');
        const cancelModal = modalDeleteWeapon.querySelector('.btn-delete-weapon-modal-close');
        
        const weaponId = btn.dataset.weaponid;
        const customUrl = `/dashboard/weapon/delete/${weaponId}`;

        const form = modalDeleteWeapon.querySelector('#weapon-delete-form');
        form.action = customUrl;

        confirmDeleteBtnWeapon.addEventListener('click', () => {
            form.submit();
        });

        cancelModal.addEventListener('click', () => {
            modalDeleteWeapon.classList.add('hidden');
        });
    });
});

const deleteArtifactBtns = document.querySelectorAll('.delete-artifact-btn');
const modalDeleteArtifact = document.getElementById('modal-delete-artifact');
const confirmDeleteBtnArtifact = document.getElementById('btn-modal-delete-artifact');

deleteArtifactBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        modalDeleteArtifact.classList.remove('hidden');
        const cancelModal = modalDeleteArtifact.querySelector('.btn-delete-artifact-modal-close');
        
        const artifactId = btn.dataset.artifactid;
        const customUrl = `/dashboard/artifact/delete/${artifactId}`;

        const form = modalDeleteArtifact.querySelector('#artifact-delete-form');
        form.action = customUrl;

        confirmDeleteBtnArtifact.addEventListener('click', () => {
            form.submit();
        });

        cancelModal.addEventListener('click', () => {
            modalDeleteArtifact.classList.add('hidden');
        });
    });
});

const isCharacters = document.getElementById('no-characters');
const isWeapons = document.getElementById('no-weapons');
const isArtifacts = document.getElementById('no-artifacts');
const searchBar = document.getElementById('searchInput');
searchBar.addEventListener('input', () => {
    const searchTerm = searchBar.value.toLowerCase();

    const characterItems = document.querySelectorAll('.character-list');
    characterItems.forEach(item => {
        const characterName = item.querySelector('.character-title').textContent.toLowerCase();

        if (characterName.includes(searchTerm)) {
            item.style.display = 'flex';
            isCharacters.classList.add('s-hide');
        }
        else {
            item.style.display = 'none';
            isCharacters.classList.remove('s-hide');
        }
    });

    const weaponItems = document.querySelectorAll('.weapon-list');
    weaponItems.forEach(item => {
        const weaponName = item.querySelector('.weapon-title').textContent.toLowerCase();

        if (weaponName.includes(searchTerm)) {
            item.style.display = 'flex';
            isWeapons.classList.add('s-hide');
        }
        else {
            item.style.display = 'none';
            isWeapons.classList.remove('s-hide');
        }
    });

    const artifactItems = document.querySelectorAll('.artifact-list');
    artifactItems.forEach(item => {
        const artifactName = item.querySelector('.artifact-title').textContent.toLowerCase();

        if (artifactName.includes(searchTerm)) {
            item.style.display = 'flex';
            isArtifacts.classList.add('s-hide');
        }
        else {
            item.style.display = 'none';
            isArtifacts.classList.remove('s-hide');
        }
    });

});

const showUploadBtn = () => {
    const fileInputCharacter = document.getElementById('uploadFile');
    const uploadCharacterBtn = document.getElementById('uploadCharacter');
    
    fileInputCharacter.addEventListener('input', () => {
        if (fileInputCharacter.files.length > 0) {
            uploadCharacterBtn.classList.remove('s-disable');
        }
        else {
            uploadCharacterBtn.classList.add('s-disable');
        }
    });

    const fileInputWeapon = document.getElementById('uploadFile2');
    const uploadWeaponBtn = document.getElementById('uploadWeapon');
    
    fileInputWeapon.addEventListener('input', () => {
        if (fileInputWeapon.files.length > 0) {
            uploadWeaponBtn.classList.remove('s-disable');
        }
        else {
            uploadWeaponBtn.classList.add('s-disable');
        }
    });

    const fileInputArtifact = document.getElementById('uploadFile3');
    const uploadArtifactBtn = document.getElementById('uploadArtifact');
    
    fileInputArtifact.addEventListener('input', () => {
        if (fileInputArtifact.files.length > 0) {
            uploadArtifactBtn.classList.remove('s-disable');
        }
        else {
            uploadArtifactBtn.classList.add('s-disable');
        }
    });
}

window.addEventListener('load', showUploadBtn);
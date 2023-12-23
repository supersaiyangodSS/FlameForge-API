const body = document.body;
const characters = document.getElementById('nav-1');
const weapons = document.getElementById('nav-2');
const artifacts = document.getElementById('nav-3');
const home = document.getElementById('nav-0');
const admin = document.getElementById('nav-4');
const people = document.getElementById('nav-5');
const settings = document.getElementById('nav-6');
const images = document.getElementById('nav-7');
const contentData = document.getElementById('content-data');
const heading = document.getElementById('heading');
const homeContent = document.getElementById('content-0');
const charactersContent = document.getElementById('content-1');
const weaponsContent = document.getElementById('content-2');
const artifactsContent = document.getElementById('content-3');
const adminContent = document.getElementById('content-4');
const peopleContent = document.getElementById('content-5');
const settingsContent = document.getElementById('content-6');
const imagesContent = document.getElementById('content-7');
const closeBtn = document.getElementById('btn-modal-close');
const loginModal = document.getElementById('modal');
const navLogoutBtn = document.getElementById('nav-logout');
const isCharacters = document.getElementById('no-characters');
const isWeapons = document.getElementById('no-weapons');
const isArtifacts = document.getElementById('no-artifacts');
const searchBar = document.getElementById('searchInput');
const deleteArtifactBtns = document.querySelectorAll('.delete-artifact-btn');
const modalDeleteArtifact = document.getElementById('modal-delete-artifact');
const confirmDeleteBtnArtifact = document.getElementById('btn-modal-delete-artifact');
const deleteWeaponBtns = document.querySelectorAll('.delete-weapon-btn');
const modalDeleteWeapon = document.getElementById('modal-delete-weapon');
const confirmDeleteBtnWeapon = document.getElementById('btn-modal-delete-weapon');
const deleteCharacterBtns = document.querySelectorAll('.delete-character-btn');
const modalDeleteCharacter = document.getElementById('modal-delete-character');
const confirmDeleteBtn = document.getElementById('btn-modal-delete');
const hamburgerBtn = document.getElementById('hamburger-btn');
const sidebar = document.getElementById('sidebar-main');
const copyButtons = document.querySelectorAll('.copyBtn');
const deleteBtn = document.getElementById('btn-delete');

function showTitle(title) {
    heading.innerText = title;
}

const characterTitle = characters.innerText;
const weaponsTitle = weapons.innerText;
const artifcatsTitle = artifacts.innerText;
const peopleTitle = 'People';
const settingsTitle = 'Settings';
const imagesTitle = 'Image Uploader';
const adminTitle = 'Admin Control';
const welcomTitle = 'Welcome To FlameForge';


function loadDefaults() {
    let activeNav = localStorage.getItem('activeNav') || 1;
    let activeContent = localStorage.getItem('activeContent') || 1;
    let activeHeading = localStorage.getItem('activeHeader');
    showTitle(activeHeading)
    toggleActive(activeNav);
    toggleContent(activeContent);
}

function toggleActive(navOrder) {
    for (let i = 1; i <= 7; i++) {
        document.getElementById(`nav-${i}`).classList.remove('light-gray');
    }
    document.getElementById(`nav-${navOrder}`).classList.add('light-gray');
    localStorage.setItem('activeNav', navOrder);
}

function toggleContent(contentOrder) {
    for (let i = 0; i <= 7; i++) {
        document.getElementById(`content-${i}`).style.display = 'none';
    }
    document.getElementById(`content-${contentOrder}`).style.display = 'block';
    localStorage.setItem('activeContent', contentOrder);
}

home.addEventListener('click', () => {
    toggleContent(0);
    showTitle('');
    localStorage.setItem('activeHeader', '');
    sidebar.classList.toggle('sidebar-mob');
    if (body.classList.contains('body-overflow')) {
        body.classList.remove('body-overflow')
    }
});

characters.addEventListener('click', () => {
    toggleContent(1);
    toggleActive(1)
    showTitle(characterTitle)
    localStorage.setItem('activeHeader', characterTitle);
    sidebar.classList.toggle('sidebar-mob');
    if (body.classList.contains('body-overflow')) {
        body.classList.remove('body-overflow')
    }
});

weapons.addEventListener('click', () => {
    toggleContent(2);
    toggleActive(2)
    showTitle(weaponsTitle)
    localStorage.setItem('activeHeader', weaponsTitle);
    sidebar.classList.toggle('sidebar-mob');
    if (body.classList.contains('body-overflow')) {
        body.classList.remove('body-overflow')
    }
});

artifacts.addEventListener('click', () => {
    toggleContent(3);
    toggleActive(3)
    showTitle(artifcatsTitle)
    localStorage.setItem('activeHeader', artifcatsTitle);
    sidebar.classList.toggle('sidebar-mob');
    if (body.classList.contains('body-overflow')) {
        body.classList.remove('body-overflow')
    }
});

images.addEventListener('click', () => {
    toggleContent(7);
    toggleActive(7);
    showTitle(imagesTitle);
    localStorage.setItem('activeHeader', imagesTitle);
    sidebar.classList.toggle('sidebar-mob');
    if (body.classList.contains('body-overflow')) {
        body.classList.remove('body-overflow')
    }
});

if (adminContent && admin) {
    admin.addEventListener('click', () => {
        toggleContent(4);
        toggleActive(4)
        showTitle(adminTitle);
        localStorage.setItem('activeHeader', adminTitle);
        sidebar.classList.toggle('sidebar-mob');
        if (body.classList.contains('body-overflow')) {
            body.classList.remove('body-overflow')
        }
    })
}

people.addEventListener('click', () => {
    toggleContent(5);
    showTitle(peopleTitle);
    localStorage.setItem('activeHeader', peopleTitle);
    sidebar.classList.toggle('sidebar-mob');
    if (body.classList.contains('body-overflow')) {
        body.classList.remove('body-overflow')
    }
});

settings.addEventListener('click', () => {
    toggleContent(6)
    showTitle(settingsTitle);
    localStorage.setItem('activeHeader', settingsTitle);
    sidebar.classList.toggle('sidebar-mob');
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
    });
}

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

let alertBoxTimer = null;
let alertBoxErrorTimer = null;

function showAlertBox(msg) {
    const alertBox = document.getElementById('alertBox');
    alertBox.textContent = msg;
    alertBox.style.top = '3%'
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
    });
});

function hideLoader() {
    const loader = document.getElementById('loader');
    loader.style.display = 'none';
}

function hideModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}

navLogoutBtn.addEventListener('click', () => {
    loginModal.style.display = 'block';
});


hamburgerBtn.addEventListener('click', () => {
    body.classList.toggle('body-overflow');
    sidebar.classList.toggle('sidebar-mob');
});


deleteCharacterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        
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

function handleRadioButtonClick(event) {
    const selectedValue = event.target.id;
    localStorage.setItem('selectedUploadType', selectedValue);
}

const radioBtns = document.querySelectorAll('.radioBtns');

radioBtns.forEach(btn => {
    btn.addEventListener('click', handleRadioButtonClick);
});

const storedUploadType = localStorage.getItem('selectedUploadType');
if (storedUploadType) {
    const selectedRadioBtn = document.getElementById(storedUploadType);
    if (selectedRadioBtn) {
        selectedRadioBtn.checked = true;
    }
}


deleteBtn.addEventListener('click', () => {
    deleteAccount()
});

closeBtn.addEventListener('click', () => {
    hideModal();
});

window.addEventListener('load', () => {
    showUploadBtn()
    loadDefaults();
    // showTitle(welcomTitle)
    handleFileInputDisplay('uploadFile', 'file_display');
    handleFileInputDisplay('uploadFile2', 'file_display2');
    handleFileInputDisplay('uploadFile3', 'file_display3');
    accountDeleteConfirmation();
    hideLoader();
});

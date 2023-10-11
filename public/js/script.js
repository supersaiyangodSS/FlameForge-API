const nav_link_characters = document.getElementById('nav-characters');
const nav_link_weapons = document.getElementById('nav-weapons');
const nav_link_artifacts = document.getElementById('nav-artifacts');
const content = document.getElementById('content');

const data = {
    'characters': 'characters div',
    'weapons': 'weapons div',
    'artifacts': 'artifacts div'
}

function showContent(item) {
    const contentData = document.getElementById('content-data');
    let tempData = '';
    if (item == 'characters') {
        tempData = data.characters
    }
    if (item == 'artifacts') {
        tempData = data.artifacts
    }
    if (item == 'weapons') {
        tempData = data.weapons
    }
    contentData.innerText = tempData;
}

nav_link_characters.addEventListener('click', () => {
    showContent('characters');
    if (nav_link_artifacts.classList.contains('light-gray')) {
        nav_link_artifacts.classList.remove('light-gray')
    }
    if (nav_link_weapons.classList.contains('light-gray')) {
        nav_link_weapons.classList.remove('light-gray');
    }
    nav_link_characters.classList.add('light-gray')
});
nav_link_artifacts.addEventListener('click', () => {
    showContent('characters');
    if (nav_link_characters.classList.contains('light-gray')) {
        nav_link_characters.classList.remove('light-gray')
    }
    if (nav_link_weapons.classList.contains('light-gray')) {
        nav_link_weapons.classList.remove('light-gray');
    }
    nav_link_artifacts.classList.add('light-gray')
});
nav_link_weapons.addEventListener('click', () => {
    showContent('characters');
    if (nav_link_artifacts.classList.contains('light-gray')) {
        nav_link_artifacts.classList.remove('light-gray')
    }
    if (nav_link_characters.classList.contains('light-gray')) {
        nav_link_characters.classList.remove('light-gray');
    }
    nav_link_weapons.classList.add('light-gray')
});

nav_link_artifacts.addEventListener('click' ,() => {
    showContent('artifacts');
});

nav_link_weapons.addEventListener('click', () => {
    showContent('weapons');
})
const characters = document.getElementById('nav-1');
const weapons = document.getElementById('nav-2');
const artifacts = document.getElementById('nav-3');
const home = document.getElementById('nav-0');

const contentData = document.getElementById('content-data');
const heading = document.getElementById('heading');

const homeContent = document.getElementById('content-0');
const charactersContent = document.getElementById('content-1');
const weaponsContent = document.getElementById('content-2');
const artifactsContent = document.getElementById('content-3');

function showTitle(title) {
    heading.innerText = title;
}

const characterTitle = characters.innerText; 
const weaponsTitle = weapons.innerText;
const artifcatsTitle = artifacts.innerText;

showTitle(characterTitle)

function loadDefaults() {
    // characters.classList.add('light-gray')
    showTitle('');
    charactersContent.style.display = 'none';
    weaponsContent.style.display = 'none';
    artifactsContent.style.display = 'none'
    homeContent.style.display = 'block';
}
loadDefaults();

function toggleActive(navOrder) {
    for (let i = 1; i <= 3; i++) {
            document.getElementById(`nav-${i}`).classList.remove('light-gray');
        }
    document.getElementById(`nav-${navOrder}`).classList.add('light-gray');
}

function toggleContent(contentOrder) {
    for (let i = 0; i <=3; i++) {
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


//test only
charactersContent.style.display = 'block'
homeContent.style.display = 'none'

const copyBtn = document.getElementById('copy-btn');
const codeBox = document.getElementById('codeBox');

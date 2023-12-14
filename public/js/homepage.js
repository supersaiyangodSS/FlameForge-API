const sidebar = document.getElementById('sidebar');
const hamburgerBtn = document.getElementById('hamburger-btn');
const hamburgerBtnClose = document.getElementById('hamburger-btn-close');
const navLinks = document.querySelectorAll('.nav-links');

hamburgerBtn.addEventListener('click', () => {
    sidebar.classList.add('flex')
    sidebar.classList.remove('hidden')
});

hamburgerBtnClose.addEventListener('click', () => {
    sidebar.classList.add('hidden')
    sidebar.classList.remove('flex')
});


    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            sidebar.classList.add('hidden');
            sidebar.classList.remove('flex');
        });
    });

function hideLoader() {
    const loader = document.getElementById('loader');
    loader.style.display = 'none';
}

window.addEventListener('load', () => {
    hideLoader();
});
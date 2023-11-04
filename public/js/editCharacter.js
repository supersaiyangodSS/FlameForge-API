const cancelBtn = document.getElementById('cancelBtn');

cancelBtn.addEventListener('click', () => {
    window.history.back();
});

const saveBtn = document.getElementById('save');
const confirmSave = document.getElementById('confirmSave');

confirmSave.addEventListener('input', () => {
    if(confirmSave.value === 'GENSHIN') {
        saveBtn.classList.remove('disable-save-btn')
    }
    else {
        saveBtn.classList.add('disable-save-btn')
    }
})


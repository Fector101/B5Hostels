
function showTab(tab) {
    // tab = 'maintenance' or 'free' or 'full' or ('room-card' <--- for all)
    
    document.querySelectorAll('.room-card').forEach(card => {
        if (!card.classList.contains(tab)) {
            card.classList.add('display-none')
        } else {
            card.classList.remove('display-none')
        }
    })
    const currentHostel = document.querySelector('.select-hostel').value
    displayHostel(currentHostel)
}

document.querySelector('.tabs').addEventListener('click', function (event) {
    const tabBtn = event.target.closest('button')
    this.querySelector('.active').classList.remove('active')
    tabBtn.classList.add('active')
    if (!tabBtn) return
    showTab(tabBtn.value)
    
})

function displayHostel(hostel){
    const currentTab = document.querySelector('.tabs button.active').value
    document.querySelectorAll(`.cards-box > div.${currentTab}`).forEach(card => {
        if (card.classList.contains(hostel)) {
            card.classList.remove('display-none')
        } else {
            card.classList.add('display-none')
        }
    })
}

document.querySelector('.select-hostel').addEventListener('change', function () {
    const selectedHostel = this.value
    displayHostel(selectedHostel)
})
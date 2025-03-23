
function showTab(tab) {
    // tab = 'pending' or 'verified' or 'paid' or ('student-card' <--- for all)
    document.querySelectorAll('.student-card').forEach(card => {
        if (!card.classList.contains(tab)) {
            card.classList.add('display-none')
        } else {

            card.classList.remove('display-none')
        }
    })

}

document.querySelector('.tabs').addEventListener('click', function (event) {
    const tabBtn = event.target.closest('button')
    this.querySelector('.active').classList.remove('active')
    tabBtn.classList.add('active')
    if (!tabBtn) return
    if (tabBtn.innerText == 'Occupied') {
        showTab('full')
    } else if (tabBtn.innerText == 'Available') {
        showTab('free')
    } else if (tabBtn.innerText == 'Maintenance') {
        showTab('maintenance')
    }
    else if (tabBtn.innerText == 'Paid') {
        showTab('paid')
    } else {
        showTab('room-card')
    }
})
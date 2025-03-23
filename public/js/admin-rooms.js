function showNotification(message, type) {
    const notification = document.getElementById("notification");
    notification.textContent = message;
    notification.className = `notification ${type}`;
    notification.style.display = "block";

    setTimeout(() => { notification.style.display = "none"; }, 3000);
}


const backDropEle = document.querySelector(".cover.form");
function removeModal(event = None) {
    backDropEle.classList.add("display-none");
}

function showModal() {
    backDropEle.classList.remove("display-none");
}
document.querySelector("button.add-room-btn").addEventListener("click", showModal);
document.querySelector(".add-container .close-btn").addEventListener("click", removeModal);

const backDropforSpinner = document.querySelector('.spinner-cover')
function removeSpinner() {
    backDropforSpinner.classList.add('display-none')
}

function addSpinner() {
    backDropforSpinner.classList.remove('display-none')
}


document.getElementById('add-room-form').addEventListener("submit", async function (event) {
    event.preventDefault()
    addSpinner()
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries()); // Convert form data to JSON object
    console.log(data)

    try {
        const response = await fetch("/admin/add-room", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        if (response.ok) {
            showNotification(result.msg, "success");

        } else {
            removeSpinner()
            showNotification(result.msg || "Poor Network, Try Refreshing Page", "error");
        }
    } catch (error) {
        console.log(error)
        // removeSpinner()
        showNotification(`Server error. Try again later.`, "error");
    }
})


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
    if (!tabBtn) return
    this.querySelector('.active').classList.remove('active')
    tabBtn.classList.add('active')
    showTab(tabBtn.value)

})

function displayHostel(hostel) {
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
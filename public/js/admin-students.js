function showNotification(message, type) {
    const notification = document.getElementById("notification");
    notification.textContent = message;
    notification.className = `notification ${type}`;
    notification.style.display = "block";

    setTimeout(() => { notification.style.display = "none"; }, 3000);
}




const backDropEle = document.querySelector(".cover.choices");
function removeModal(event = None) {
    backDropEle.classList.add("display-none");
}

function showModal() {
    backDropEle.classList.remove("display-none");
}
document.querySelector(".allocation-box .close-btn").addEventListener("click", removeModal);

const backDropforSpinner = document.querySelector('.spinner-cover')
function removeSpinner() {
    backDropforSpinner.classList.add('display-none')
}

function addSpinner() {
    backDropforSpinner.classList.remove('display-none')
}

document.addEventListener("click", function (event) {
    const assignBtn = event.target.closest(".assign-btn");
    if (!assignBtn) return;
    const student_card = assignBtn.closest(".student-card");
    const student_name = student_card.querySelector(".name").innerText;
    const student_matric_no = student_card.querySelector(".matric_no").innerText;
    console.log(student_name, student_matric_no);
    const modal_header_con = document.querySelector('.header-caption.dim-text')
    modal_header_con.querySelector('.--name').textContent = student_name.split(' ')[0]
    modal_header_con.querySelector('.--matric_no').textContent = student_matric_no

    showModal();
    // console.log(assignBtn)
});


// ALlocation Modal
document
    .querySelector(".allocation-box")
    .addEventListener("click", function (event) {
        const selectBtn = event.target.closest(".room-selection-card .select-btn");
        if (!selectBtn) return;
        document.querySelector(".room-selection-card.active").classList.remove("active");
        selectBtn.closest(".room-selection-card").classList.add("active");
    });
document.querySelector('#accept-room').addEventListener('click', async function () {
    const student_matric_no = document.querySelector('.--matric_no').innerText
    const room_number = document.querySelector('.room-selection-card.active .room_number').innerText
    console.log(student_matric_no, room_number)
    try {

        const response = await fetch("/admin/assign-room", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ matric_no: student_matric_no, room_number })
        });
        const result = await response.json();

        if (response.ok) {
            removeSpinner()
            showNotification(result.msg, "success");

        } else {
            removeSpinner()
            showNotification(result.msg || "Poor Network, Try Refreshing Page", "error");
        }
    } catch (error) {
        console.log(error)
        // removeSpinner()
        showNotification(`-Network error. Try again later.`, "error");
    }
})

function showTab(tab) {
    // tab = 'pending' or 'verified' or 'paid' or ('student-card' <--- for all)
    document.querySelectorAll(".main-content .student-card").forEach((card) => {
        if (!card.classList.contains(tab)) {
            card.classList.add("display-none");
        } else {
            card.classList.remove("display-none");
        }
    });
    // const currentLevel = document.querySelector('.select-level').value
    // displayLevel(currentLevel)
    document.querySelector('.select-level').value = 'all'
    displayLevel('all')
}

function displayLevel(level) {
    const currentTab = document.querySelector('.tabs button.active').value
    document.querySelectorAll(`.main-content .cards-box > div.${currentTab}`).forEach(card => {
        if (card.getAttribute('data-level') == level) {
            // showNotification(card.getAttribute('data-level'), "success")
            card.classList.remove('display-none')
        } else if (level == 'all') {
            card.classList.remove('display-none')
        }
        else {
            card.classList.add('display-none')
        }
    })
}

document.querySelector(".tabs").addEventListener("click", function (event) {
    const tabBtn = event.target.closest("button");
    if (!tabBtn) return;
    this.querySelector(".active").classList.remove("active");
    tabBtn.classList.add("active");
    showTab(tabBtn.value);
});


document.querySelector('.select-level').addEventListener('change', function () {
    const selectedLevel = this.value
    displayLevel(selectedLevel)
})

document.querySelector('.cards-box').addEventListener('click', async function (event) {
    const verfiyBtn = event.target.closest('.verify-btn')
    const rejectBtn = event.target.closest('.reject-room-btn')
    function displayDoneBtn(txt){
        event.target.closest('.btns-box').innerHTML=`<button disabled class="assigned-room-btn"> ${txt} </button>`
        
    }
    if (verfiyBtn) {
        const student_card = verfiyBtn.closest('.student-card')
        const matric_no = student_card.querySelector('.matric_no').innerText
        const room_number = student_card.querySelector('.preference').innerText

        console.log(matric_no, room_number)
        try {

            const response = await fetch("/admin/assign-room", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ matric_no, room_number })
            });
            const result = await response.json();

            if (response.ok) {
                displayDoneBtn('Room Assigned')
                removeSpinner()
                showNotification(result.msg, "success");

            } else {
                removeSpinner()
                showNotification(result.msg || "Poor Network, Try Refreshing Page", "error");
            }
        } catch (error) {
            console.log(error)
            // removeSpinner()
            showNotification(`-Network error. Try again later.`, "error");
        }
    } else if (rejectBtn) {
        const student_card = rejectBtn.closest('.student-card')
        const matric_no = student_card.querySelector('.matric_no').innerText
        const room_number = student_card.querySelector('.preference').innerText

        console.log(matric_no, room_number)
        try {

            const response = await fetch("/admin/reject-student-room", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ matric_no })
            });
            const result = await response.json();

            if (response.ok) {
                displayDoneBtn('Reject Room')
                removeSpinner()
                showNotification(result.msg, "success");

            } else {
                removeSpinner()
                showNotification(result.msg || "Poor Network, Try Refreshing Page", "error");
            }
        } catch (error) {
            console.log(error)
            // removeSpinner()
            showNotification(`-Network error. Try again later.`, "error");
        }
    }
})

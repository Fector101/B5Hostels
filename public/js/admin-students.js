const backDropEle = document.querySelector(".cover");
function removeModal(event = None) {
    backDropEle.classList.add("display-none");
}

function showModal() {
    backDropEle.classList.remove("display-none");
}
document
    .querySelector(".allocation-box .close-btn")
    .addEventListener("click", removeModal);
document.addEventListener("click", function (event) {
    const assignBtn = event.target.closest(".assign-btn");
    if (!assignBtn) return;
    showModal();
    // console.log(assignBtn)
});

function insertRooms(number) {
    let htmlString = ``;
    for (var i = 0; i < number; i++) {
        htmlString += `
    
        <div class="student-card room-selection-card verified ${i == 0 ? "active" : ""
            }">
            <div class="card-header">
                <div class="student-id-box">
                  <p class="dim-text">Room</p>
                  <p>A-101</p>
                  </div>
                <span class="badge undergraduate">Available</span>
            </div>
                <div class="info">
                    <div class="row">
                      <p class="dim-text">Blocs:</p>
                      <p>New Hostel</p>
                    </div>
                    <div class="row">
                      <p class="dim-text">Capacity:</p>
                      <p> 1/4</p>
                    </div>
                    
                    <div class="row">
                      <p class="dim-text">Floor:</p>
                      <p> 1</p>
                      </div>
                </div>
                <div class="amenities-box">
                  <p class="dim-text">
                    Amenities:
                  </p>
                  <div class="con">
                  <div class="sub-container"><p>Wifi</p></div>

<div class="sub-container"><p>Desk</p></div>

<div class="sub-container"><p>Wardrobe</p></div>

<div class="sub-container"><p>Study Area</p></div>
                </div>
               </div>   
            
                <div class="btns-box">
                <button class='select-btn'>${i == 0 ? "Selected" : "Select Room"
            }</button>
                </div>
        </div>`;
    }
    document.querySelector(".rooms-box").innerHTML = htmlString;
}
insertRooms(5);

// ALlocation Modal
document
    .querySelector(".allocation-box")
    .addEventListener("click", function (event) {
        const selectBtn = event.target.closest(
            ".room-selection-card .select-btn"
        );
        console.log(selectBtn);
        if (!selectBtn) return;
        document
            .querySelector(".room-selection-card.active")
            .classList.remove("active");
        selectBtn.closest(".room-selection-card").classList.add("active");
    });

function showTab(tab) {
    // tab = 'pending' or 'verified' or 'paid' or ('student-card' <--- for all)
    document.querySelectorAll(".student-card").forEach((card) => {
        if (!card.classList.contains(tab)) {
            card.classList.add("display-none");
        } else {
            card.classList.remove("display-none");
        }
    });
    const currentLevel = document.querySelector('.select-hostel').value
    displayLevel(currentLevel)
}

function displayLevel(hostel){
    const currentTab = document.querySelector('.tabs button.active').value
    const specificElement = document.querySelector('.cards-box > div');
console.log(specificElement);

    document.querySelectorAll(`.cards-box > div.[data-level="2"]`).forEach(card => {
        if (card.classList.contains(hostel)) {
            card.classList.remove('display-none')
        } else {
            card.classList.add('display-none')
        }
    })
}

document.querySelector(".tabs").addEventListener("click", function (event) {
    const tabBtn = event.target.closest("button");
    this.querySelector(".active").classList.remove("active");
    tabBtn.classList.add("active");
    if (!tabBtn) return;
    showTab(tabBtn.value);
});

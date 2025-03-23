
const backDropEle = document.querySelector('.cover')
function removeModal(event=None){
    backDropEle.classList.add('display-none')

}

function showModal(){
    backDropEle.classList.remove('display-none')
}
document.querySelector('.allocation-box .close-btn').addEventListener('click',removeModal)
document.addEventListener("click", function (event){
  const assignBtn = event.target.closest('.assign-btn')
  if(!assignBtn) return
  showModal()
 // console.log(assignBtn)
})

function insertRooms(number){ 
let htmlString=``
  for (var i = 0; i < number; i++) {
    htmlString+=`
    
        <div class="student-card room-selection-card verified">
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
                <button class='active select-btn'>Select Room</button>
                </div>
        </div>`
  }
  document.querySelector(".rooms-box").innerHTML=htmlString
}
insertRooms(4)


document.querySelector('.allocation-box', function(event){
  const roomEle = event.target.closest('.room-selection-card')
  console.log(roomEle)
  if(!roomEle) return 
roomEle.querySelector("button").classList.add("assign-btn")
})
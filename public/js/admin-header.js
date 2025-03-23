const menubtn = document.querySelector('.menu-btn')
const navEle = document.querySelector('header nav')
const signoutBtn = document.querySelector('.signout-btn')
let navState = 0
menubtn.addEventListener('click', function () {
    
    const header = document.querySelector('header')
    header.style.display = 'flex'
    header.style.flexDirection = 'column'
    setNav(navState)
    navState = !navState
})
function setNav(current_state) {
    if (current_state){
        menubtn.querySelector('.x-svg').classList.add('display-none')
        menubtn.querySelector('.menu-svg').classList.remove('display-none')
    }else{
        menubtn.querySelector('.menu-svg').classList.add('display-none')
        menubtn.querySelector('.x-svg').classList.remove('display-none')
    }
    setHeightWidth(navEle, current_state)
    signoutBtn.style.width = current_state ? '0' : "100px"
    signoutBtn.style.height = current_state ? '0' : "35px"
    signoutBtn.style.border = current_state ? 'None' : "1px solid grey"
}
function setHeightWidth(ele, state) {
    ele.style.height = state ?'0': '130px'
    ele.style.width = state ? '0': '100%'
}


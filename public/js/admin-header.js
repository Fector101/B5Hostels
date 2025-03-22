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
function setNav(state) {
    setHeightWidth(navEle, !state)
    signoutBtn.style.width = state ? '0' : "100px"
    signoutBtn.style.height = state ? '0' : "35px"
    signoutBtn.style.border = state ? 'None' : "1px solid grey"
}
function setHeightWidth(ele, state) {
    ele.style.height = state ? '130px' : '0'
    ele.style.width = state ? '100%' : '0'
}



const make_payment_btn = document.querySelector('button#pay')
make_payment_btn.addEventListener('click', function () {
    document.querySelector('#room-page').classList.add('display-none')
    document.querySelector('#payment-page').classList.remove('display-none')
    // window.location.href = '/payment-portal'

})

document.getElementById("payment-form")
    .addEventListener("submit", function (event) {
        event.preventDefault();
        document.querySelector('.confirm-payement-modal').classList.remove('display-none')
        // setTimeout(() => {
        // },1000)
        setTimeout(() => {document.querySelector('.confirm-payement-modal .content-box').classList.remove('display-none')},1000)
            // document.querySelector('.confirm-payement-modal').classList.add('display-none')
            // document.querySelector('#payment-page').classList.add('display-none')
            // document.querySelector('#room-page').classList.remove('display-none')
        // }
        //     , 1000)
    })
const make_payment_btn = document.querySelector('button#pay')
make_payment_btn.addEventListener('click',function(){
    document.querySelector('#room-page').classList.add('display-none')
    document.querySelector('#payment-page').classList.remove('display-none')
    // window.location.href = '/payment-portal'

})
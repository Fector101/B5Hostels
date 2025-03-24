
const make_payment_btn = document.querySelector('button#pay')
make_payment_btn.addEventListener('click', function () {
    document.querySelector('#room-page').classList.add('display-none')
    document.querySelector('#payment-page').classList.remove('display-none')
    // window.location.href = '/payment-portal'

})

document.getElementById("payment-form")
    .addEventListener("submit", async function (event) {
        event.preventDefault();
        // document.querySelector('.confirm-payement-modal').classList.remove('display-none')
        

        try {
            const response = await fetch("/make-payment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({room_no: document.querySelector('#room_no').innerText})
            });
        // const result = await response.json();
        //     console.log(result)
        } catch (error) {
            console.log(error)
            // removeSpinner()
            // showNotification(`Server error. Try again later.`, "error");
        }
        // setTimeout(() => { document.querySelector('.confirm-payement-modal .content-box').classList.remove('display-none') }, 1000)
        // document.querySelector('.confirm-payement-modal').classList.add('display-none')
        // document.querySelector('#payment-page').classList.add('display-none')
        // document.querySelector('#room-page').classList.remove('display-none')
        // }
        //     , 1000)
    })
const backDropEle = document.querySelector('.cover')
function removeSpinner(){
    backDropEle.classList.add('display-none')
}

function addSpinner(){
    backDropEle.classList.remove('display-none')
}

document.getElementById("login-form").addEventListener("submit", async function (event) {
    event.preventDefault();
    addSpinner()

    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries()); // Convert form data to JSON object

    try {
        const response = await fetch("/api/authn/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        if (response.redirected) {
            console.log(response)
            window.location.href = '/dashboard'
            return
        }
        const result = await response.json();
        if (response.ok) {
            showNotification(result.msg || "Login successful", "success");

        } else {
            showNotification(result.msg || "Login failed", "error");
        }
        console.log(result)
    } catch (error) {
        console.log(error)
        showNotification(`Server error. Try again later.`, "error");
    }
});

function showNotification(message, type) {
    const notification = document.getElementById("notification");
    notification.textContent = message;
    notification.className = `notification ${type}`;
    notification.style.display = "block";

    setTimeout(() => { notification.style.display = "none"; }, 3000);
}
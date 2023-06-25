const accountMenu = document.querySelector(".account-menu")
const logginButton = document.querySelector(".login")
const diplayName = document.getElementById("display_name")
const dropdown = document.getElementById("dropdown")

// if user loggedIn show account menu if not loggedIn show login button
function showAccountMenu() {
    if(document.cookie !== ""){
        logginButton.style.display = "none"
        accountMenu.style.display = "flex"
    }
}

showAccountMenu()

// toggle account menu dropdown
window.addEventListener('click', (event) => {
    if(accountMenu.contains(event.target)){
        dropdown.style.display = "initial"
    }else{
      dropdown.style.display = "none"
    }
})

// user logout
function handleLogout() {
    localStorage.removeItem("user_name")
    fetch("/account/logout", {method: "post"}).then(() => {
        window.location.href = "/"
    })
}
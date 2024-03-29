const accountMenu = document.querySelector(".account-menu")
const logginButton = document.querySelector(".login")
const noticeBoard = document.querySelector(".alert-in-add")
const diplayName = document.getElementById("display_name")
const dropdown = document.getElementById("dropdown")
const navProfile = document.getElementById("profile_image")

// check cookie
function checkCookie(name) {
    let cookies = document.cookie.split('; ');
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].split('=');
      if (cookie[0] === name) {
        return true; // Cookie found
      }
    }
    return false; // Cookie not found
  }
  
let tokenExists = checkCookie('Token');

// if user loggedIn 
// show account menu & hide notice in add new word page
function ifUserLoggedIn() {
    if(tokenExists){
        logginButton.style.display = "none"
        accountMenu.style.display = "flex"
        if(noticeBoard) noticeBoard.style.display = "none"
        navProfile.src = localStorage.getItem("profile_picture")
    }
}

ifUserLoggedIn()

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
    localStorage.removeItem("profile_picture")
    fetch("/account/logout", {method: "post"}).then(() => {
        window.location.href = "/"
    })
}
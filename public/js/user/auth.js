const registerForm = document.getElementById("register_form")
const loginForm = document.getElementById("login_form")
const userName = document.getElementById("user_name")
const email = document.getElementById("email")
const password = document.getElementById("password")
const socialMedia = document.getElementById("social_media")
const profilePicture = document.getElementById("profile_picture")
const profilePreivew = document.getElementById("profile_preivew")
const authSubmitBtn = document.getElementById("auth_submit_btn")
const authErrorMessage = document.querySelector(".auth-error-message")


// profile picture preview
if(profilePicture){
    profilePicture.addEventListener("change", (event) => {
        profilePreivew.src = window.URL.createObjectURL(event.target.files[0])
        profilePreivew.style.display = "initial"
    })
}

// user register handle 
registerForm.addEventListener("submit", async (event) => {
    event.preventDefault()
    // basic form validation
    const errors =  formValidation([userName, email, password])
    if(errors.length !== 0) return

    // change button text to loading
    authSubmitBtn.innerHTML = "loading..."

    // upload profile image to firebase storage and get image
    const profile_picture = await profilePicutureUpload()

    const registerData = {
        user_name: userName.value,
        email:email.value,
        password:password.value,
        profile_picture: profile_picture,
        social_media: socialMedia.value
    }

    // user register - api call
    options_post.body = JSON.stringify(registerData)
    fetch("/account/register", options_post).then((res) => {
        return res.json()
    }).then((response) => {
        // if register fail show error message
        if(response.status === false) {
            authErrorMessage.innerHTML = response.message
            authErrorMessage.style.display = "initial"
            // change button text to default
            authSubmitBtn.innerHTML = "അക്കൗണ്ട് ഉണ്ടാക്കുക"
        }
        // if register success set user_name in localStorage 
        // and redirect to user dashbaord
        if(response.status === true) {
            localStorage.setItem("profile_picture", response.profile_picture)
            location.replace("/")
        }
    })


})

// user login handle
loginForm.addEventListener("submit", (event) => {
    event.preventDefault()
    // basic form validation
    const errors =  formValidation([email, password])
    if(errors.length !== 0) return
    
    const loginData = {
        user_name: userName.value,
        email:email.value,
        password:password.value
    }

    // change button text to loading
    authSubmitBtn.innerHTML = "loading..."

    // user register - api call
    options_post.body = JSON.stringify(loginData)
    fetch("/account/login", options_post).then((res) => {
        return res.json()
    }).then((response) => {
        // if register fail show error message
        if(response.status === false) {
            authErrorMessage.innerHTML = response.message
            authErrorMessage.style.display = "initial"
             // change button text to default
            authSubmitBtn.innerHTML = "പ്രവേശിക്കുക"
        }

        // if register success set user_name in localStorage 
        // and redirect to user dashbaord
        if(response.status === true) {
            // if user is admin redirect to admin dashboard
            if(response.admin === true) {
                location.replace("/admin/new-entries")
            }else{
                location.replace("/account/dashboard")
            }

            // store profile picture on local storage
            localStorage.setItem("profile_picture", response.profile_picture)
        }
    })


})
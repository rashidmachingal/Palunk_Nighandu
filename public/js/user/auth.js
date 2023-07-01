const registerForm = document.getElementById("register_form")
const loginForm = document.getElementById("login_form")
const userName = document.getElementById("user_name")
const email = document.getElementById("email")
const password = document.getElementById("password")
const authSubmitBtn = document.getElementById("auth_submit_btn")
const authErrorMessage = document.querySelector(".auth-error-message")

// user register handle 
registerForm.addEventListener("submit", (event) => {
    event.preventDefault()
    // basic form validation
    const errors =  formValidation([userName, email, password])
    if(errors.length !== 0) return
    
    const registerData = {
        user_name: userName.value,
        email:email.value,
        password:password.value
    }

    // change button text to loading
    authSubmitBtn.innerHTML = "loading..."

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
            localStorage.setItem("user_name", response.user_name)
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
            localStorage.setItem("user_name", response.user_name)
            location.replace("/account/dashboard")
        }
    })


})
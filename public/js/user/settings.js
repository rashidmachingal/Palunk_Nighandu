const changeProfileForm = document.getElementById("change_profile_form")
const changeProfileUpdateButton = document.getElementById("change_profile_update_btn")

changeProfileForm.addEventListener("submit", async (event) => {
    event.preventDefault()
    changeProfileUpdateButton.innerHTML = "updating..."
    const url = localStorage.getItem("profile_picture")
    const fileName = decodeURIComponent(url.split("/").pop().split("?")[0]);
    const numericPart = fileName.split("/").pop();
    await profilePicutureUpload(numericPart)
    location.reload()
})
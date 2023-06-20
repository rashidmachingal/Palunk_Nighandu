const addPopupForm = document.getElementById("add_popup_form")
const popupContainer = document.getElementById("add_popup_container")
const newMeaningBtnInResult = document.getElementById("new_meaning_btn")
const addCloseIcon = document.getElementById("add_close_icon")

// open add new meaning popup
newMeaningBtnInResult.addEventListener("click", () => {
    popupContainer.style.display = "flex"
})

// close add new meaning popup
addCloseIcon.addEventListener("click", () => {
    popupContainer.style.display = "none"
})

// add new meaning popup submit
addPopupForm.addEventListener("submit", (event) => {
    event.preventDefault()
    // form validation
    const errors = formValidation([malayalamMeaning])
    if(errors.length !== 0) return 

    // data for submit
    let newData = {
        definition:malayalamMeaning.value,
        part_of_speech:partOfSpeech.value
    }
    
    // change button text to loading
    submitButton.innerHTML = "loading..."
    
    // add new meaning - api call
    // add body in options
    options_post.body = JSON.stringify(newData)
    fetch(`/add-new-meaning/${englishWord.value}`, options_post).then((res) => {
    if(res.status === 200 ){
        alert(`✅ മല്ലു നിഘണ്ടുവിന്റെ ഭാഗമയതിൽ നന്ദി. നിങ്ങളുടെ പദം അവലോകനത്തിനു ശേഷം നിഘണ്ടുവില്‍ ചേര്‍ക്കുന്നതാണ്‌.`)
        location.reload()
    }
    })
})
const editPopupForm = document.getElementById("edit_popup_form")
const editPopupContainer = document.getElementById("edit_popup_container")
const editMeaningIcon = document.getElementById("edit_meaing_icon")
const editCloseIcon = document.getElementById("edit_close_icon")
const submitButton = document.getElementById("edit_submit_btn")
const englishWord = document.getElementById("edit_english_word")
const partOfSpeech = document.getElementById("edit_part_of_speech")
const malayalamMeaning = document.getElementById("edit_malayalam_meaning")

let meaningId = ""
let wordId = ""

// open add new meaning popup
function handleEdit(_id, data) {
    const clickedDataforEdit = JSON.parse(data);
    malayalamMeaning.value = clickedDataforEdit?.definition
    partOfSpeech.value = clickedDataforEdit?.part_of_speech
    meaningId = clickedDataforEdit?._id
    wordId = _id
    editPopupContainer.style.display = "flex"
}

// close edit meaning popup
editCloseIcon.addEventListener("click", () => {
    editPopupContainer.style.display = "none"
})

// edit word popup submit
editPopupForm.addEventListener("submit", (event) => {
    event.preventDefault()
    // form validation
    const errors = formValidation([malayalamMeaning, englishWord])
    if(errors.length !== 0) return 

    const updateData = {
          _id: meaningId,
          definition:malayalamMeaning.value,
          part_of_speech:partOfSpeech.value
    }

    // change button text to loading
    submitButton.innerHTML = "loading..."

    // edit word meaning - api call
    options_post.body = JSON.stringify(updateData)
    fetch(`/edit-word-meaning/${wordId}`, options_post).then((res) => {
        if(res.status === 200){
            alert(`✅ മല്ലു നിഘണ്ടുവിന്റെ ഭാഗമയതിൽ നന്ദി. നിങ്ങളുടെ തിരുത്തൽ അവലോകനത്തിനു ശേഷം നിഘണ്ടുവില്‍ ചേര്‍ക്കുന്നതാണ്‌.`)
            location.reload()
        }
    })

})
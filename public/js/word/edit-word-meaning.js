const englishWord = document.getElementById("english_word")
const partOfSpeech = document.getElementById("part_of_speech")
const malayalamMeaning = document.getElementById("malayalam_meaning")
const submitButton = document.getElementById("submit_btn")

const editPopupForm = document.getElementById("edit_popup_form")
const editPopupContainer = document.getElementById("edit_popup_container")
const editMeaningIcon = document.getElementById("edit_meaing_icon")
const editCloseIcon = document.getElementById("edit_close_icon")
let wordId = ""

// open add new meaning popup
function handleEdit(data) {
    const clickedDataforEdit = JSON.parse(data);
    malayalamMeaning.value = clickedDataforEdit?.definition
    partOfSpeech.value = clickedDataforEdit?.part_of_speech
    wordId = clickedDataforEdit?._id
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

    let updateData = 
        {
          _id: wordId,
          definition:malayalamMeaning.value,
          part_of_speech:partOfSpeech.value
        }

   console.log("@updateData", updateData)
})
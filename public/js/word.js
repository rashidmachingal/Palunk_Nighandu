// form elements start
const addNewWordForm = document.getElementById("add_new_word")
const englishWord = document.getElementById("english_word")
const partOfSpeech = document.getElementById("part_of_speech")
const malayalamMeaning = document.getElementById("malayalam_meaning")
const submitButton = document.getElementById("submit_btn")
// form elements end

// add-new-word page elements start
const addPreview = document.querySelector(".add-preview")
const errorMessage = document.getElementById("error_message")
const addNewMeaningBtn = document.getElementById("add_new_meaning")
// add-new-word page elements emd

// popup elements start 
const popupForm = document.getElementById("popup_form")
const popupContainer = document.getElementById("popup_container")
const closeIcon = document.getElementById("close_icon")
const addNewMeaningBtnInResult = document.getElementById("add_new_meaning_btn")
// popup elements end


// display error message function for input field
function displayErrorMessage(element, status) {
    const errorSpan = element.nextElementSibling;

    if(status === false){
        errorSpan.innerHTML = "ദയവായി കളം പൂരിപ്പിക്കുക";
    }else{
        errorSpan.innerHTML = ""
    }
}

// fetch post option
let options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
}


// =================== add-new-meaning page script start ===================

// array for malayalam meanings
let Meanings = []

// unique id for meanings
let id = 0

// add malayalam meaning
addNewMeaningBtn?.addEventListener("click", (event) => {
    event.preventDefault()
    let clicked = false

    // if malayalam meaning empty show error message
    if(malayalamMeaning.value === ""){
        if(clicked) return
        displayErrorMessage(malayalamMeaning, false)
        clicked = true
    }else{
        // remove error message
        displayErrorMessage(malayalamMeaning, true)

        // data for push
        const data = {
            part_of_speech: partOfSpeech.value,
            definition: malayalamMeaning.value
        }

        // push new malayalam meaning to array
        Meanings.push(data)
        // increment id value
        id++
        // display meanings in ui
        const section = `
        <div class="add-preview-mn" >${partOfSpeech.value !== "-" ? partOfSpeech.value + ":" : ""} ${malayalamMeaning.value}
         <i class="fa-solid fa-trash" id=${id} onclick="handleRemove('${id}','${malayalamMeaning.value}')" ></i>
        </div>
        `
        addPreview.insertAdjacentHTML("afterbegin", section)

        // clear malayalam meaning field
        malayalamMeaning.value = ""
    }
})

// remove meaning
function handleRemove(id, definition) {
    // remove meaning from Meanings array 
    const filteredArray = Meanings.filter((data) => {
        return data.definition !== definition
    })

    Meanings = []
    Meanings.push(...filteredArray)

    // remove meaning form ui
    const meaningForRemove = document.getElementById(id) 
    const parentElement = meaningForRemove.parentNode;
    parentElement.remove()
}

// final form submission
addNewWordForm.addEventListener("submit", (event) => {
    event.preventDefault()
    let clicked = false

    // show error if english word empty
    if(englishWord.value === ""){
        if(clicked === true) return
       displayErrorMessage(englishWord, false)
       clicked = true
    }else{
        // remove error message
        displayErrorMessage(englishWord, true)

        // remove error message if there is malayalam meaning
        let spanElement = errorMessage.getElementsByTagName("span")[0];
        spanElement.innerHTML = ""

        // show error message if there is no malayalam meaning
        if(Meanings.length === 0) return spanElement.innerHTML = "ദയവായി ഒരു മലയാളം അർത്ഥമെങ്കിലും ചേർക്കുക"

        // change button text to loading
        submitButton.innerHTML = "loading..."

        // final data for submission
        const finalData = {
            english_word: englishWord.value.trim().toLowerCase(),
            meanings: Meanings
        }

        // add body in options
        options.body = JSON.stringify(finalData)

        // add new word - api call
        fetch("/add-new-word", options ).then((res) => {
            // if word already exists
            if(res.status === 400){
                alert(`${finalData.english_word} എന്ന വാക്ക് ഇതിനകം തന്നെ നിഘണ്ടുവിൽ ഉണ്ട്. പുതിയ അർഥം ചേർക്കാൻ ${finalData.english_word} എന്ന വാക്കിന്റെ പേജ് സന്ദർശിക്കുക`)
                location.reload()
            }

            // if word added successfully
            if(res.status === 201){
                alert(`✅ മല്ലു നിഘണ്ടുവിന്റെ ഭാഗമയതിൽ നന്ദി. നിങ്ങളുടെ പദം അവലോകനത്തിനു ശേഷം നിഘണ്ടുവില്‍ ചേര്‍ക്കുന്നതാണ്‌.`)
                location.reload()
            }
        })  
    }
})

// =================== add-new-meaning page script end ===================

// =================== add new-meaning popup script start ===================

// open add new meaning popup
addNewMeaningBtnInResult.addEventListener("click", () => {
    popupContainer.style.display = "flex"
})

// close add new meaning popup
closeIcon.addEventListener("click", () => {
    popupContainer.style.display = "none"
})

// add new meaning popup submit
popupForm.addEventListener("submit", (event) => {
    event.preventDefault()
    let clicked = false

    // if malayalam meaning empty show error message
    if(malayalamMeaning.value === ""){
        if(clicked) return
        displayErrorMessage(malayalamMeaning, false)
        clicked = true
    }else{
        // remove error message
        displayErrorMessage(malayalamMeaning, true)

        // data for submit
        let newData = {
            definition:malayalamMeaning.value,
            part_of_speech:partOfSpeech.value
        }
    
        // change button text to loading
        submitButton.innerHTML = "loading..."
    
        // add new meaning - api call
        // add body in options
        options.body = JSON.stringify(newData)
        fetch(`/add-new-meaning/${englishWord.value}`, options).then((res) => {
            if(res.status === 200 ){
                alert(`✅ മല്ലു നിഘണ്ടുവിന്റെ ഭാഗമയതിൽ നന്ദി. നിങ്ങളുടെ പദം അവലോകനത്തിനു ശേഷം നിഘണ്ടുവില്‍ ചേര്‍ക്കുന്നതാണ്‌.`)
                location.reload()
            }
        })
    }

})
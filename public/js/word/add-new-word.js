const addNewWordform = document.getElementById("add_new_word_form")
const englishWord = document.getElementById("english_word")
const partOfSpeech = document.getElementById("part_of_speech")
const malayalamMeaning = document.getElementById("malayalam_meaning")
const submitButton = document.getElementById("submit_btn")
const addPreview = document.querySelector(".add-preview")
const errorMessage = document.getElementById("error_message")
const addNewMeaningBtn = document.getElementById("add_new_meaning")

// array for malayalam meanings
let Meanings = []

// unique id for meanings
let id = 0

// add malayalam meaning
addNewMeaningBtn?.addEventListener("click", (event) => {
    event.preventDefault()

    // form validation
    const errors = formValidation([malayalamMeaning])
    if(errors.length !== 0) return

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
addNewWordform.addEventListener("submit", (event) => {
    event.preventDefault()
    // form validation
    const errors = formValidation([englishWord])
    if(errors.length !== 0) return

    // show error message if there is no malayalam meaning
    let spanElement = errorMessage.getElementsByTagName("span")[0];
    if(Meanings.length === 0) return spanElement.innerHTML = "ദയവായി ഒരു മലയാളം അർത്ഥമെങ്കിലും ചേർക്കുക"

    // remove error message if there is malayalam meaning
    spanElement.innerHTML = ""

    // change button text to loading
    submitButton.innerHTML = "loading..."

    // final data for submission
    const finalData = {
        english_word: englishWord.value.trim().toLowerCase(),
        meanings: Meanings
    }

    // add body in options
    options_post.body = JSON.stringify(finalData)

    // add new word - api call
    fetch("/add-new-word", options_post ).then((res) => {
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
})
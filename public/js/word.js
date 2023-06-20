const addNewWordForm = document.getElementById("add_new_word")
const publishButton = addNewWordForm.querySelector("button[type='submit']");
const englishWord = document.getElementById("english_word")
const partOfSpeech = document.getElementById("part_of_speech")
const malayalamMeaning = document.getElementById("malayalam_meaning")
const addNewMeaningBtn = document.getElementById("add_new_meaning")
const errorMessage = document.getElementById("error_message")
const addPreview = document.querySelector(".add-preview")

// display error message for input field
function displayErrorMessage(element, status) {
    const errorSpan = element.nextElementSibling;

    if(status === false){
        errorSpan.innerHTML = "ദയവായി കളം പൂരിപ്പിക്കുക";
    }else{
        errorSpan.innerHTML = ""
    }
}

// array for malayalam meanings
let Meanings = []

// unique id for meanings
let id = 0

// add malayalam meaning
addNewMeaningBtn.addEventListener("click", (event) => {
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
        publishButton.innerHTML = "loading..."

        // final data for submission
        const finalData = {
            english_word: englishWord.value.trim().toLowerCase(),
            meanings: Meanings
        }

        // add new word - api call
        const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(finalData)
        }

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
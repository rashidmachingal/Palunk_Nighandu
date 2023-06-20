const searchContainer = document.getElementById("search_container")
const searchInput = document.getElementById("search")
const searchSuggestion = document.getElementById("suggestion")
const searchSuggestionList = document.getElementById("suggestion_list")
const searchForm = document.getElementById("search_form")
const searchButton = document.getElementById("search_button")

// show or hide search suggestions based on user interaction
function displayOrHide(){
    if(searchInput.value.length === 0){
        searchSuggestion.style.display = "none"
    }else{
        searchSuggestion.style.display = "initial"
    }
}

window.addEventListener('click', (event) => {
    if(searchContainer.contains(event.target)){
      displayOrHide()
    }else{
      searchSuggestion.style.display = "none"
    }
})

//search suggestion datamuse api call + apend search suggestion to ui
searchInput.addEventListener("input", (e) => {
  displayOrHide()
  fetch(`https://api.datamuse.com/sug?s=${e.target.value}&max=5`).then((res) => {
    return res.json()
  }).then((data) => {
    searchSuggestionList.innerHTML = ""
    data.forEach((el) => {
      // create a new <li> element
      let newListItem = document.createElement("li")
      // create a new <a> element
      let newLink = document.createElement("a")
      // remove space and added hifen for href
      const link = el.word.replace(/\s/g, "-")
      newLink.href = `/english-malayalam/${link}`
      newLink.appendChild(newListItem);
      newListItem.textContent = el.word
      searchSuggestionList.appendChild(newLink)
    })
  })
})

// handle search
searchForm.addEventListener("submit" , (e) => {
  e.preventDefault()
  handleSearch()
})

searchButton.addEventListener("click", () => {
  handleSearch()
})

function handleSearch() {
  let searchValue = searchInput.value.trim().replace(/\s+/g, "-")
  if(!searchValue || /\d/.test(searchValue) ) return
  window.location.href = `/english-malayalam/${searchValue}` 
}
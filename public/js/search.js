const searchContainer = document.getElementById("search_container")
const searchInput = document.getElementById("search")
const searchSuggestion = document.getElementById("suggestion")
const searchForm = document.getElementById("search_form")
const searchButton = document.getElementById("search_button")
const PATH_NAME = window.location.pathname

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
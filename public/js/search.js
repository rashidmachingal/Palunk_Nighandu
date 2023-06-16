const searchContainer = document.getElementById("search_container")
const searchInput = document.getElementById("search")
const searchSuggestion = document.getElementById("suggestion")

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
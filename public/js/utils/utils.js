// form validation function
function formValidation(inputFields) {
    let errors = []

    inputFields.forEach((field) => {
        const errorMessageSpan = field.nextElementSibling;
        if(field.value === ""){
            errorMessageSpan.innerHTML = "ദയവായി കളം പൂരിപ്പിക്കുക"
            errors.push(field)
        }else{
            errorMessageSpan.innerHTML = ""
        }
    });

    return errors
}

// fetch post option
let options_post = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
}
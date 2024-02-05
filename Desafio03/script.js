let email = document.querySelector('#email')
let form = document.querySelector('form')
let error = document.querySelector('#error_email')
let button = document.querySelector('.button_submit')
let popup = document.querySelector('dialog')
let textmail = document.querySelector('.text_popup')
let buttonClose = document.querySelector('.button_close')
let invalid = document.querySelector('#email')

function validityEmail(email){
    let emailPatern = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
    return emailPatern.test(email)
}

form.addEventListener('submit', (e) =>{
    e.preventDefault();
    if (!email.value) {
        error.textContent = 'Valid email required';
        invalid.classList.add('invalid_email')

    } else if (!validityEmail(email.value)){
        error.textContent = "Email invalid";
        invalid.classList.add('invalid_email')
    }
    
});

email.addEventListener('keyup', (e) => {
    let emailValue = e.currentTarget.value
    if(!emailValue.length){
        error.textContent = 'Valid email required'
        invalid.classList.add('invalid_email')
    }else{
        error.textContent = "";
        invalid.classList.remove('invalid_email')
    }
})

button.onclick = function(e){
    e.preventDefault()

    if(validityEmail(email.value) == true){
        popup.showModal()
        textmail.innerHTML = `A confirmation email has been sent to <strong> ${email.value} </strong>. 
    Please open it and click the button inside to confirm your subscription.`
    }else{
        error.textContent = 'Valid email required'
    }
    
    buttonClose.onclick = function(){
        popup.close()
    }
}
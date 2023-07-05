let valutation = document.querySelector('.valutation')
let stars = valutation.getElementsByClassName('stars')
let button = document.querySelector('.submit_button')
let popUp = document.querySelector('dialog')
let popUpContent = document.querySelector('.result')
let buttonClose = document.querySelector('.button_close') 


for (var i = 0; i < stars.length; i++) {
    stars[i].addEventListener("click", function() {
      let current = document.getElementsByClassName("active");
  
      if (current.length > 0) {
        current[0].className = current[0].className.replace(" active", "");
      }
  
      this.className += " active";
    });
  }

button.onclick = function(){
    popUp.showModal()
    let actived = document.querySelector('.stars.active').innerHTML
    popUpContent.innerHTML = `You selected ${actived} out of 5`
}

buttonClose.onclick = function(){
    popUp.close()
}
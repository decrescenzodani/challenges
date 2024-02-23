const inputBill = document.querySelector("#input-bill")
const inputCustom = document.querySelector("#input-custom")
const inputValidation = document.querySelector("span.input-validation")
const percentageButtons = document.querySelectorAll(".div-tips button")
const inputNumberOfPeople = document.querySelector("#input-of-people")
const resultPerPerson = document.querySelector("#result-per-person")
const totalPerPerson = document.querySelector("#total-per-person")
const resetButton = document.querySelector("#reset-button")
const calculateButton = document.querySelector("#calculate-button")
console.log(percentageButtons)

calculateButton.addEventListener("click", function (e) {
    e.preventDefault()
    const inputBillEmpty = !inputBill.value || inputBill.value == 0
    const inputNumberPeopleEmpty = !inputNumberOfPeople.value || inputNumberOfPeople.value == 0

    if(inputBillEmpty){
        console.log(inputBill.previousElementSibling.childNodes)
        inputBill.previousElementSibling.children[1].innerHTML = "Can't be zero"
        inputBill.classList.add("error-input-validation")
    }

    if(inputNumberPeopleEmpty){
        inputNumberOfPeople.previousElementSibling.children[1].innerHTML = "Can't be zero"
        inputNumberOfPeople.classList.add("error-input-validation")
    }

    if(inputBillEmpty || inputNumberPeopleEmpty){
        return
    }
    
    let isButtonActive = document.querySelector("button.active")
    console.log(isButtonActive)
    const valuePercentage = isButtonActive ? isButtonActive.value : inputCustom.value

    const valueInputBill = Number(inputBill.value)
    const valueInputNumberOfPeople = Number(inputNumberOfPeople.value)

    const valuePercentagePerson = (valueInputBill * (valuePercentage / 100)) / valueInputNumberOfPeople
    resultPerPerson.innerHTML = `$ ${valuePercentagePerson.toFixed(2)}`

    const valueTotalBillPerson = (valueInputBill / valueInputNumberOfPeople) + valuePercentagePerson
    totalPerPerson.innerHTML = `$ ${valueTotalBillPerson.toFixed(2)}`

    resetButton.removeAttribute("disabled")

})

percentageButtons.forEach(function (button) {
    button.addEventListener("click", function (e) {
        const target = e.currentTarget
        percentageButtons.forEach(element => element.classList.remove("active"))
        target.classList.add("active")
    })
})

resetButton.addEventListener("click", function(){
    //location.reload()
    this.setAttribute("disabled", true)
    inputBill.value = ""
    inputCustom.value = ""
    inputNumberOfPeople.value = ""
    resultPerPerson.innerHTML = "$ 0.00"
    totalPerPerson.innerHTML = "$ 0.00"

    percentageButtons.forEach(element => element.classList.remove("active"))
    
})
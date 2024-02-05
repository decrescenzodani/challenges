let button = document.querySelector('#button')
let change = document.querySelector('#plan_change')
let modal = document.querySelector('dialog')
let modalContent = document.querySelector('.modal_content')
let buttonClose = document.querySelector('#button_close')
let orderCancel = document.querySelector('.order_cancel')

button.onclick =  function(){
    modal.showModal()
    modalContent.innerHTML = 'Successfully selected plan!'

    buttonClose.onclick = function(){
        modal.close()
    }
}

change.onclick = function(){
    modal.showModal()
    modalContent.innerHTML = 
    `<select class="select_plan">
        <option selected>Select a plan.</option>
        <option value="1" id="annual">Annual Plan</option>
        <option value="2" id="semester">Semester Plan</option>
        <option value="3" id="monthly">Monthly Plan</option>
    </select>`
    
    buttonClose.onclick = function(){
        let plan = document.querySelector('select').value
        let planContent = document.querySelector('.plan_content')
        let whichPlan = document.querySelector('.which_plan')

        if(plan == 2){
            planContent.innerHTML = 'Semester Plan'
            whichPlan.innerHTML = '$79.99/six months'
        }else if (plan == 3){
            planContent.innerHTML = 'Monthly Plan'
            whichPlan.innerHTML = '$109.99/month'
        }else{
            planContent.innerHTML = 'Annual Plan'
            whichPlan.innerHTML = '$59.99/year'
        }
    modal.close()
    }
}

orderCancel.onclick = function(){
    modal.showModal()
    modalContent.innerHTML = 'Order canceled successfully!'

    buttonClose.onclick = function(){
        modal.close()
    }
}
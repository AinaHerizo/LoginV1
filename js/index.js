document.addEventListener("DOMContentLoaded", (event) => {
// GLOBAL VARIABLE
    // Animation du cercle de show passWord
    const eyeBall = document.querySelector("#eye-password circle")
    // Eye Ball Positions
    const eyeBallPosition = [5,7,3]
    let indexEyeBallPosition = 0
    // Eye show-closed
    const eye = document.querySelector("#eye-password")
    const eyePath = document.querySelector("#eye-password path")
    const eyeOpen = "M 0 3 C 3 0 7 0 10 3 M 0 3 C 3 6 7 6 10 3"
    const eyeClose = "M 0 3 C 3 6 7 6 10 3 M 0 3 C 3 6 7 6 10 3"
    // eye open
    let isOpen = true
    // Test password
    const passwordMessage = document.querySelector(".password-checkResult")
    // Formulaire
    const formField = document.querySelectorAll('.form-body input')
    const form = document.querySelector("#form-submit")
    const email = document.querySelector('#email')
    const password = document.querySelector("#password")
    // Modal
    const modal = document.querySelector(".modal")
    const modalClose = document.querySelector(".closeModal")
    
    

// FIELD PASSWORD
    // Animation on eye open
    const animateEyeBall = () => {
        eyeBall.setAttribute("cx", eyeBallPosition[indexEyeBallPosition]);
        indexEyeBallPosition = (indexEyeBallPosition + 1) % eyeBallPosition.length;
        eyeBallAnimation = setTimeout(animateEyeBall, 1000);
    }
    // Arrête le cycle setTimeout
    const stopEyeBallAnimation = () => {
        clearTimeout(eyeBallAnimation);
    };
    // Function on eye click event
    eye.addEventListener("click", ()=>{
        if (isOpen) {
            eyePath.setAttribute("d", eyeOpen)
            password.setAttribute("type", "text")
            eyeBall.setAttribute("class", "open")
            // Animate eyeBall
            animateEyeBall()
        }
        else {
            eyePath.setAttribute("d", eyeClose)
            password.setAttribute("type", "password")
            eyeBall.setAttribute("class", "close")
            // Stop animate eyeBall
            stopEyeBallAnimation()
        }
        isOpen = !isOpen
    })
    // Password verification
    password.addEventListener("keyup", ()=>{
        let passwordInput = password.value
        const hasUpperCase = /[A-Z]/.test(passwordInput)
        const hasNumber = /[0-9]/.test(passwordInput)
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(passwordInput);

        passwordMessage.classList.remove("low", "medium", "good");
        if(passwordInput.length === 0){
            passwordMessage.textContent = "Low"
        }
        else if (passwordInput.length <= 6) {
            passwordMessage.classList.add("low")
            passwordMessage.textContent = "Low (at least 6 character)"
        }
        else if (passwordInput.length > 6 && (hasUpperCase && hasNumber && hasSpecialChar)){
            passwordMessage.classList.add("good")
            passwordMessage.textContent = "Good"
        }
        else if (passwordInput.length > 6 || (passwordInput.length > 6 && (hasUpperCase || hasNumber || hasSpecialChar))){
            passwordMessage.classList.add("medium")
            passwordMessage.textContent = "Medium (use uppercase, number and special character!)" 
        }
    })


// FORM
    // Form submit
    form.addEventListener("submit", (e)=>{
        e.preventDefault();        
        formField.forEach(function(field) {            
            if(field.value.trim() === ""){
                field.classList.add("empty")
                field.setAttribute("placeholder", field.name === "password" ? "You didn't set password" : "You didn't set email")
            }
        });
        if(passwordMessage.classList.contains("good") || passwordMessage.classList.contains("medium")){
            modal.classList.remove('hide')
            modal.classList.add('show')
        }
        else{
            modal.classList.remove('hide')
            modal.classList.add('showWrong')
        }
    })
    email.addEventListener('keyup', ()=>{
        let emailCheck = /[@]/.test(email.value);
        if (email.value.trim()) {
            if (emailCheck){
                email.classList.remove("empty")
            }
            else if(!email.classList.contains("empty")){
                email.classList.add("empty")
                email.setAttribute("placeholder", "You didn't set email")
            }
        }
        else{
            email.classList.add("empty")
        }
    })
    password.addEventListener('keyup', ()=>{
        if(password.value.trim()){
            password.classList.remove("empty")
        }
        else{
            password.classList.add('empty')
            password.setAttribute("placeholder", "You didn't set password")
        }
    })


// MODAL
        modalClose.addEventListener("click", ()=>{
            modal.classList.remove('showWrong', 'show');
            modal.classList.add("hide-exit")
            setTimeout(() => {
                modal.classList.remove("hide-exit")
                modal.classList.add("hide")
            }, 500);
            formField.forEach(field => {
                if(field.getAttribute("type") === "submit"){
                    field.value = "Create Account"    
                }
                else{
                    field.setAttribute("placeholder", field.name === "password" ? "Password" : "Email Address")
                    field.value = ""
                }
            });
            passwordMessage.classList.remove("low", "medium", "good");
        })
}); 
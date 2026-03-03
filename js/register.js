let username= document.querySelector("#username")
let email= document.querySelector("#email")
let password =  document.querySelector("#password")

let registerBtn = document.querySelector("#sign_up")
registerBtn.addEventListener("click" , function(){
    if(username.value ==="" || email.value==="" ||password.value===""){
        alert("please fill that")

    }else{
        // e.preventDefault()
        localStorage.setItem("username" , username.value);
        localStorage.setItem("email" , email.value);
        localStorage.setItem("password" , password.value);

        setTimeout( () => {
            window.location = "login.html"
            ,1500

        })
    }

})
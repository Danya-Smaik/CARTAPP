let email = document.querySelector("#email")
let password = document.querySelector("#password")

let loginBtn = document.querySelector("#sign_in")

let getEmail = localStorage.getItem("email")
let getPassword = localStorage.getItem("password")

loginBtn.addEventListener("click", function (e) {
    e.preventDefault()
    if (email.value === "" || password.value === "") {
        alert("please fill data")
    } else {
        if (getEmail && getEmail.trim().toLowerCase() === email.value.trim().toLowerCase() && getPassword && getPassword === password.value) {
            // Login succeeded: start a session (separate from the permanent account data)
            sessionStorage.setItem("loggedInUser", localStorage.getItem("username"))
            setTimeout(() => {
                window.location = "index.html"
            }, 1500)
        } else {
            alert("email or password is wrong")
        }
    }
})

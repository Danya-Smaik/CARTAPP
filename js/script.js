let userInfo = document.querySelector ("#user_info")
let userD = document.querySelector ("#user")
let links = document.querySelector ("#link")

if (localStorage.getItem("username")){
    links.remove()
    userInfo.style.display ="flex"
    userD.textContent = localStorage.getItem("username")
}
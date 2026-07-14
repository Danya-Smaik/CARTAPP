// ---------- Shared across every page that has the header ----------
// Show the logged-in user's name + hide Login/Sign Up if an active session exists.
// NOTE: we check sessionStorage ("loggedInUser"), not localStorage ("username").
// localStorage holds the permanent account record (survives closing the browser).
// sessionStorage holds only "am I logged in right now" - cleared on Logout,
// and automatically cleared when the browser tab/window is closed.
let userInfo = document.querySelector("#user_info")
let userD = document.querySelector("#user")
let links = document.querySelector("#link")

if (sessionStorage.getItem("loggedInUser")) {
    links.remove()
    userInfo.style.display = "flex"
    userD.textContent = sessionStorage.getItem("loggedInUser")
}

// ---------- Logout: actually end the session ----------
let logoutBtn = document.querySelector("#logout")
if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
        sessionStorage.removeItem("loggedInUser")
        localStorage.removeItem("ProductsInCart")
        localStorage.removeItem("Favorites")
        // the link's href="login.html" still navigates normally after this runs
    })
}

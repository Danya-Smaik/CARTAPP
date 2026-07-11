// ---------- Header: show user info if logged in ----------
let userInfo = document.querySelector("#user_info")
let userD = document.querySelector("#user")
let links = document.querySelector("#link")

if (localStorage.getItem("username")) {
    links.remove()
    userInfo.style.display = "flex"
    userD.textContent = localStorage.getItem("username")
}

// ---------- Draw cart page products ----------
let allProducts = document.querySelector(".products")
let productsInCart = JSON.parse(localStorage.getItem("ProductsInCart")) || []
productsInCart = productsInCart.map((item) => ({ ...item, quantity: item.quantity || 1 }))

drawCartProducts(productsInCart)

function drawCartProducts(products) {
    if (products.length === 0) {
        allProducts.innerHTML = `<p>Your cart is empty.</p>`
        let totalDiv = document.querySelector(".cart_total")
        if (totalDiv) totalDiv.remove()
        return
    }
    let y = products.map((item) => {
        return `
         <div class="product_item">
                    <img src="${item.imageUrl}" alt="">
                    <div class="product_item_desc">
                        <h2>${item.title}</h2>
                        <p>${item.des}</p>
                        <span>${item.color} · ${item.category}</span>
                        <p class="price">$${item.price} x ${item.quantity} = $${item.price * item.quantity}</p>
                    </div>
                    <div class="product_item_action">
                        <div class="qty_control">
                            <button class="qty_btn" onClick="decreaseQty(${item.id})">-</button>
                            <span class="qty_value">${item.quantity}</span>
                            <button class="qty_btn" onClick="increaseQty(${item.id})">+</button>
                        </div>
                        <button class="add_to_cart" onClick="RemoveFromCart(${item.id})">Remove From Cart</button>
                        <i class="far fa-heart fav"></i>
                    </div>
                </div>
                `
    })
    let total = products.reduce((sum, item) => sum + item.price * item.quantity, 0)
    y.push(`<div class="cart_total"><h2>Total: $${total}</h2></div>`)
    allProducts.innerHTML = y.join("")
}

function getCart() {
    return JSON.parse(localStorage.getItem("ProductsInCart")) || []
}

function saveCart(items) {
    localStorage.setItem("ProductsInCart", JSON.stringify(items))
    drawCartProducts(items)
    refreshCartHeader(items)
}

function increaseQty(id) {
    let items = getCart()
    let item = items.find((p) => p.id === id)
    if (item) item.quantity += 1
    saveCart(items)
}

function decreaseQty(id) {
    let items = getCart()
    let item = items.find((p) => p.id === id)
    if (item) {
        item.quantity -= 1
        if (item.quantity <= 0) {
            items = items.filter((p) => p.id !== id)
        }
    }
    saveCart(items)
}

function RemoveFromCart(id) {
    let items = getCart().filter((p) => p.id !== id)
    saveCart(items)
}

// ---------- Header cart badge + dropdown (same behavior as script.js) ----------
let cartsproductDiv = document.querySelector(".carts_products div")
let badge = document.querySelector(".badge")

function refreshCartHeader(items) {
    cartsproductDiv.innerHTML = items.map((item) => `
        <div class="dropdown_item">
            <div class="dropdown_item_info">
                <h4>${item.title}</h4>
                <p>Price: $${item.price}</p>
            </div>
            <div class="qty_control">
                <button class="qty_btn" onClick="event.stopPropagation(); decreaseQty(${item.id})">-</button>
                <span class="qty_value">${item.quantity}</span>
                <button class="qty_btn" onClick="event.stopPropagation(); increaseQty(${item.id})">+</button>
            </div>
        </div>
    `).join("")
    let totalQty = items.reduce((sum, item) => sum + item.quantity, 0)
    if (totalQty > 0) {
        badge.style.display = "block"
        badge.innerHTML = totalQty
    } else {
        badge.style.display = "none"
    }
}
refreshCartHeader(productsInCart)

let shoppingCartIcon = document.querySelector(".shopping-cart")
let cartsProducts = document.querySelector(".carts_products")
shoppingCartIcon.addEventListener("click", opencart)

function opencart() {
    if (cartsproductDiv.innerHTML != "") {
        if (cartsProducts.style.display == "block") {
            cartsProducts.style.display = "none"
        } else {
            cartsProducts.style.display = "block"
        }
    }
}

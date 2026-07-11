// ---------- Header: show user info if logged in ----------
let userInfo = document.querySelector("#user_info")
let userD = document.querySelector("#user")
let links = document.querySelector("#link")

if (localStorage.getItem("username")) {
    links.remove()
    userInfo.style.display = "flex"
    userD.textContent = localStorage.getItem("username")
}

// ---------- Product data ----------
let allProducts = document.querySelector(".products")
let products = [
    {
        id: 1,
        title: "airpods",
        color: "pink",
        imageUrl: "images/airpods.jpg",
        des: "Generic M10 TWS True Wireless Bluetooth Earbuds Earphone with LED Digital",
        price: 40 ,
        category:"airpods"
    },
    {
        id: 2,
        title: "Smart Watch",
        color: "black",
        imageUrl: "images/smartwatch.jpg",
        des: "Modern smartwatch with fitness tracking, heart rate monitor, and stylish design suitable for everyday activities.",
        price: 80,
        category:"watch"
    },
    {
        id: 3,
        title: "Head Phone",
        color: "white",
        imageUrl: "images/headphonewhite.jpg",
        des: "Comfortable over-ear headphones delivering deep bass and immersive sound experience for music lovers",
        price: 60,
        category:"Head phone"
    },
    {
        id: 4,
        title: "Head Phone",
        color: "black",
        imageUrl: "images/headphone.jpg",
        des: "Premium wireless headset with crystal clear sound, soft ear cushions, and noise isolation for an immersive listening experience",
        price: 120,
        category:"Head phone"
    },
    {
        id: 5,
        title: "printer",
        color: "black",
        imageUrl: "images/printer.jpg",
        des: "Wireless all-in-one printer with print, scan, copy, and fax functions. Includes automatic duplex printing and is perfect for home office use..",
        price:  70,
        category:"printer"
    },
    {
        id: 6,
        title: "Smart Fitness Watch",
        color: "black",
        imageUrl: "images/smartwatch2.jpg",
        des: "Smart fitness watch with Bluetooth calls, health tracking, 110 sports modes, and IP68 water resistance. Compatible with Android and iPhone",
        price: 120 ,
        category:"watch"
    },
    {
        id: 7,
        title: "Airpods Sports Ear Hooks",
        color: "white",
        imageUrl: "images/airpods2.jpg",
        des: "Comfortable anti-slip silicone ear hooks for AirPods, offering a secure fit during sports and everyday use",
        price: 20 ,
        category:"airpods"
    },
]

function drawItem(list = products) {
    if (list.length === 0) {
        allProducts.innerHTML = `<p>No products match your search.</p>`
        return
    }
    let y = list.map((item) => {
        return `
         <div class="product_item">
                    <img src="${item.imageUrl}" alt="">
                    <div class="product_item_desc">
                        <h2>${item.title}</h2>
                        <p>${item.des}</p>
                        <span>${item.color} · ${item.category}</span>
                        <p class="price">$${item.price}</p>
                    </div>
                    <div class="product_item_action">
                        <button class="add_to_cart" onClick="addToCart(${item.id})">Add to Cart</button>
                        <i class="far fa-heart fav"></i>
                    </div>
                </div>
                `
    })
    allProducts.innerHTML = y.join("")
}
drawItem()

// ---------- Search by product name ----------
let searchInput = document.querySelector("#search_input")
let searchBtn = document.querySelector("#search_btn")

function runSearch() {
    let keyword = searchInput.value.trim().toLowerCase()
    let filtered = products.filter((item) => item.title.toLowerCase().includes(keyword))
    drawItem(filtered)
}

searchInput.addEventListener("keyup", runSearch)
searchBtn.addEventListener("click", runSearch)

// ---------- Cart dropdown + badge ----------
let cartsproductDiv = document.querySelector(".carts_products div")
let badge = document.querySelector(".badge")

// Load any previously saved cart so it survives a page refresh
let addItem = JSON.parse(localStorage.getItem("ProductsInCart")) || []
addItem = addItem.map((item) => ({ ...item, quantity: item.quantity || 1 }))

function refreshCartUI() {
    cartsproductDiv.innerHTML = addItem.map((item) => `
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
    let totalQty = addItem.reduce((sum, item) => sum + item.quantity, 0)
    if (totalQty > 0) {
        badge.style.display = "block"
        badge.innerHTML = totalQty
    } else {
        badge.style.display = "none"
    }
}
refreshCartUI()

function increaseQty(id) {
    let item = addItem.find((p) => p.id === id)
    if (item) item.quantity += 1
    localStorage.setItem("ProductsInCart", JSON.stringify(addItem))
    refreshCartUI()
}

function decreaseQty(id) {
    let item = addItem.find((p) => p.id === id)
    if (item) {
        item.quantity -= 1
        if (item.quantity <= 0) {
            addItem = addItem.filter((p) => p.id !== id)
        }
    }
    localStorage.setItem("ProductsInCart", JSON.stringify(addItem))
    refreshCartUI()
}

function addToCart(id) {
    // Require login before adding to cart
    if (!localStorage.getItem("username")) {
        window.location = "login.html"
        return
    }

    let existing = addItem.find((item) => item.id === id)
    if (existing) {
        existing.quantity += 1
    } else {
        let choosenItem = products.find((item) => item.id === id)
        addItem = [...addItem, { ...choosenItem, quantity: 1 }]
    }
    localStorage.setItem("ProductsInCart", JSON.stringify(addItem))
    refreshCartUI()
}

// ---------- Open/close cart dropdown ----------
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

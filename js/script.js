// ---------- Product rendering ----------
let allProducts = document.querySelector(".products")

// ---------- Favorites ----------
let favoritesList = document.querySelector(".favorites_list")
let favorites = JSON.parse(localStorage.getItem("Favorites")) || []

function isFavorite(id) {
    return favorites.includes(id)
}

function toggleFavorite(id) {
    if (isFavorite(id)) {
        favorites = favorites.filter((favId) => favId !== id)
    } else {
        favorites = [...favorites, id]
    }
    localStorage.setItem("Favorites", JSON.stringify(favorites))
    runSearch()
    drawFavorites()
}

function drawFavorites() {
    if (!favoritesList) return
    let favoriteProducts = products.filter((item) => isFavorite(item.id))
    if (favoriteProducts.length === 0) {
        favoritesList.innerHTML = `<p>You haven't added any favorites yet.</p>`
        return
    }
    let y = favoriteProducts.map((item) => {
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
                        <i class="fas fa-heart fav active" onClick="toggleFavorite(${item.id})"></i>
                    </div>
                </div>
                `
    })
    favoritesList.innerHTML = y.join("")
}

function drawItem(list = products) {
    if (list.length === 0) {
        allProducts.innerHTML = `<p>No products match your search.</p>`
        return
    }
    let y = list.map((item) => {
        let heartClass = isFavorite(item.id) ? "fas fa-heart fav active" : "far fa-heart fav"
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
                        <i class="${heartClass}" onClick="toggleFavorite(${item.id})"></i>
                    </div>
                </div>
                `
    })
    allProducts.innerHTML = y.join("")
}
drawItem()
drawFavorites()

// ---------- Search by name + filter by category ----------
let searchInput = document.querySelector("#search_input")
let searchBtn = document.querySelector("#search_btn")
let categoryFilter = document.querySelector("#category_filter")

// Build the category dropdown options from the products list (no manual duplication)
let categories = [...new Set(products.map((item) => item.category))]
categoryFilter.innerHTML += categories.map((cat) => `<option value="${cat}">${cat}</option>`).join("")

function runSearch() {
    let keyword = searchInput.value.trim().toLowerCase()
    let selectedCategory = categoryFilter.value

    let filtered = products.filter((item) => {
        let matchesName = item.title.toLowerCase().includes(keyword)
        let matchesCategory = selectedCategory === "all" || item.category === selectedCategory
        return matchesName && matchesCategory
    })
    drawItem(filtered)
}

searchBtn.addEventListener("click", runSearch)
searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") runSearch()
})

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
    if (!sessionStorage.getItem("loggedInUser")) {
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

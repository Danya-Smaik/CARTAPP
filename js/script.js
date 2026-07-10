let userInfo = document.querySelector ("#user_info")
let userD = document.querySelector ("#user")
let links = document.querySelector ("#link")

if (localStorage.getItem("username")){
    links.remove()
    userInfo.style.display ="flex"
    userD.textContent = localStorage.getItem("username")
}
////////////////////////////////////////
let allProducts = document.querySelector(".products")
let products = [
    {
        id:1,
        title:"airpods",
        color:"pink",
        imageUrl:"images/airpods.jpg"
    },
    {
        id:2,
        title:"Smart Watch",
        color:"balck",
        imageUrl:"images/smartwatch.jpg"
    },
    {
        id:3,
        title:"Head Phone",
        color:"white",
        imageUrl:"images/headphonewhite.jpg"
    },
    {
        id:4,
        title:"Head Phone",
        color:"balck",
        imageUrl:"images/headphone.jpg"
    },
    {
        id:5,
        title:"printer",
        color:"balck",
        imageUrl:"images/printer.jpg"
    },
    {
        id:6,
        title:"Smart Fitness Watch",
        color:"balck",
        imageUrl:"images/smartwatch2.jpg"
    },
    {
        id:7,
        title:"Airpods Sports Ear Hooks",
        color:"white",
        imageUrl:"images/airpods2.jpg"
    },
]
function drawItem(){
    let y = products.map((item) =>{
        return ` 
         <div class="product_item">
                    <img src="${item.imageUrl}" alt="">
                    <div class="product_item_desc">
                        <h2>${item.title}</h2>
                        <p>Generic M10 TWS True Wireless Bluetooth Earbuds Earphone with LED Digital</p>
                        <span>${item.color}</span>
                    </div>
                    <div class="product_item_action">
                        <button class="add_to_cart"onClick="addToCart(${item.id})">Add to Cart</button>
                        <i class="far fa-heart fav"></i>
                    </div>
                </div>
                `
    })
    allProducts.innerHTML = y ;
}
drawItem()

function check(){
    if(localStorage.getItem=("username")){
        window.location=  "cartsproducats.html"
    }else{
        window.location="login.html"
    }
}

function addToCart(id){
    console.log(id)
}


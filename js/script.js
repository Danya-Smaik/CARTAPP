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
        imageUrl:"images/airpods.jpg",
        des :"Generic M10 TWS True Wireless Bluetooth Earbuds Earphone with LED Digital"
    },
    {
        id:2,
        title:"Smart Watch",
        color:"balck",
        imageUrl:"images/smartwatch.jpg",
        des:"Modern smartwatch with fitness tracking, heart rate monitor, and stylish design suitable for everyday activities."
    },
    {
        id:3,
        title:"Head Phone",
        color:"white",
        imageUrl:"images/headphonewhite.jpg",
        des:"Comfortable over-ear headphones delivering deep bass and immersive sound experience for music lovers"
    },
    {
        id:4,
        title:"Head Phone",
        color:"balck",
        imageUrl:"images/headphone.jpg",
        des:"Premium wireless headset with crystal clear sound, soft ear cushions, and noise isolation for an immersive listening experience"
    },
    {
        id:5,
        title:"printer",
        color:"balck",
        imageUrl:"images/printer.jpg" , 
        des:"Wireless all-in-one printer with print, scan, copy, and fax functions. Includes automatic duplex printing and is perfect for home office use.."
    },
    {
        id:6,
        title:"Smart Fitness Watch",
        color:"balck",
        imageUrl:"images/smartwatch2.jpg",
        des:"Smart fitness watch with Bluetooth calls, health tracking, 110 sports modes, and IP68 water resistance. Compatible with Android and iPhone"
    },
    {
        id:7,
        title:"Airpods Sports Ear Hooks",
        color:"white",
        imageUrl:"images/airpods2.jpg",
        des:"Comfortable anti-slip silicone ear hooks for AirPods, offering a secure fit during sports and everyday use"
    },
]
function drawItem(){
    let y = products.map((item) =>{
        return ` 
         <div class="product_item">
                    <img src="${item.imageUrl}" alt="">
                    <div class="product_item_desc">
                        <h2>${item.title}</h2>
                        <p>${item.des}</p>
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
let  cartsproductDiv = document.querySelector(".carts_products div")
function addToCart(id){
     let choosenItem = products.find((item) => item.id===id );
     cartsproductDiv.innerHTML += `<p>${choosenItem.title}</p>`
}


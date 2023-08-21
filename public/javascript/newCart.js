let tbody = document.querySelector(".displayCart");
let apiData= document.querySelector(".apiData");
let items;
let tprice =document.querySelector(".t-price");
let titems=document.querySelector(".t-items");
let totalamt=document.querySelector(".total-amt")
let shopMore=document.querySelector(".shopMore")
let discountprice=document.querySelector(".discount-price")
let signOut=document.querySelector(".signOut")
let similarUsers = [];
let similarProducts = [];
let pastPurchase = [];
let newUser = [];
let cartSubValue = 0;

function init(){
    items = JSON.parse(localStorage.getItem("newCart"))
    console.log(items)
    let cnt=0;
    let amt=0;
    for(let i in items){
        let tr = document.createElement("div");
        tr.classList.add("product-box")
        tr.classList.add("already")
        tr.innerHTML = `
        <div class="image" data-title="No"><img src=${items[i][5]} alt="#"></div>
        <div class="product-detail">
            <div class="product-des" data-title="Description">
                <p class="product-name">${items[i][0].toUpperCase()}</p>
            </div>
            <div class="total-amount" data-title="Total"><span>Rs. ${items[i][2]}</span></div>
            <div class="action" data-title="Remove"><a href="#"><i class="fas fa-trash-alt"></i></a></div>
        </div>
        <div id=""class="qty">
                    <div class="text1"><span id="sortBy">Quantity: </span><select name="" id="sort">
                        <option value="one">1</option>
                        <option value="two">2</option>
                        <option value="three">3</option>     
                        <option value="four">4</option>
                        <option value="five">5</option>
                    </select></div>
        </div>
        `
    ++cnt;
    amt+=parseInt(items[i][2]);
    tbody.append(tr)
    }
    
    tprice.innerHTML=`&#8377; ${amt}`;
    titems.textContent=cnt;

    if(amt!==0){
        totalamt.innerHTML=`<b>&#8377; ${(amt-0.12*amt).toFixed(2)}</b>`
    }
    else{
        totalamt.innerHTML=`<b>&#8377; 0</b>`
    }
    if(amt!=0)
        discountprice.innerHTML=`&#8377; ${(0.12*amt).toFixed(2)}`

}
init()

let filterArr=data
let filterFashionArr=dataFashion
let prevCart = JSON.parse(localStorage.getItem("newCart"));
let cartObject = {};
if (prevCart) {
    cartObject = prevCart;
}
function productbyapi(filterArr) {
    let wrapper = document.createElement("div");
    wrapper.classList.add("wrapper")
    for (let i = 0; i < filterArr.length; i++) {
        let pdDiv = document.createElement("div")
        pdDiv.classList.add("product-description-api");
        pdDiv.classList.add("off")
        pdDiv.setAttribute("id", data[i][1]);
        pdDiv.classList.add(filterArr[i][3].split(" ").join(""));
        pdDiv.innerHTML = ` 
                    
                    <div class="a">                       
                        <img src="${filterArr[i][5]}" alt="" srcset="">
                    </div>
                    <div class="b">
                    
                        <div class="description-name"><span class="product-name">${filterArr[i][0].toUpperCase()}</span> <br> <span> ${filterArr[i][6]} </span> <br> Rs. ${filterArr[i][2]} </div>
                        <div class="like">
                        <img src = "images/black-heart.webp" class = "black-heart">
                        <img src = "images/red-heart.webp" class = "red-heart" style = "display: none;">
                        </div>
                        <div class="description-addToCart">
                            <img src="images/blue-add.png" alt="" srcset="">
                            <i class="fas fa-check" style = "display: none;"></i>
                        </div>
                    </div>`
        
                    let cartButton = pdDiv.querySelector(".description-addToCart img");

                    let checkButton = pdDiv.querySelector(".fas");
                    let blackHeart = pdDiv.querySelector(".black-heart");
                    // console.log(blackHeart);
                    let redHeart = pdDiv.querySelector(".red-heart");
                    // console.log(redHeart);
                    redHeart.addEventListener("click", changeRed);
                    blackHeart.addEventListener("click", changeBlack);
                    function changeRed(){
                        blackHeart.style.display = "flex";
                        redHeart.style.display = "none";
                    }
                    function changeBlack(){
                        blackHeart.style.display = "none";
                        redHeart.style.display = "flex";
                    }
                    if (cartObject[filterArr[i][1]]) {
                        cartButton.style.display = "none";
                        checkButton.style.display = "block";
                    }
                    else {
                        cartButton.style.display = "block";
                        checkButton.style.display = "none";
                    }
                    cartButton.addEventListener("click", function () {      
                        cartButton.style.display = "none";
                        checkButton.style.display = "block";
                        cartObject[data[i][1]] = [...filterArr[i], 1];
                        localStorage.setItem("newCart", JSON.stringify(cartObject));
                        tbody.innerHTML=""
                        init()
                    });
                    checkButton.addEventListener("click", function () {
                        cartButton.style.display = "block";
                        checkButton.style.display = "none";
                        delete cartObject[filterArr[i][1]];
                        localStorage.setItem("newCart", JSON.stringify(cartObject));
                        tbody.innerHTML=""
                        init()
                    });
             wrapper.appendChild(pdDiv)

            //Fashion
            pdDiv = document.createElement("div")
            pdDiv.classList.add("product-description-api");
            pdDiv.classList.add("off")
            pdDiv.setAttribute("id", dataFashion[i][1]);
            pdDiv.classList.add(filterFashionArr[i][3].split(" ").join(""));
            pdDiv.innerHTML = ` 
            
            <div class="a">
                
                <img src="${filterFashionArr[i][5]}" alt="" srcset="">
            </div>
            <div class="b">
            
                <div class="description-name"><span class="product-name">${filterFashionArr[i][0].toUpperCase()}</span> <br> <span> ${filterFashionArr[i][6]} </span> <br> Rs. ${filterFashionArr[i][2]} </div>
                <div class="like">
                <img src = "images/black-heart.webp" class = "black-heart">
                <img src = "images/red-heart.webp" class = "red-heart" style = "display: none;">
                </div>
                <div class="description-addToCart">
                    <img src="images/blue-add.png" alt="" srcset="">
                    <i class="fas fa-check" style = "display: none;"></i>
                </div>
            </div>`

            let cartButtonFashion = pdDiv.querySelector(".description-addToCart img");

            let checkButtonFashion = pdDiv.querySelector(".fas");
            blackHeart = pdDiv.querySelector(".black-heart");
            redHeart = pdDiv.querySelector(".red-heart");
            redHeart.addEventListener("click", changeRed);
            blackHeart.addEventListener("click", changeBlack);
            function changeRed(){
                blackHeart.style.display = "flex";
                redHeart.style.display = "none";
            }
            function changeBlack(){
                blackHeart.style.display = "none";
                redHeart.style.display = "flex";
            }
            if (cartObject[filterFashionArr[i][1]]) {
                cartButtonFashion.style.display = "none";
                checkButtonFashion.style.display = "block";
            }
            else {
                cartButtonFashion.style.display = "block";
                checkButtonFashion.style.display = "none";
            }
            cartButtonFashion.addEventListener("click", function () {
                cartButtonFashion.style.display = "none";
                checkButtonFashion.style.display = "block";
                cartObject[dataFashion[i][1]] = [...filterFashionArr[i], 1];
                localStorage.setItem("newCart", JSON.stringify(cartObject));
            });
            checkButtonFashion.addEventListener("click", function () {
                cartButtonFashion.style.display = "block";
                checkButtonFashion.style.display = "none";
                delete cartObject[filterFashionArr[i][1]];
                localStorage.setItem("newCart", JSON.stringify(cartObject));
            });
            wrapper.appendChild(pdDiv)
    }
    apiData.appendChild(wrapper);
}
productbyapi(filterArr)



dataToBeFilter=document.getElementsByClassName("product-description-api")

async function pastPurchaseHandler(product_name) {
    let res = await axios.get(`http://127.0.0.1:8002/predict/${product_name}`);
    for (let x in res.data) {
        let y = [res.data[x].Name,res.data[x].api,res.data[x].id,];
        if(!document.getElementById(y[2]).classList.contains("already"))
            document.getElementById(y[2]).classList.remove("off");
    }

}
async function pastPurchaseFashionHandler(product_name) {
    let res = await axios.get(`http://127.0.0.1:8003/predict/${product_name}`);
    for (let x in res.data) {
        let y = [res.data[x].Name,res.data[x].api,res.data[x].id,];
        console.log(y)
        if(document.getElementById(y[2])){
            if(!document.getElementById(y[2]).classList.contains("already")){
                document.getElementById(y[2]).classList.remove("off");
            }
        }
            
    }

}

for(let i in items){
    if(items[i][3]=="Grocery"){
        pastPurchaseHandler(items[i][0])
    }
    else if(items[i][3]=="fashion"){
        pastPurchaseFashionHandler(items[i][0])
    }
}

shopMore.addEventListener('click',()=>{
    window.location.href='/productsPage'
})


signOut.addEventListener("click", signOutHandler);

async function signOutHandler() {
    try {
        await firebase.auth().signOut();
        localStorage.setItem("uuid", "");
        localStorage.clear();
        window.location.href = "/signIn";

    }
    catch (err) {
        alert("Unable to sign out!");
        console.log(err);
    }
}
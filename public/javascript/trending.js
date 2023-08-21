let latestTrend=document.querySelector(".latest_trend")


let signinout=document.querySelector(".sign-in-out");
//console.log(firebase.auth().currentUser);
let uuid = localStorage.getItem("uuid");
if (!uuid) {
    signinout.innerText="Sign In"
}
else{
    signinout.innerText="Sign Out"
}
console.log(uuid);


signinout.addEventListener("click", signOutHandler);

async function signOutHandler() {
        try {
            await firebase.auth().signOut();
            localStorage.setItem("uuid", "");
            localStorage.clear();
            window.location.href = "/signIn";

        }
        catch (err) {
            alert("Unable to sign out!");
           // console.log(err);
        }
}



function trendfashion(newTrend){
        let product = document.createElement("div");
        product.classList.add("product-description");
        product.innerHTML = `
        
            <div class="a">
                <img src="https://${newTrend[3]}" alt="" srcset=""> </img>
            </div>
            <div class="b">
                <div class="description-name"><span class="product-name">${newTrend[0].toUpperCase()}</span> <br> <span> ${newTrend[1]} </span> <br> Rs. ${ parseInt(newTrend[4].replace('$',''))*83} </div>
                <div class="like">
                <img src = "images/black-heart.webp" class = "black-heart">
                <img src = "images/red-heart.webp" class = "red-heart" style = "display: none;">
                </div>
                <div class="description-addToCart">
                    <img src="images/blue-add.png" alt="" srcset="">
                    <i class="fas fa-check" style = "display: none;"></i>
                </div>
            </div>
        `
       
        latestTrend.appendChild(product);
    }


async function trendingFashion() {
    let res = await axios.get(`http://127.0.0.1:8006/trending`);
    for(x in res.data){
        //console.log(res.data[x].imgUrl)
        let y = [res.data[x].Name,res.data[x].brand,res.data[x].id,res.data[x].imgUrl,res.data[x].price];
        //console.log(y)
        trendfashion(y);
    }
}
trendingFashion()



const part5 = document.querySelector(".part5");
const partFashion = document.querySelector(".partFashion");
//console.log(choose);
let prevCart = JSON.parse(localStorage.getItem("newCart"));
let cartObject = {};
if (prevCart) {
    cartObject = prevCart;
}


let filteredArr = data;
let filteredArrFasion=dataFashion











function init() {
    let wrapper = document.createElement("div");
    wrapper.classList.add("products");
    for (let i = 0; i < filteredArr.length; i++) {
        let pdDiv = document.createElement("div")
        pdDiv.classList.add("product-description");
        pdDiv.classList.add("on-of");
        pdDiv.setAttribute("id", data[i][1]);
        pdDiv.classList.add(filteredArr[i][3].split(" ").join(""));
        pdDiv.innerHTML = ` 
                    
                    <div class="a">
                        
                        <img src="${filteredArr[i][5]}" alt="" srcset="">
                    </div>
                    <div class="b">
                    
                        <div class="description-name"><span class="product-name">${filteredArr[i][0].toUpperCase()}</span> <br> <span> ${filteredArr[i][6]} </span> <br> Rs. ${filteredArr[i][2]} </div>
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
                    if (cartObject[filteredArr[i][1]]) {
                        cartButton.style.display = "none";
                        checkButton.style.display = "block";
                        //similarProductsHandler(filteredArr[i][0]);
                        //similarUsersHandler(filteredArr[i][0]);
                        if (uuid == '"bbNNQ2cX1ZNRbHL994DWsMCb7JQ2"') {
                            pastPurchaseHandler(filteredArr[i][0]);
                        }
                    }
                    else {
                        cartButton.style.display = "block";
                        checkButton.style.display = "none";
                    }
                    cartButton.addEventListener("click", function () {
                        if (!uuid) {
                            window.location.href="/signIn"
                        }
                        cartButton.style.display = "none";
                        checkButton.style.display = "block";
                        cartObject[data[i][1]] = [...filteredArr[i], 1];
                        localStorage.setItem("newCart", JSON.stringify(cartObject));
                        //similarProductsHandler(filteredArr[i][0]);
                        //similarUsersHandler(filteredArr[i][0]);
                        if (uuid == '"bbNNQ2cX1ZNRbHL994DWsMCb7JQ2"') {
                            pastPurchaseHandler(filteredArr[i][0]);
                        }
                    });
                    checkButton.addEventListener("click", function () {
                        cartButton.style.display = "block";
                        checkButton.style.display = "none";
                        delete cartObject[filteredArr[i][1]];
                        localStorage.setItem("newCart", JSON.stringify(cartObject));
                    });
        wrapper.appendChild(pdDiv)
    }
    part5.appendChild(wrapper);
}
init();

function initFashion() {
    let wrapper = document.createElement("div");
    wrapper.classList.add("products");
    for (let i = 0; i < dataFashion.length; i++) {
         //Fashion 
         pdDiv = document.createElement("div")
         pdDiv.classList.add("product-description");
         pdDiv.classList.add("on-of");
         pdDiv.setAttribute("id", dataFashion[i][1]);
         pdDiv.classList.add(dataFashion[i][3].split(" ").join(""));
         pdDiv.innerHTML = ` 
                     
                     <div class="a">
                         
                         <img src="${dataFashion[i][5]}" alt="" srcset="">
                     </div>
                     <div class="b">
                     
                         <div class="description-name"><span class="product-name">${dataFashion[i][0].toUpperCase()}</span> <br> <span> ${dataFashion[i][6]} </span> <br> Rs. ${dataFashion[i][2]} </div>
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
                     // console.log(blackHeart);
                     redHeart = pdDiv.querySelector(".red-heart");
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
                     if (cartObject[dataFashion[i][1]]) {
                         cartButtonFashion.style.display = "none";
                         checkButtonFashion.style.display = "block";
                         //similarProductsHandler(dataFashion[i][0]);
                         //similarUsersHandler(dataFashion[i][0]);
                         if (uuid == '"bbNNQ2cX1ZNRbHL994DWsMCb7JQ2"') {
                             pastPurchaseHandler(dataFashion[i][0]);
                         }
                     }
                     else {
                         cartButtonFashion.style.display = "block";
                         checkButtonFashion.style.display = "none";
                     }
                     cartButtonFashion.addEventListener("click", function () {
                         cartButtonFashion.style.display = "none";
                         checkButtonFashion.style.display = "block";
                         cartObject[dataFashion[i][1]] = [...dataFashion[i], 1];
                         localStorage.setItem("newCart", JSON.stringify(cartObject));
                         //similarProductsHandler(dataFashion[i][0]);
                         //similarUsersHandler(dataFashion[i][0]);
                         if (uuid == '"bbNNQ2cX1ZNRbHL994DWsMCb7JQ2"') {
                             pastPurchaseHandler(dataFashion[i][0]);
                         }
                     });
                     checkButtonFashion.addEventListener("click", function () {
                         cartButtonFashion.style.display = "block";
                         checkButtonFashion.style.display = "none";
                         delete cartObject[dataFashion[i][1]];
                         localStorage.setItem("newCart", JSON.stringify(cartObject));
                     });
         wrapper.appendChild(pdDiv)
        
    }
    partFashion.appendChild(wrapper);
}
initFashion();


//**************************Change Product listings*************************************//

dataToBeFilter=document.getElementsByClassName("product-description")
var oldState=[]
for(let i=0;i<dataToBeFilter.length;++i){
    oldState.push(dataToBeFilter[i]);
}
function showElementCategoryWise(filterClass){
    //console.log(filterClass)
    //dataToBeFilter=document.getElementsByClassName("product-description")
    for(let i=0;i<dataToBeFilter.length;++i){
        if(filterClass=="all"){
            dataToBeFilter[i].style.display="block" 
        }
        else if(!dataToBeFilter[i].classList.contains(filterClass)){
            //console.log(dataToBeFilter[i].classList.contains(filterClass))
            dataToBeFilter[i].style.display="none" 
        }else{
            dataToBeFilter[i].style.display="block" 
        }
    }


}

var sub_elements = document.getElementsByClassName("sub__nav__item");
function subDotHandler(evt) {
    // Declare all variables
    var i, tablinks;

    // Get all elements with class="sub__nav__item" and remove the class "sub_active-link"
    tablinks = document.getElementsByClassName("sub__nav__item");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("sub_active-link");
    }
  
    // Show the current tab, and add an "sub_active-link" class to the button that opened the tab
    evt.currentTarget.className += "sub_active-link";

    //console.log(evt.currentTarget.className);
    showElementCategoryWise(evt.currentTarget.id);
}

for (var i = 0; i < sub_elements.length; i++) {
    if(sub_elements[i])
        sub_elements[i].addEventListener('click', subDotHandler);
}   

//***************************END******************************************//


async function similarProductsHandler(product_name) {
    let res = await axios.get(`http://127.0.0.1:8005/predict/${product_name}`);
    let y = [res.data.item, JSON.parse(res.data.id), res.data.api];
    for(let i=0;i<dataToBeFilter.length;++i){
        if(dataToBeFilter[i].id==y[1] && !dataToBeFilter[i].classList.contains("prio")){
            let ratingDiv = document.createElement("div")
            ratingDiv.innerText="About To Trend"
            ratingDiv.classList.add("recomendation");
            dataToBeFilter[i].appendChild(ratingDiv);
            dataToBeFilter[i].classList.add('prio');
            dataToBeFilter[i].classList.remove("on-of");
        }
    }
}


async function newTrendHandler() {
    let res = await axios.get("http://127.0.0.1:8000/predict");
    for (let x in res.data) {
        let y = [res.data[x].item, JSON.parse(x)];
        for(let i=0;i<dataToBeFilter.length;++i){
            if(dataToBeFilter[i].id==y[1]){
                let ratingDiv = document.createElement("div")
                ratingDiv.innerText="Highest Rated"
                ratingDiv.classList.add("recomendation");
                dataToBeFilter[i].appendChild(ratingDiv);
                dataToBeFilter[i].classList.add('prio');
                dataToBeFilter[i].classList.remove("on-of");
                similarProductsHandler(y[0]);
            }
        }
    }
}
newTrendHandler();

async function similarFashionHandler(product_name) {
    let res = await axios.get(`http://127.0.0.1:8004/predict/${product_name}`);
    let y = [res.data.item, JSON.parse(res.data.id), res.data.api];
    for(let i=0;i<dataToBeFilter.length;++i){

        if(dataToBeFilter[i].id==y[1] && !dataToBeFilter[i].classList.contains("prio")){
            let ratingDiv = document.createElement("div")
            ratingDiv.innerText="About To Trend"
            ratingDiv.classList.add("recomendation");
            dataToBeFilter[i].appendChild(ratingDiv);
            dataToBeFilter[i].classList.add('prio');
            dataToBeFilter[i].classList.remove("on-of");
        }
    }
}


async function newTrendFashionHandler() {
    let res = await axios.get("http://127.0.0.1:8001/predict");
    for (let x in res.data) {
        let y = [res.data[x].item, JSON.parse(x)];
        //console.log(y[1]);
        for(let i=0;i<dataToBeFilter.length;++i){
            if(dataToBeFilter[i].id==y[1]){
                let ratingDiv = document.createElement("div")
                ratingDiv.innerText="Highest Rated"
                ratingDiv.classList.add("recomendation");
                dataToBeFilter[i].appendChild(ratingDiv);
                dataToBeFilter[i].classList.add('prio');
                dataToBeFilter[i].classList.remove("on-of");
                similarFashionHandler(y[0]);
            }
        }
    }
}
newTrendFashionHandler();

let cart= document.querySelector(".cart");
cart.addEventListener('click',()=>{
    if (!uuid) {
        window.location.href="/signIn"
    }
    window.location.href='/newCart'
})
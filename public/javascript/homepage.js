
let choose = document.querySelectorAll(".choose");
let myText = document.querySelector("#myText");
let sort = document.querySelector("#sort");
let signout = document.querySelector(".sign-out");
let cart = document.querySelector(".cart");
let picUpload = document.querySelector(".details .pic img");
let nameOfPerson = document.querySelector(".details .User .name");
let backToHome = document.querySelector(".rectangle .backToHome");
let productsDiv = document.querySelector(".products");
let similarUsers = [];
let similarProducts = [];
let pastPurchase = [];
let newUser = [];

// console.log(firebase.auth().currentUser);
let uuid = localStorage.getItem("uuid");
if (!uuid) {
    window.location.href = "/signIn";
}
// console.log(uuid);
if (uuid == '"gyEPIe1VGqfdVjrMSzSYwaPFki62"') {
    newUserHandler();
}

signout.addEventListener("click", signOutHandler);

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


const part5 = document.querySelector(".part5");
//console.log(choose);
let prevCart = JSON.parse(localStorage.getItem("newCart"));
let cartObject = {};
if (prevCart) {
    cartObject = prevCart;
}


let filteredArr = data;
let fashionData = dataFashion;
function init() {
    let wrapper = document.createElement("div");
    for (let i = 0; i < 50; i++) {
        let pdDiv = document.createElement("div")
        pdDiv.classList.add("product-description");
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
                        // if (uuid == '"bbNNQ2cX1ZNRbHL994DWsMCb7JQ2"') {
                        //     pastPurchaseHandler(filteredArr[i][0]);
                        // }
                    }
                    else {
                        cartButton.style.display = "block";
                        checkButton.style.display = "none";
                    }
                    cartButton.addEventListener("click", function () {
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
        wrapper.appendChild(pdDiv);

        //Fashion 
        pdDiv = document.createElement("div")
        pdDiv.classList.add("product-description");
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
    part5.appendChild(wrapper);
}
init();


//**************************Change Product listings*************************************//

dataToBeFilter=document.getElementsByClassName("product-description")
var oldState=[]
for(let i=0;i<dataToBeFilter.length;++i){
    oldState.push(dataToBeFilter[i]);
}
function showElementCategoryWise(filterClass){
    console.log(filterClass)
    //dataToBeFilter=document.getElementsByClassName("product-description")
    for(let i=0;i<dataToBeFilter.length;++i){
        if(filterClass=="all"){
            dataToBeFilter[i].style.display="block" 
        }
        else if(!dataToBeFilter[i].classList.contains(filterClass)){
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
    evt.currentTarget.className += " sub_active-link";

    //console.log(evt.currentTarget.id);
    showElementCategoryWise(evt.currentTarget.id);
}

for (var i = 0; i < sub_elements.length; i++) {
    if(sub_elements[i])
        sub_elements[i].addEventListener('click', subDotHandler);
}   

//***************************END******************************************//


async function newUserHandler() {
    let res = await axios.get("http://127.0.0.1:8000/predict");
    for (let x in res.data) {
        let y = [res.data[x].item, JSON.parse(x),res.data[x].api];
        for(let i=0;i<dataToBeFilter.length;++i){
            //console.log(dataToBeFilter[i].id)
            //similarProductsHandler(dataToBeFilter[i][0])
            if(dataToBeFilter[i].id==y[1]){
                let ratingDiv = document.createElement("div")
                ratingDiv.innerText="Highest Rated"
                ratingDiv.classList.add("recomendation");
                dataToBeFilter[i].appendChild(ratingDiv);
                dataToBeFilter[i].classList.add('prio');
            }
        }
    }
}
newUserHandler();
async function newUserFashionHandler() {
    let res = await axios.get("http://127.0.0.1:8001/predict");
    for (let x in res.data) {
        let y = [res.data[x].item, JSON.parse(x),res.data[x].api];
        for(let i=0;i<dataToBeFilter.length;++i){
            //console.log(dataToBeFilter[i].id)
            //similarProductsHandler(dataToBeFilter[i][0])
            if(dataToBeFilter[i].id==y[1]){
                let ratingDiv = document.createElement("div")
                ratingDiv.innerText="Highest Rated"
                ratingDiv.classList.add("recomendation");
                dataToBeFilter[i].appendChild(ratingDiv);
                dataToBeFilter[i].classList.add('prio');
            }
        }
    }
}
newUserFashionHandler();




function stateTransmission(oldState){
    part5.innerHTML = "";
    let wrapper = document.createElement("div");
    for(let i=0;i<oldState.length;++i){
        wrapper.append(oldState[i]);
    }
    part5.append(wrapper)
}





sort.addEventListener("change", sortHandler);

function personalized() {
    
    var personalizedElements=[];
    for(let i=0;i<dataToBeFilter.length;++i){
        if(dataToBeFilter[i].classList.contains('prio')){
            personalizedElements.push(dataToBeFilter[i])
        }
    }  
    stateTransmission(personalizedElements)

}


function priceLTH(a, b) {
    if (a[2] >= b[2]) {
        return 1;
    }
    else {
        return -1;
    }
}
function priceHTL(a, b) {
    if (a[2] <= b[2]) {
        return 1;
    }
    else {
        return -1;
    }
}


function sortHandler(e) {
    let sortValue = e.currentTarget.value;
    if(sortValue == "personal"){
        personalized();
    }
    else if (sortValue == "plth") {
        stateTransmission(oldState)
        filteredArr.sort(priceLTH);
    }
    else if (sortValue == "phtl") {
        stateTransmission(oldState)
        filteredArr.sort(priceHTL);
    }
    else if (sortValue == "atz") {
        stateTransmission(oldState)
        filteredArr.sort(alphaATZ);
    } else {
        stateTransmission(oldState)
        filteredArr.sort(alphaZTA);
    }

}



cart.addEventListener('click',()=>{
    window.location.href = "/newCart"
})



//*******************SEARCH FUNCTION*********************//
// myText.addEventListener("input", searchHelper);

// let searchSpan=document.getElementsByClassName('product-name')
// var searchArr=[]
// for(let i=0;i<forSearch.length;++i){
//     searchArr.push(forSearch[i]);
// }
// function searchHelper(value) {
//     var personalizedElements=[];
//     for(let i=0;i<searchSpan.length;++i){
//         let str=searchSpan[i].textContent.toLowerCase();
//         console.log(str)
//         if(str.includes(value)){
//             personalizedElements;
//         }
//     }  
//     //stateTransmission(personalizedElements)
// }

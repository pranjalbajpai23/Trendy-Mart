let email = document.querySelector("#Email");
let pwd = document.querySelector("#Pwd");
let submit = document.querySelector(".arrow");
let name = document.querySelector("#Name");
let signIn = document.querySelector(".sign-in");

signIn.addEventListener("click", signInHandler);
function signInHandler() {
    window.location.href = "/signIn"
}
let storage = firebase.storage();
submit.addEventListener("click", signUpHandler);
// console.log(firebase.firestore.FieldValue.serverTimestamp())
async function signUpHandler() {
    try {
        let details=await firebase.auth().createUserWithEmailAndPassword(email.value, pwd.value);
        localStorage.setItem("uuid", JSON.stringify(details.user.uid));
        window.location.href = "/productsPage";
        alert("Account Created Successfully")
        
    }
    catch (err) {
        alert("Unable to sign up, Please try again later");
        console.log(err);
    }
}

// ek function h, jo html file ko render kraega!
const getCart = (req,res) => {
    res.render("cart.ejs");
}
const getNewCart = (req,res) => {
    res.render("newCart.ejs");
}
const getProductsPage = (req,res) => {
    res.render("homepage.ejs");
}
 const getSignIn = (req,res) => {
    res.render("signIn.ejs");
} 
 const getSignUp = (req,res) => {
    res.render("signUp.ejs");
} 
//  const getLearnMore = (req,res) => {
//     res.render("learnMore.ejs");
// }
 const getLandingpage = (req,res) => {
    res.render("landingpage.ejs");
}
const getTrendingpage = (req,res) => {
    res.render("trending.ejs");
}

// const getRecipePage = (req,res) => {
//     res.render("recipe.ejs");
// }

// const getNewsPage = (req,res) => {
//     res.render("news.ejs"); 
// }

 module.exports.getCart = getCart;
 module.exports.getNewCart=getNewCart;
 module.exports.getProductsPage = getProductsPage;
 module.exports.getLandingpage = getLandingpage;
 module.exports.getTrendingpage=getTrendingpage;
// module.exports.getLearnMore = getLearnMore;
 module.exports.getSignIn = getSignIn;
 module.exports.getSignUp = getSignUp;
// module.exports.getRecipePage = getRecipePage; 
// module.exports.getNewsPage = getNewsPage; 
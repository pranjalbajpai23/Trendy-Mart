/*==================== SHOW MENU ====================*/
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)
    
    // Validate that variables exist
    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            // We add the show-menu class to the div tag with the nav__menu class
            nav.classList.toggle('show-menu')
        })
    }
}
showMenu('nav-toggle','nav-menu')

const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

// chaning dot on click in navbar
var elements = document.getElementsByClassName("nav__link");
function openCity(evt) {
    // Declare all variables
    var i, tablinks;

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("nav__link");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace("active-link", "");
    }
  
    // Show the current tab, and add an "active" class to the button that opened the tab
    evt.currentTarget.className += "active-link";
}
for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener('click', openCity);
}




// chaning sub navbar dot on click in navbar

// var sub_elements = document.getElementsByClassName("sub__nav__item");
// function subDotHandler(evt) {
//     // Declare all variables
//     var i, tablinks;

//     // Get all elements with class="tablinks" and remove the class "active"
//     tablinks = document.getElementsByClassName("sub__nav__item");
//     for (i = 0; i < tablinks.length; i++) {
//         tablinks[i].classList.remove("sub_active-link");
//     }
  
//     // Show the current tab, and add an "active" class to the button that opened the tab
//     evt.currentTarget.className += " sub_active-link";
// }

// for (var i = 0; i < elements.length; i++) {
//     if(sub_elements[i])
//         sub_elements[i].addEventListener('click', subDotHandler);
// }

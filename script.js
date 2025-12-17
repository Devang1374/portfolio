const yearSpan = document.getElementById("year");

if(yearSpan){
    yearSpan.textContent = new Date().getFullYear();
}

const menuBtn = document.getElementById("menuToggle");
menuBtn.addEventListener("click",function(){
    document.querySelector(".nav").classList.toggle("nav-open");
});

// document.querySelectorAll('a[href^="#"]').forEach(link=>{link.addEventListener("click",function(event){
//     event.preventDefault();
//     const target = document.querySelector(this.getAttribute("href"));
     
//         if(!target){
//             return;
//         }       
 
//      target.scrollInToView({
//             behavior:"smooth",
//             block:"start"
//         });
    
// });
// });
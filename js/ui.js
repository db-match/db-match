console.log("UI Components Ready");

/* =========================================
TOAST NOTIFICATION
========================================= */

function showToast(message,type="success"){

const toast =
document.getElementById("toast");

if(!toast) return;

toast.innerText = message;

toast.className =
`toast show ${type}`;

setTimeout(()=>{

toast.className =
"toast";

},3000);

}



/* =========================================
GLOBAL LOADER
========================================= */

function showLoader(){

let loader =
document.getElementById("global-loader");

if(loader){

loader.style.display = "flex";

}

}



function hideLoader(){

let loader =
document.getElementById("global-loader");

if(loader){

loader.style.display = "none";

}

}



/* =========================================
BUTTON RIPPLE EFFECT
========================================= */

document.addEventListener("click",function(e){

const btn =
e.target.closest(
".primary-btn, .secondary-btn"
);

if(!btn) return;

const ripple =
document.createElement("span");

const rect =
btn.getBoundingClientRect();

const size =
Math.max(rect.width,rect.height);

ripple.style.width =
ripple.style.height =
size + "px";

ripple.style.left =
e.clientX - rect.left - size/2 + "px";

ripple.style.top =
e.clientY - rect.top - size/2 + "px";

ripple.classList.add("ripple");

btn.appendChild(ripple);

setTimeout(()=>{

ripple.remove();

},600);

});



/* =========================================
AUTO CLOSE MOBILE KEYBOARD
========================================= */

document.addEventListener("touchstart",function(e){

if(
document.activeElement.tagName === "INPUT" &&
!e.target.closest("input")
){

document.activeElement.blur();

}

});

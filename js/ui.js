console.log("UI Components Ready")

function showToast(message,type="success"){

const toast =
document.getElementById("toast");

toast.innerText = message;

toast.className =
`toast show ${type}`;

setTimeout(()=>{

toast.className =
"toast";

},3000);

}

function showLoader(){

console.log("Loader started")

}

function hideLoader(){

console.log("Loader stopped")

}

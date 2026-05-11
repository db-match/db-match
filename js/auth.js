const signupForm=document.querySelector("form");

if(
signupForm &&
window.location.pathname.includes("signup")
){

signupForm.addEventListener("submit",async(e)=>{

e.preventDefault();

showLoader();

const inputs=signupForm.querySelectorAll("input");

const fullName=inputs[0].value;

const email=inputs[1].value;

const phone=inputs[2].value;

const password=inputs[3].value;

try{

const userCredential=

await auth.createUserWithEmailAndPassword(
email,
password
);

const user=userCredential.user;

await db.collection("users").doc(user.uid).set({

uid:user.uid,

name:fullName,

email:email,

phone:phone,

approved:false,

verified:false,

createdAt:new Date()

});

hideLoader();

showToast(
"Account Created Successfully",
"success"
);

setTimeout(()=>{

window.location.href="discover.html";

},1200);

}catch(error){

hideLoader();

showToast(
error.message,
"error"
);

}

});

}





const loginForm=document.querySelector("form");

if(
loginForm &&
window.location.pathname.includes("login")
){

loginForm.addEventListener("submit",async(e)=>{

e.preventDefault();

showLoader();

const inputs=loginForm.querySelectorAll("input");

const email=inputs[0].value;

const password=inputs[1].value;

try{

await auth.signInWithEmailAndPassword(
email,
password
);

hideLoader();

showToast(
"Login Successful",
"success"
);

setTimeout(()=>{

window.location.href="discover.html";

},1200);

}catch(error){

hideLoader();

showToast(
error.message,
"error"
);

}

});

}

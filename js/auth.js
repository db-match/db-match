const signupForm=document.querySelector("form");

if(
signupForm &&
window.location.pathname.includes("signup")
){

signupForm.addEventListener("submit",async(e)=>{

e.preventDefault();

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

alert("Account Created Successfully");

window.location.href="discover.html";

}catch(error){

alert(error.message);

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

const inputs=loginForm.querySelectorAll("input");

const email=inputs[0].value;

const password=inputs[1].value;

try{

await auth.signInWithEmailAndPassword(
email,
password
);

alert("Login Successful");

window.location.href="discover.html";

}catch(error){

alert(error.message);

}

});

}

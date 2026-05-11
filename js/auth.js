const signupForm=document.querySelector("form");

if(signupForm){

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

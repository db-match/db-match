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

/* =========================================
ACCOUNT INFO
========================================= */

uid:user.uid,

email:email,

phone:phone,



/* =========================================
NAME
========================================= */

firstName:"",
lastName:"",

fullName:fullName,



/* =========================================
BASIC PROFILE
========================================= */

gender:"",
dob:"",
age:"",

city:"",
state:"",
country:"",

bio:"",



/* =========================================
MATCHMAKING DETAILS
========================================= */

profession:"",
company:"",
education:"",
maritalStatus:"",

sect:"",
jamaat:"",
motherTongue:"",

heightFeet:"",
heightInches:"",
height:"",

weight:"",

religiousValues:"",
prayerFrequency:"",

marriageTimeline:"",



/* =========================================
LIFESTYLE
========================================= */

smoking:false,

drinking:false,

dietPreference:"",



/* =========================================
INTERESTS
========================================= */

interests:[],



/* =========================================
PARTNER PREFERENCES
========================================= */

preferredAgeMin:"",
preferredAgeMax:"",

preferredCity:"",
preferredCountry:"",

preferredProfession:"",



/* =========================================
PROFILE PHOTOS
========================================= */

profilePhotos:[],

profilePhoto1:"",
profilePhoto2:"",

displayPhoto:"",



/* =========================================
VERIFICATION
========================================= */

itsNumber:"",

itsCardImage:"",

selfieImage:"",

itsVerified:false,

selfieVerified:false,

verified:false,



/* =========================================
PROFILE STATUS
========================================= */

profileCompleted:false,

onboardingCompleted:false,



/* =========================================
ADMIN APPROVAL
========================================= */

approved:false,

approvalStatus:"pending",

rejectionReason:"",

approvedBy:"",

approvedAt:null,



/* =========================================
ACCOUNT STATUS
========================================= */

isBlocked:false,

isDeleted:false,

isPremium:false,



/* =========================================
ENGAGEMENT
========================================= */

profileViews:0,

likesReceived:0,

matchesCount:0,



/* =========================================
ACTIVITY
========================================= */

createdAt:new Date(),

lastActive:new Date(),

lastLogin:new Date()

});

  console.log("Firestore User Created");

await user.sendEmailVerification();

  await auth.signOut();

  
hideLoader();

showToast(
"Verification email sent. Please verify your email before login.",
"success"
);

setTimeout(()=>{

window.location.href =
"login.html";

},2000);

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

const userCredential =

await auth.signInWithEmailAndPassword(
email,
password
);

const user =
userCredential.user;

/* =========================================
EMAIL VERIFICATION CHECK
========================================= */

if(!user.emailVerified){

hideLoader();

showToast(
"Please verify your email first",
"error"
);

await auth.signOut();

return;

}

hideLoader();

showToast(
"Login Successful",
"success"
);

handlePostLoginRedirect(user);
  
}catch(error){

hideLoader();

showToast(
error.message,
"error"
);

}

});

}

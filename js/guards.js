console.log("Route Guards Ready");

/* =========================================
REQUIRE LOGIN
========================================= */

function requireAuth(){

auth.onAuthStateChanged((user)=>{

if(!user){

window.location.href =
"login.html";

}

});

}

/* =========================================
REDIRECT IF LOGGED IN
========================================= */

function redirectIfLoggedIn(){

auth.onAuthStateChanged(async(user)=>{

if(!user) return;

try{

const doc =
await db.collection("users")
.doc(user.uid)
.get();

const profile =
doc.data();

/* =========================================
ONBOARDING NOT COMPLETED
========================================= */

if(!profile.onboardingCompleted){

window.location.href =
"onboarding.html";

return;

}

/* =========================================
NOT APPROVED
========================================= */

if(profile.approved !== true){

window.location.href =
"pending-approval.html";

return;

}

/* =========================================
APPROVED USER
========================================= */

window.location.href =
"discover.html";

}catch(error){

console.log(error);

}

});

}

/* =========================================
REQUIRE APPROVED USER
========================================= */

function requireApproval(){

auth.onAuthStateChanged(
async(user)=>{

if(!user){

window.location.href =
"login.html";

return;

}

try{

const doc =
await db.collection("users")
.doc(user.uid)
.get();

const profile =
doc.data();

/* =========================================
BLOCKED USER
========================================= */

if(profile.isBlocked === true){

showToast(
"Account blocked",
"error"
);

return;

}

/* =========================================
ONBOARDING INCOMPLETE
========================================= */

if(
profile.onboardingCompleted
!== true
){

window.location.href =
"onboarding.html";

return;

}

/* =========================================
PENDING APPROVAL
========================================= */

if(profile.approved !== true){

window.location.href =
"pending-approval.html";

return;

}

}catch(error){

console.log(error);

}

});

  }

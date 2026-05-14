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

/* =========================================
NO PROFILE
========================================= */

if(!doc.exists){

window.location.href =
"signup.html";

return;

}

const profile =
doc.data();

/* =========================================
BLOCKED USER
========================================= */

if(profile.isBlocked === true){

window.location.href =
"blocked.html";

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


/* =========================================
POST LOGIN REDIRECT
========================================= */

async function handlePostLoginRedirect(user){

try{

const doc =
await db.collection("users")
.doc(user.uid)
.get();

/* =========================================
NO PROFILE
========================================= */

if(!doc.exists){

window.location.href =
"signup.html";

return;

}

const profile =
doc.data();

  
/* =========================================
BLOCKED USER
========================================= */

if(profile.isBlocked === true){

window.location.href =
"blocked.html";

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

}



/* =========================================
REQUIRE ADMIN
========================================= */

function requireAdmin(){

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

if(!doc.exists){

window.location.href =
"login.html";

return;

}

const profile =
doc.data();

/* =========================================
NOT ADMIN
========================================= */

if(profile.role !== "admin"){

window.location.href =
"discover.html";

return;

}

}catch(error){

console.log(error);

}

});

}


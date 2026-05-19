console.log("Admin Panel Ready");

/* =========================================
ELEMENTS
========================================= */

const adminGrid =
document.getElementById(
"admin-grid"
);

const pendingCount =
document.getElementById(
"pending-count"
);

const approvedCount =
document.getElementById(
"approved-count"
);

const returnedCount =
document.getElementById(
"returned-count"
);

const blockedCount =
document.getElementById(
"blocked-count"
);

/* =========================================
INIT
========================================= */

loadAdminPanel();

/* =========================================
LOAD ADMIN PANEL
========================================= */

async function loadAdminPanel(){

auth.onAuthStateChanged(
async(user)=>{

/* =========================================
NOT LOGGED IN
========================================= */

if(!user){

window.location.href =
"login.html";

return;

}

try{

showLoader();

/* =========================================
CURRENT USER
========================================= */

const adminDoc =
await db.collection("users")
.doc(user.uid)
.get();

/* =========================================
NO PROFILE
========================================= */

if(!adminDoc.exists){

window.location.href =
"signup.html";

return;

}

const adminData =
adminDoc.data();

/* =========================================
NOT ADMIN
========================================= */

if(adminData.role !== "admin"){

window.location.href =
"discover.html";

return;

}

/* =========================================
BLOCKED ADMIN
========================================= */

if(adminData.isBlocked === true){

window.location.href =
"blocked.html";

return;

}

/* =========================================
LOAD STATS
========================================= */

loadDashboardStats();

/* =========================================
LOAD PENDING USERS
========================================= */

db.collection("users")
.where(
"onboardingCompleted",
"==",
true
)
.where(
"approvalStatus",
"==",
"pending"
)
.onSnapshot((snapshot)=>{

adminGrid.innerHTML = "";

/* =========================================
COUNT
========================================= */

pendingCount.innerText =
snapshot.size;

/* =========================================
EMPTY
========================================= */

if(snapshot.empty){

adminGrid.innerHTML = `

<div class="empty-state">

<h2>
No Pending Profiles
</h2>

<p>
All profiles are reviewed.
</p>

</div>

`;

hideLoader();

return;

}

/* =========================================
PROFILE LOOP
========================================= */

snapshot.forEach((doc)=>{

const profile =
doc.data();

/* =========================================
SKIP ADMINS
========================================= */

if(profile.role === "admin")
return;

/* =========================================
CARD
========================================= */

adminGrid.innerHTML += `

<div
class="admin-card"
onclick="openProfileReview('${profile.uid}')"
>

<img
src="${
profile.profilePhoto1 ||
'https://placehold.co/600x800'
}"
alt="Profile">

<div class="admin-content">

<h2>

${profile.fullName || "Member"}

</h2>

<p>

${profile.age || ""} Years

</p>

<p>

${profile.city || ""}
${profile.country ? ", " : ""}
${profile.country || ""}

</p>

<p>

${profile.profession || "Not Added"}

</p>

<div class="status-badge">

Pending Review

</div>

</div>

</div>

`;

});

hideLoader();

});

}catch(error){

console.log(error);

hideLoader();

showToast(
error.message,
"error"
);

}

});

}

/* =========================================
LOAD STATS
========================================= */

async function loadDashboardStats(){

/* =========================================
APPROVED
========================================= */

const approvedSnapshot =
await db.collection("users")
.where(
"approvalStatus",
"==",
"approved"
)
.get();

approvedCount.innerText =
approvedSnapshot.size;

/* =========================================
RETURNED
========================================= */

const returnedSnapshot =
await db.collection("users")
.where(
"approvalStatus",
"==",
"returned"
)
.get();

returnedCount.innerText =
returnedSnapshot.size;

/* =========================================
BLOCKED
========================================= */

const blockedSnapshot =
await db.collection("users")
.where(
"approvalStatus",
"==",
"blocked"
)
.get();

blockedCount.innerText =
blockedSnapshot.size;

}

/* =========================================
OPEN PROFILE REVIEW
========================================= */

async function openProfileReview(uid){

try{

showLoader();

/* =========================================
GET USER
========================================= */

const doc =
await db.collection("users")
.doc(uid)
.get();

const profile =
doc.data();

/* =========================================
MODAL
========================================= */

const modal =
document.getElementById(
"review-modal"
);

const body =
document.getElementById(
"review-body"
);

/* =========================================
HTML
========================================= */

body.innerHTML = `

<!-- =========================================
BASIC DETAILS
========================================= -->

<div class="review-section">

<h3>
Basic Details
</h3>

<div class="review-grid">

<div class="review-item">
<div class="review-label">
Full Name
</div>
<div class="review-value">
${profile.fullName || ""}
</div>
</div>

<div class="review-item">
<div class="review-label">
Age
</div>
<div class="review-value">
${profile.age || ""}
</div>
</div>

<div class="review-item">
<div class="review-label">
Gender
</div>
<div class="review-value">
${profile.gender || ""}
</div>
</div>

<div class="review-item">
<div class="review-label">
City
</div>
<div class="review-value">
${profile.city || ""}
</div>
</div>

<div class="review-item">
<div class="review-label">
Country
</div>
<div class="review-value">
${profile.country || ""}
</div>
</div>

<div class="review-item">
<div class="review-label">
Profession
</div>
<div class="review-value">
${profile.profession || ""}
</div>
</div>

<div class="review-item">
<div class="review-label">
Education
</div>
<div class="review-value">
${profile.education || ""}
</div>
</div>

<div class="review-item">
<div class="review-label">
Marriage Timeline
</div>
<div class="review-value">
${profile.marriageTimeline || ""}
</div>
</div>

</div>

</div>

<!-- =========================================
BIO
========================================= -->

<div class="review-section">

<h3>
Bio
</h3>

<div class="review-item">

<div class="review-value">

${profile.bio || "No bio added"}

</div>

</div>

</div>

<!-- =========================================
PHOTOS
========================================= -->

<div class="review-section">

<h3>
Profile Photos
</h3>

<div class="review-photos">

<div class="review-photo-card">

<img
src="${
profile.profilePhoto1 ||
'https://placehold.co/600x800'
}">

<div class="photo-title">
Photo 1
</div>

</div>

<div class="review-photo-card">

<img
src="${
profile.profilePhoto2 ||
'https://placehold.co/600x800'
}">

<div class="photo-title">
Photo 2
</div>

</div>

</div>

</div>

<!-- =========================================
VERIFICATION
========================================= -->

<div class="review-section">

<h3>
Verification Documents
</h3>

<div class="review-photos">

<div class="review-photo-card">

<img
src="${
profile.selfieImage ||
'https://placehold.co/600x800'
}">

<div class="photo-title">
Selfie Verification
</div>

</div>

<div class="review-photo-card">

<img
src="${
profile.itsCardImage ||
'https://placehold.co/600x800'
}">

<div class="photo-title">
ITS / E-Jamaat Card
</div>

</div>

</div>

</div>

<!-- =========================================
ACTIONS
========================================= -->

<div class="review-actions">

<button
class="approve-action"
onclick="approveUser('${uid}')">

Approve Profile

</button>

<button
class="return-action"
onclick="returnProfile('${uid}')">

Return With Comments

</button>

<button
class="block-action"
onclick="blockUser('${uid}')">

Block User

</button>

</div>

`;

modal.style.display =
"flex";

hideLoader();

}catch(error){

console.log(error);

hideLoader();

showToast(
error.message,
"error"
);

}

}



/* =========================================
CLOSE REVIEW MODAL
========================================= */

function closeReviewModal(){

document.getElementById(
"review-modal"
).style.display = "none";

}

/* =========================================
APPROVE USER
========================================= */

async function approveUser(uid){

const confirmApprove =
confirm(
"Approve this profile?"
);

if(!confirmApprove){
return;
}

try{

showLoader();

/* =========================================
UPDATE USER
========================================= */

await db.collection("users")
.doc(uid)
.update({

approved:true,

approvalStatus:"approved",

approvedAt:new Date(),

adminComment:"",

isBlocked:false,

blockedReason:""

});

/* =========================================
CLOSE MODAL
========================================= */

closeReviewModal();

hideLoader();

showToast(
"Profile Approved Successfully",
"success"
);

}catch(error){

console.log(error);

hideLoader();

showToast(
error.message,
"error"
);

}

}

/* =========================================
RETURN PROFILE
========================================= */

async function returnProfile(uid){

const reason =
prompt(
"Enter return comments for user"
);

if(!reason){

showToast(
"Return comments required",
"error"
);

return;

}

try{

showLoader();

/* =========================================
UPDATE USER
========================================= */

await db.collection("users")
.doc(uid)
.update({

approved:false,

approvalStatus:"returned",

adminComment:reason,

approvedAt:null

});

/* =========================================
CLOSE MODAL
========================================= */

closeReviewModal();

hideLoader();

showToast(
"Profile Returned",
"success"
);

}catch(error){

console.log(error);

hideLoader();

showToast(
error.message,
"error"
);

}

}

/* =========================================
BLOCK USER
========================================= */

async function blockUser(uid){

const reason =
prompt(
"Enter block reason"
);

if(!reason){

showToast(
"Block reason required",
"error"
);

return;

}

const confirmBlock =
confirm(
"Are you sure you want to block this user?"
);

if(!confirmBlock){
return;
}

try{

showLoader();

/* =========================================
UPDATE USER
========================================= */

await db.collection("users")
.doc(uid)
.update({

isBlocked:true,

blockedReason:reason,

approved:false,

approvalStatus:"blocked"

});

  
/* =========================================
CLOSE MODAL
========================================= */

closeReviewModal();

hideLoader();

showToast(
"User Blocked",
"success"
);

}catch(error){

console.log(error);

hideLoader();

showToast(
error.message,
"error"
);

}

}


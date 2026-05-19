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
"isBlocked",
"==",
true
)
.get();

blockedCount.innerText =
blockedSnapshot.size;

}

/* =========================================
OPEN PROFILE REVIEW
========================================= */

function openProfileReview(uid){

console.log(
"Open Review:",
uid
);

/* =========================================
NEXT STEP
========================================= */

showToast(
"Profile review modal coming in Step 3",
"success"
);

}

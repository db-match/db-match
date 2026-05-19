console.log("Admin Panel Ready");

/* =========================================
ELEMENTS
========================================= */

const adminGrid =
document.getElementById(
"admin-grid"
);

/* =========================================
LOAD ADMIN PANEL
========================================= */

loadAdminPanel();

/* =========================================
ADMIN PANEL
========================================= */

async function loadAdminPanel(){

auth.onAuthStateChanged(
async(user)=>{

try{

/* =========================================
WAIT FOR AUTH
========================================= */

if(!user){

hideLoader();

return;

}

showLoader();

/* =========================================
CURRENT USER DOC
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
BLOCKED ADMIN
========================================= */

if(adminData.isBlocked === true){

window.location.href =
"blocked.html";

return;

}

/* =========================================
NOT ADMIN
========================================= */

if(adminData.role !== "admin"){

window.location.href =
"discover.html";

return;

}

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
EMPTY STATE
========================================= */

if(snapshot.empty){

adminGrid.innerHTML = `

<div class="empty-state">

<h2>
No Pending Profiles
</h2>

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

adminGrid.innerHTML += `

<div class="admin-card">

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
${profile.age || ""}
 Years
</p>

<p>
${profile.city || ""}
${profile.country ? ", " : ""}
${profile.country || ""}
</p>

<p>
${profile.profession || ""}
</p>

<div class="admin-actions">

<button
class="approve-btn"
onclick="approveUser('${profile.uid}')">

Approve

</button>

<button
class="reject-btn"
onclick="rejectUser('${profile.uid}')">

Reject

</button>

</div>

</div>

</div>

`;

});

lucide.createIcons();

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
APPROVE USER
========================================= */

async function approveUser(uid){

try{

showLoader();

await db.collection("users")
.doc(uid)
.update({

approved:true,

approvalStatus:"approved",

approvedAt:new Date(),

rejectionReason:""

});

hideLoader();

showToast(
"User Approved",
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
REJECT USER
========================================= */

async function rejectUser(uid){

const reason =
prompt(
"Enter rejection reason"
);

if(!reason){

return;

}

try{

showLoader();

await db.collection("users")
.doc(uid)
.update({

approved:false,

approvalStatus:"rejected",

rejectionReason:reason,

approvedAt:null

});

hideLoader();

showToast(
"User Rejected",
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

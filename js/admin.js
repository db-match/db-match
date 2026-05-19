console.log("Admin Panel Ready");

/* =========================================
ELEMENTS
========================================= */

const adminGrid =
document.getElementById(
"admin-grid"
);

/* =========================================
CHECK ADMIN
========================================= */

auth.onAuthStateChanged(
async(user)=>{

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
LOAD PENDING USERS
========================================= */

db.collection("users")
.where(
"approved",
"==",
false
)
.where(
"onboardingCompleted",
"==",
true
)
.onSnapshot((snapshot)=>{

adminGrid.innerHTML = "";

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

snapshot.forEach((doc)=>{

const profile =
doc.data();

adminGrid.innerHTML += `

<div class="admin-card">

<img
src="${
profile.profilePhoto1 ||
'https://placehold.co/600x800'
}">

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

hideLoader();

});

}catch(error){

hideLoader();

showToast(
error.message,
"error"
);

}

});

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

approvedAt:new Date()

});

hideLoader();

showToast(
"User Approved",
"success"
);

}catch(error){

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

if(!reason) return;

try{

showLoader();

await db.collection("users")
.doc(uid)
.update({

approved:false,

approvalStatus:"rejected",

rejectionReason:reason

});

hideLoader();

showToast(
"User Rejected",
"success"
);

}catch(error){

hideLoader();

showToast(
error.message,
"error"
);

}

}

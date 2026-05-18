const discoverGrid =
document.querySelector(
".discover-grid"
);

auth.onAuthStateChanged(
async(user)=>{

try{

showLoader();

/* =========================================
CURRENT USER DATA
========================================= */

const currentUserDoc =
await db.collection("users")
.doc(user.uid)
.get();

const currentUser =
currentUserDoc.data();

/* =========================================
GENDER FILTER
========================================= */

let oppositeGender =
currentUser.gender === "Male"
? "Female"
: "Male";



/* =========================================
LOAD ONLY APPROVED USERS
========================================= */

db.collection("users")
.where(
"gender",
"==",
oppositeGender
)
.where(
"approved",
"==",
true
)
.where(
"onboardingCompleted",
"==",
true
)
.onSnapshot((snapshot)=>{

discoverGrid.innerHTML = "";



/* =========================================
EMPTY STATE
========================================= */

if(snapshot.empty){

discoverGrid.innerHTML = `

<div class="empty-state">

<i data-lucide="users"></i>

<h2>
No Profiles Found
</h2>

<p>
New members will appear here soon.
</p>

</div>

`;

lucide.createIcons();

hideLoader();

return;

}



/* =========================================
PROFILE CARDS
========================================= */

snapshot.forEach((doc)=>{

const profile = doc.data();



/* =========================================
SKIP OWN PROFILE
========================================= */

if(profile.uid === user.uid)
return;



discoverGrid.innerHTML += `

<div class="profile-card">

<img
src="${
profile.profilePhoto1 ||
'https://placehold.co/600x800'
}"
alt="Profile">

<div class="profile-info">

<h3>

${profile.fullName || "Member"}

${profile.age || ""}

</h3>

<p>

${profile.city || ""}

${profile.country ? ", " : ""}

${profile.country || ""}

</p>



<div class="profile-tags">

<span>

${profile.profession || "Professional"}

</span>

<span>

${profile.education || "Educated"}

</span>

</div>



<div class="card-buttons">

<button class="reject-btn">

<i data-lucide="x"></i>

</button>

<button class="like-btn">

<i data-lucide="heart"></i>

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

hideLoader();

showToast(
error.message,
"error"
);

}

});

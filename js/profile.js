const profileForm =
document.getElementById(
"profile-form"
);

if(profileForm){

profileForm.addEventListener(
"submit",
async(e)=>{

e.preventDefault();

showLoader();

const user =
auth.currentUser;

if(!user){

hideLoader();

showToast(
"User not found",
"error"
);

return;

}

try{

await db.collection("users")
.doc(user.uid)
.update({



/* =========================================
BASIC INFO
========================================= */

gender:
document.getElementById(
"gender"
).value,

dob:
document.getElementById(
"dob"
).value,

age:
document.getElementById(
"age"
).value,

city:
document.getElementById(
"city"
).value,

state:
document.getElementById(
"state"
).value,

country:
document.getElementById(
"country"
).value,

bio:
document.getElementById(
"bio"
).value,



/* =========================================
MATCHMAKING DETAILS
========================================= */

profession:
document.getElementById(
"profession"
).value,

company:
document.getElementById(
"company"
).value,

education:
document.getElementById(
"education"
).value,

maritalStatus:
document.getElementById(
"maritalStatus"
).value,

sect:
document.getElementById(
"sect"
).value,

jamaat:
document.getElementById(
"jamaat"
).value,

motherTongue:
document.getElementById(
"motherTongue"
).value,

height:
document.getElementById(
"height"
).value,

weight:
document.getElementById(
"weight"
).value,

religiousValues:
document.getElementById(
"religiousValues"
).value,

prayerFrequency:
document.getElementById(
"prayerFrequency"
).value,



/* =========================================
PROFILE STATUS
========================================= */

profileCompleted:true,

lastActive:new Date()

});

hideLoader();

showToast(
"Profile Submitted For Approval",
"success"
);

setTimeout(()=>{

window.location.href =
"pending-approval.html";

},1500);

}catch(error){

hideLoader();

showToast(
error.message,
"error"
);

}

});

}

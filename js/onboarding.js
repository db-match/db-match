console.log("Onboarding Ready");

/* =========================================
FIREBASE AUTH CHECK
========================================= */

auth.onAuthStateChanged((user)=>{

if(!user){

window.location.href="login.html";

}

});

/* =========================================
ALL STEPS
========================================= */

const steps =
document.querySelectorAll(".step");

const progressFill =
document.getElementById(
"progress-fill"
);

const nextBtn =
document.getElementById(
"next-btn"
);

const backBtn =
document.getElementById(
"back-btn"
);

let currentStep = 0;

/* =========================================
SHOW STEP
========================================= */

function showStep(index){

steps.forEach((step)=>{

step.classList.remove("active");

});

steps[index].classList.add("active");

/* =========================================
PROGRESS BAR
========================================= */

const progress =
((index + 1) / steps.length) * 100;

progressFill.style.width =
`${progress}%`;

/* =========================================
BACK BUTTON
========================================= */

if(index === 0){

backBtn.style.opacity = "0.4";

backBtn.style.pointerEvents =
"none";

}else{

backBtn.style.opacity = "1";

backBtn.style.pointerEvents =
"auto";

}

/* =========================================
LAST STEP BUTTON
========================================= */

if(index === steps.length - 1){

nextBtn.style.display = "none";

}else{

nextBtn.style.display = "block";

}

window.scrollTo({
top:0,
behavior:"smooth"
});

}

/* =========================================
VALIDATE STEP
========================================= */

function validateStep(){

const current =
steps[currentStep];

const requiredInputs =
current.querySelectorAll(
"input[required], select[required], textarea[required]"
);

for(let input of requiredInputs){

/* =========================================
CHECKBOX
========================================= */

if(
input.type === "checkbox" &&
!input.checked
){

showToast(
"Please accept terms & conditions",
"error"
);

return false;

}

/* =========================================
NORMAL INPUTS
========================================= */

if(
input.type !== "checkbox" &&
!input.value.trim()
){

showToast(
"Please complete all required details",
"error"
);

input.focus();

return false;

}

}

/* =========================================
PHOTO VALIDATION
========================================= */

if(current.dataset.step === "photos"){

const uploadedPhotos =
document.querySelectorAll(
".photo-upload.uploaded"
);

if(uploadedPhotos.length < 2){

showToast(
"Please upload minimum 2 photos",
"error"
);

return false;

}

}

/* =========================================
SELFIE VALIDATION
========================================= */

if(current.dataset.step === "selfie"){

const selfie =
document.getElementById(
"selfie-image"
);

if(!selfie.files[0]){

showToast(
"Selfie verification is required",
"error"
);

return false;

}

}

/* =========================================
ITS VALIDATION
========================================= */

if(current.dataset.step === "its"){

const itsCard =
document.getElementById(
"its-image"
);

if(!itsCard.files[0]){

showToast(
"Please upload ITS/E-Jamaat card",
"error"
);

return false;

}

}

return true;

}

/* =========================================
NEXT BUTTON
========================================= */

nextBtn.addEventListener(
"click",
()=>{

if(!validateStep()) return;

currentStep++;

showStep(currentStep);

}
);

/* =========================================
BACK BUTTON
========================================= */

backBtn.addEventListener(
"click",
()=>{

if(currentStep > 0){

currentStep--;

showStep(currentStep);

}

}
);

/* =========================================
SELECTION CARDS
========================================= */

document.querySelectorAll(
".select-card"
).forEach((card)=>{

card.addEventListener(
"click",
()=>{

const parent =
card.parentElement;

parent.querySelectorAll(
".select-card"
).forEach((item)=>{

item.classList.remove(
"active"
);

});

card.classList.add(
"active"
);

/* =========================================
STORE VALUE
========================================= */

const hiddenInput =
parent.parentElement.querySelector(
".selection-value"
);

if(hiddenInput){

hiddenInput.value =
card.dataset.value;

}

}
);

});

/* =========================================
CHIPS
========================================= */

document.querySelectorAll(
".chip"
).forEach((chip)=>{

chip.addEventListener(
"click",
()=>{

chip.classList.toggle(
"active"
);

}
);

});

/* =========================================
PHOTO UPLOAD PREVIEW
========================================= */

document.querySelectorAll(
".photo-input"
).forEach((input)=>{

input.addEventListener(
"change",
(e)=>{

const file =
e.target.files[0];

if(!file) return;

const parent =
input.closest(
".photo-upload"
);

const reader =
new FileReader();

reader.onload = function(a){

parent.innerHTML = `

<img
src="${a.target.result}"
class="uploaded-photo"
>

`;

parent.classList.add(
"uploaded"
);

};

reader.readAsDataURL(file);

}
);

});

/* =========================================
SELFIE PREVIEW
========================================= */

const selfieInput =
document.getElementById(
"selfie-image"
);

if(selfieInput){

selfieInput.addEventListener(
"change",
(e)=>{

const file =
e.target.files[0];

if(!file) return;

document.getElementById(
"selfie-preview"
).innerHTML = `

<img
src="${URL.createObjectURL(file)}"
class="uploaded-photo"
>

`;

}
);

}

/* =========================================
ITS PREVIEW
========================================= */

const itsInput =
document.getElementById(
"its-image"
);

if(itsInput){

itsInput.addEventListener(
"change",
(e)=>{

const file =
e.target.files[0];

if(!file) return;

document.getElementById(
"its-preview"
).innerHTML = `

<img
src="${URL.createObjectURL(file)}"
class="uploaded-photo"
>

`;

}
);

}

/* =========================================
SAVE PROFILE
========================================= */

const onboardingForm =
document.getElementById(
"onboarding-form"
);

onboardingForm.addEventListener(
"submit",
async(e)=>{

e.preventDefault();

if(!validateStep()) return;

showLoader();

try{

const user =
auth.currentUser;

if(!user){

showToast(
"User not found",
"error"
);

hideLoader();

return;

}

/* =========================================
COLLECT INTERESTS
========================================= */

const selectedInterests = [];

document.querySelectorAll(
".chip.active"
).forEach((chip)=>{

selectedInterests.push(
chip.innerText
);

});

/* =========================================
UPDATE FIRESTORE
========================================= */

await db.collection("users")
.doc(user.uid)
.update({

/* =========================================
NAME
========================================= */

firstName:
document.getElementById(
"first-name"
).value,

lastName:
document.getElementById(
"last-name"
).value,

fullName:
document.getElementById(
"first-name"
).value + " " +

document.getElementById(
"last-name"
).value,

/* =========================================
BASIC INFO
========================================= */

dob:
document.getElementById(
"dob"
).value,

gender:
document.querySelector(
".gender-selection .select-card.active"
)?.dataset.value || "",

heightFeet:
document.getElementById(
"height-feet"
).value,

heightInches:
document.getElementById(
"height-inches"
).value,

education:
document.getElementById(
"education"
).value,

profession:
document.getElementById(
"profession"
).value,

religiousLevel:
document.getElementById(
"religious-level"
).value,

marriageTimeline:
document.getElementById(
"marriage-timeline"
).value,

bio:
document.getElementById(
"bio"
).value,

/* =========================================
INTERESTS
========================================= */

interests:
selectedInterests,

/* =========================================
VERIFICATION
========================================= */

profileCompleted:true,

  onboardingCompleted:true,

approvalStatus:"pending",

approved:false,

lastActive:new Date()

});

/* =========================================
SUCCESS STEP
========================================= */

currentStep++;

showStep(currentStep);

hideLoader();

}catch(error){

hideLoader();

showToast(
error.message,
"error"
);

}

}
);

/* =========================================
GO TO DASHBOARD
========================================= */

const dashboardBtn =
document.getElementById(
"go-dashboard"
);

if(dashboardBtn){

dashboardBtn.addEventListener(
"click",
()=>{

window.location.href =
"pending-approval.html";

}
);

}

/* =========================================
INIT
========================================= */

showStep(currentStep);

lucide.createIcons();

console.log("Onboarding Ready");

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

const submitBtn =
document.getElementById(
"submit-btn"
);

const dashboardBtn =
document.getElementById(
"dashboard-btn"
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



/* =========================================
STEP SAFETY
========================================= */

if(index < 0){

index = 0;

}

if(index >= steps.length){

index = steps.length - 1;

}

/* =========================================
UPDATE CURRENT STEP
========================================= */

currentStep = index;

/* =========================================
SHOW ACTIVE STEP
========================================= */

steps.forEach((step)=>{

step.classList.remove("active");

});



if(steps[index]){

steps[index].classList.add("active");

}

/* =========================================
PROGRESS BAR
========================================= */

const progress =
((index + 1) / steps.length) * 100;

if(progressFill){

progressFill.style.width =
`${progress}%`;

}

/* =========================================
BACK BUTTON
========================================= */

if(backBtn){

if(index === 0){

backBtn.style.opacity = "0.4";

backBtn.style.pointerEvents =
"none";

}else{

backBtn.style.opacity = "1";

backBtn.style.pointerEvents =
"auto";

}

}

/* =========================================
BOTTOM BUTTON STATES
========================================= */

if(nextBtn && submitBtn && dashboardBtn){

/* =========================================
SUCCESS STEP
========================================= */

if(
steps[index].dataset.step ===
"success"
){

nextBtn.style.display = "none";

submitBtn.style.display = "none";

dashboardBtn.style.display =
"block";

backBtn.style.display =
"none";

}

/* =========================================
FINAL CONFIRMATION STEP
========================================= */

else if(index === steps.length - 2){

nextBtn.style.display = "none";

submitBtn.style.display =
"block";

dashboardBtn.style.display =
"none";

backBtn.style.display =
"block";

}

/* =========================================
NORMAL STEPS
========================================= */

else{

nextBtn.style.display = "block";

submitBtn.style.display =
"none";

dashboardBtn.style.display =
"none";

backBtn.style.display =
"block";

}

}
/* =========================================
SCROLL TOP
========================================= */

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

if(!current){

return false;

}

for(let input of requiredInputs){

/* =========================================
CHECKBOX
========================================= */

if(
input.type === "checkbox" &&
input.checked === false
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

if(!selfie || !selfie.files[0]){

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

if(!itsCard || !itsCard.files[0]){

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

if(currentStep >= steps.length - 1){

return;

}

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
async(e)=>{

const file =
e.target.files[0];

if(!file) return;

const parent =
input.closest(
".photo-upload"
);

const user =
auth.currentUser;

showLoader();

try{

const fileName =
Date.now() + "-" + file.name;

const downloadURL =
await uploadFile(
file,
"users/photos"
);

hideLoader();

const parent =
input.closest(".photo-upload");

parent.innerHTML = `

<div class="preview-wrapper">

<img
src="${downloadURL}"
class="uploaded-photo"
>

<div class="photo-actions">

<button
type="button"
class="photo-edit-btn">

<i data-lucide="refresh-cw"></i>

</button>

<button
type="button"
class="photo-remove-btn">

<i data-lucide="x"></i>

</button>

</div>

</div>

`;

parent.dataset.url =
downloadURL;

parent.classList.add(
"uploaded"
);

lucide.createIcons();

parent.querySelector(
".photo-edit-btn"
).addEventListener(
"click",
()=>{

input.click();

}
);

parent.querySelector(
".photo-remove-btn"
).addEventListener(
"click",
()=>{

parent.innerHTML = `

<input type="file"
class="photo-input"
accept="image/*"
hidden>

<i data-lucide="camera"></i>

`;

parent.classList.remove(
"uploaded"
);

lucide.createIcons();

}
);

}catch(error){

hideLoader();

showToast(
error.message,
"error"
);

}

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
async(e)=>{

  
const file =
e.target.files[0];

if(!file) return;

const user =
auth.currentUser;

showLoader();

try{

const fileName =
Date.now() + "-" + file.name;

const downloadURL =
await uploadFile(
file,
"users/selfie"
);

hideLoader();

const preview =
document.getElementById(
"selfie-preview"
);

preview.dataset.url =
downloadURL;

preview.innerHTML = `

<input type="file"
id="selfie-image"
accept="image/*"
capture="user"
hidden>

<div class="preview-wrapper">

<img
src="${downloadURL}"
class="preview-image"
>

<button
type="button"
class="retake-btn"
id="retake-selfie">

Retake

</button>

</div>

`;

}catch(error){

hideLoader();

showToast(
error.message,
"error"
);

}

  
/* =========================================
RESTORE INPUT
========================================= */

const newInput =
document.getElementById(
"selfie-image"
);

newInput.files = e.target.files;

/* =========================================
RETAKE
========================================= */

document.getElementById(
"retake-selfie"
).addEventListener(
"click",
()=>{

newInput.click();

}
);

/* =========================================
RE-BIND EVENT
========================================= */

newInput.addEventListener(
"change",
arguments.callee
);

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
async(e)=>{

const file =
e.target.files[0];

if(!file) return;

const user =
auth.currentUser;

showLoader();

try{

const fileName =
Date.now() + "-" + file.name;

const downloadURL =
await uploadFile(
file,
"users/its"
);

hideLoader();

const preview =
document.getElementById(
"its-preview"
);

preview.dataset.url =
downloadURL;

preview.innerHTML = `

<input type="file"
id="its-image"
accept="image/*"
capture="environment"
hidden>

<div class="preview-wrapper">

<img
src="${downloadURL}"
class="preview-image"
>

<button
type="button"
class="retake-btn"
id="retake-its">

Upload Again

</button>

</div>

`;

}catch(error){

hideLoader();

showToast(
error.message,
"error"
);

}

const newInput =
document.getElementById(
"its-image"
);

newInput.files = e.target.files;

document.getElementById(
"retake-its"
).addEventListener(
"click",
()=>{

newInput.click();

}
);

newInput.addEventListener(
"change",
arguments.callee
);

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

if(onboardingForm){

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
PREVENT STEP OVERFLOW
========================================= */

if(currentStep >= steps.length){

currentStep =
steps.length - 1;

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
CALCULATE AGE
========================================= */

const dobValue =
document.getElementById(
"dob"
).value;

const birthDate =
new Date(dobValue);

const today =
new Date();

let age =
today.getFullYear() -
birthDate.getFullYear();

const monthDifference =
today.getMonth() -
birthDate.getMonth();

if(
monthDifference < 0 ||
(
monthDifference === 0 &&
today.getDate() <
birthDate.getDate()
)
){

age--;

}

  
/* =========================================
UPDATE FIRESTORE
========================================= */

const uploadedPhotos = [];

document.querySelectorAll(
".photo-upload.uploaded"
).forEach((photo)=>{

if(photo.dataset.url){

uploadedPhotos.push(
photo.dataset.url
);

}

});

const selfieURL =
document.getElementById(
"selfie-preview"
)?.dataset.url || "";

const itsURL =
document.getElementById(
"its-preview"
)?.dataset.url || "";

  
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
age:age,

city:
document.getElementById(
"city"
).value,

country:
document.getElementById(
"country"
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
PROFILE PHOTOS
========================================= */

profilePhotos:
uploadedPhotos,

profilePhoto1:
uploadedPhotos[0] || "",

profilePhoto2:
uploadedPhotos[1] || "",

displayPhoto:
uploadedPhotos[0] || "",

selfieImage:
selfieURL,

itsCardImage:
itsURL,

  
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
showStep(steps.length - 1);
  
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

/* =========================================
VISIT DASHBOARD
========================================= */

dashboardBtn.addEventListener(
"click",
()=>{

window.location.href =
"pending-approval.html";

}
);

  
/* =========================================
INIT
========================================= */

showStep(currentStep);

lucide.createIcons();

  showToast(
"Welcome to Dawoodi Bohra Match",
"success"
);
}

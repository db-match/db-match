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
LAST STEP BUTTON
========================================= */

if(nextBtn){

if(

index === steps.length - 1 ||

steps[index].querySelector(
".submit-btn"
)

){

nextBtn.style.display = "none";

}else{

nextBtn.style.display = "block";

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
(e)=>{

const file =
e.target.files[0];

if(!file) return;

const parent =
input.closest(
".photo-upload"
);

const imageURL =
URL.createObjectURL(file);

parent.innerHTML = `

<div class="preview-wrapper">

<img
src="${imageURL}"
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

parent.classList.add(
"uploaded"
);

/* =========================================
RESTORE ICONS
========================================= */

lucide.createIcons();

/* =========================================
RE-UPLOAD
========================================= */

parent.querySelector(
".photo-edit-btn"
).addEventListener(
"click",
()=>{

input.click();

}
);

/* =========================================
REMOVE PHOTO
========================================= */

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

const preview =
document.getElementById(
"selfie-preview"
);

preview.innerHTML = `

<input type="file"
id="selfie-image"
accept="image/*"
capture="user"
hidden>

<div class="preview-wrapper">

<img
src="${URL.createObjectURL(file)}"
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
(e)=>{

const file =
e.target.files[0];

if(!file) return;

const preview =
document.getElementById(
"its-preview"
);

preview.innerHTML = `

<input type="file"
id="its-image"
accept="image/*"
capture="environment"
hidden>

<div class="preview-wrapper">

<img
src="${URL.createObjectURL(file)}"
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

  showToast(
"Welcome to Dawoodi Bohra Match",
"success"
);
}

/* =========================================
STEP SYSTEM
========================================= */

const steps =
document.querySelectorAll(".step");

const nextBtn =
document.getElementById("next-btn");

const backBtn =
document.getElementById("back-btn");

const progressFill =
document.getElementById("progress-fill");

let currentStep = 0;

const totalSteps =
steps.length;



/* =========================================
UPDATE STEP UI
========================================= */

function updateStep(){

steps.forEach((step,index)=>{

step.classList.remove("active");

if(index === currentStep){

step.classList.add("active");

}

});



/* =========================================
PROGRESS BAR
========================================= */

const progress =
((currentStep + 1)
/ totalSteps) * 100;

progressFill.style.width =
`${progress}%`;



/* =========================================
BACK BUTTON
========================================= */

if(currentStep === 0){

backBtn.style.visibility =
"hidden";

}else{

backBtn.style.visibility =
"visible";

}



/* =========================================
NEXT BUTTON HIDE
========================================= */

if(currentStep === totalSteps - 1){

nextBtn.style.display =
"none";

}else{

nextBtn.style.display =
"flex";

}



/* =========================================
WELCOME TEXT
========================================= */

if(currentStep === 2){

const firstName =
document.getElementById(
"firstName"
).value;

document.getElementById(
"welcome-text"
).innerHTML =

`Hello ${firstName} 👋`;

}

}



/* =========================================
VALIDATION
========================================= */

function validateStep(){



/* STEP 1 */

if(currentStep === 0){

const value =
document.getElementById(
"firstName"
).value.trim();

if(!value){

showToast(
"Please enter your first name",
"error"
);

return false;

}

}



/* STEP 2 */

if(currentStep === 1){

const value =
document.getElementById(
"lastName"
).value.trim();

if(!value){

showToast(
"Please enter your last name",
"error"
);

return false;

}

}



/* STEP 4 */

if(currentStep === 3){

const value =
document.getElementById(
"dob"
).value;

if(!value){

showToast(
"Please select your date of birth",
"error"
);

return false;

}

}



/* STEP 5 */

if(currentStep === 4){

const value =
document.getElementById(
"gender"
).value;

if(!value){

showToast(
"Please select gender",
"error"
);

return false;

}

}



/* STEP 6 */

if(currentStep === 5){

const feet =
document.getElementById(
"heightFeet"
).value;

const inches =
document.getElementById(
"heightInches"
).value;

if(!feet || !inches){

showToast(
"Please enter height",
"error"
);

return false;

}

}



/* STEP 7 */

if(currentStep === 6){

const value =
document.getElementById(
"education"
).value;

if(!value){

showToast(
"Please select education",
"error"
);

return false;

}

}



/* STEP 8 */

if(currentStep === 7){

const value =
document.getElementById(
"profession"
).value.trim();

if(!value){

showToast(
"Please enter profession",
"error"
);

return false;

}

}



/* STEP 9 */

if(currentStep === 8){

const value =
document.getElementById(
"religiousValues"
).value;

if(!value){

showToast(
"Please select religious values",
"error"
);

return false;

}

}



/* STEP 10 */

if(currentStep === 9){

const value =
document.getElementById(
"marriageTimeline"
).value;

if(!value){

showToast(
"Please select marriage timeline",
"error"
);

return false;

}

}



/* STEP 12 */

if(currentStep === 11){

const value =
document.getElementById(
"bio"
).value.trim();

if(!value){

showToast(
"Please write something about yourself",
"error"
);

return false;

}

}



/* STEP 16 */

if(currentStep === 15){

const confirm =
document.getElementById(
"communityConfirm"
);

if(!confirm.checked){

showToast(
"Please accept the confirmation to continue",
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

if(currentStep < totalSteps - 1){

currentStep++;

updateStep();

window.scrollTo({
top:0,
behavior:"smooth"
});

}

});



/* =========================================
BACK BUTTON
========================================= */

backBtn.addEventListener(
"click",
()=>{

if(currentStep > 0){

currentStep--;

updateStep();

window.scrollTo({
top:0,
behavior:"smooth"
});

}

});



/* =========================================
OPTION BUTTONS
========================================= */

document.querySelectorAll(
".option-btn"
).forEach((btn)=>{

btn.addEventListener(
"click",
()=>{

const parent =
btn.parentElement;

parent.querySelectorAll(
".option-btn"
).forEach((b)=>{

b.classList.remove(
"active"
);

});

btn.classList.add(
"active"
);



/* =========================================
GENDER
========================================= */

if(currentStep === 4){

document.getElementById(
"gender"
).value =

btn.dataset.value;

}



/* =========================================
RELIGIOUS VALUES
========================================= */

if(btn.dataset.field){

document.getElementById(
btn.dataset.field
).value =

btn.dataset.value;

}

});

});



/* =========================================
INTEREST BUTTONS
========================================= */

document.querySelectorAll(
".interest-btn"
).forEach((btn)=>{

btn.addEventListener(
"click",
()=>{

btn.classList.toggle(
"active"
);

});

});



/* =========================================
SAVE PROFILE
========================================= */

const finishBtn =
document.getElementById(
"finish-btn"
);

finishBtn.addEventListener(
"click",
async()=>{

try{

showLoader();

const user =
auth.currentUser;

if(!user){

showToast(
"User not found",
"error"
);

return;

}



/* =========================================
INTERESTS
========================================= */

const interests = [];

document.querySelectorAll(
".interest-btn.active"
).forEach((btn)=>{

interests.push(
btn.innerText
);

});



/* =========================================
SAVE DATA
========================================= */

await db.collection("users")
.doc(user.uid)
.update({

name:
document.getElementById(
"firstName"
).value
+ " " +
document.getElementById(
"lastName"
).value,

dob:
document.getElementById(
"dob"
).value,

gender:
document.getElementById(
"gender"
).value,

height:
document.getElementById(
"heightFeet"
).value
+ "'" +
document.getElementById(
"heightInches"
).value,

education:
document.getElementById(
"education"
).value,

profession:
document.getElementById(
"profession"
).value,

religiousValues:
document.getElementById(
"religiousValues"
).value,

marriageTimeline:
document.getElementById(
"marriageTimeline"
).value,

bio:
document.getElementById(
"bio"
).value,

interests:interests,

profileCompleted:true,

approvalStatus:"pending",

lastActive:new Date()

});

hideLoader();

showToast(
"Profile Submitted Successfully",
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



/* =========================================
INITIALIZE
========================================= */

updateStep();

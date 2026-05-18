console.log("Storage Ready");

/* =========================================
UPLOAD IMAGE
========================================= */

async function uploadImage(
file,
folder
){

try{

const user =
auth.currentUser;

if(!user){

throw new Error(
"User not logged in"
);

}

const fileName =
Date.now() + "_" + file.name;

const storageRef =
storage
.ref()
.child(
folder + "/" +
user.uid + "/" +
fileName
);

await storageRef.put(file);

const downloadURL =
await storageRef.getDownloadURL();

return downloadURL;

}catch(error){

console.log(error);

throw error;

}

}

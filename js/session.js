auth.onAuthStateChanged((user)=>{

if(user){

console.log("User Logged In");

}else{

console.log("No User");

}

});

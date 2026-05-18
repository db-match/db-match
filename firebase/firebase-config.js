const firebaseConfig = {
  apiKey: "AIzaSyAQ55Xbm1M8K1vXteQVJh85LpLplvTbZdE",
  authDomain: "dawoodi-bohra-match.firebaseapp.com",
  projectId: "dawoodi-bohra-match",
  storageBucket: "dawoodi-bohra-match.firebasestorage.app",
  messagingSenderId: "111949475025",
  appId: "1:111949475025:web:f03855cfc28eb92e5e29f0"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

auth.setPersistence(
firebase.auth.Auth.Persistence.SESSION
);

const db = firebase.firestore();

const storage = firebase.storage();

console.log("Firebase Connected");

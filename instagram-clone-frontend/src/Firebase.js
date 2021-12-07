import firebase from 'firebase'
const firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyBeGp007cci0LEbL5Uolqh73VSKqRUhZ8A",
    authDomain: "instagram-clone-fcd03.firebaseapp.com",
    projectId: "instagram-clone-fcd03",
    storageBucket: "instagram-clone-fcd03.appspot.com",
    messagingSenderId: "63527896995",
    appId: "1:63527896995:web:8e2b9ec3ba1df2e701bc16"
});
const db = firebase.firestore();
const provider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();
export { auth, provider };
export default db;
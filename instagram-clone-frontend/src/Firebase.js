// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBeGp007cci0LEbL5Uolqh73VSKqRUhZ8A",
    authDomain: "instagram-clone-fcd03.firebaseapp.com",
    projectId: "instagram-clone-fcd03",
    storageBucket: "instagram-clone-fcd03.appspot.com",
    messagingSenderId: "63527896995",
    appId: "1:63527896995:web:8e2b9ec3ba1df2e701bc16"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export default app

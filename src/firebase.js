import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/analytics';
import 'firebase/auth'


var firebaseConfig = {
    apiKey: "AIzaSyDANxFz9tgFF5HldPnteKhJvPuiTsnBVhA",
    authDomain: "imagen-upload.firebaseapp.com",
    databaseURL: "https://imagen-upload.firebaseio.com",
    projectId: "imagen-upload",
    storageBucket: "imagen-upload.appspot.com",
    messagingSenderId: "103828521684",
    appId: "1:103828521684:web:7a41a62e8c6b46a08c7141",
    measurementId: "G-S6ZNPJ0KMK"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage()
firebase.analytics();
export  {
    storage, firebase as default
}
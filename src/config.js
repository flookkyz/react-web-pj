import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = firebase.initializeApp({
    apiKey: "[YOUR-KEY]",
    authDomain: "[YOUR-KEY]",
    projectId: "[YOUR-KEY]",
    storageBucket: "[YOUR-KEY]",
    messagingSenderId: "[YOUR-KEY]",
    appId: "[YOUR-KEY]",
    measurementId: "[YOUR-KEY]"
});

export default firebaseConfig;
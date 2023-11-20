// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import firebase from 'firebase/compat/app';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDfXPFjrmVN8sxYH6OzDCbR1jqOaflmKpY',
  authDomain: 'kitbox-4d7bd.firebaseapp.com',
  projectId: 'kitbox-4d7bd',
  storageBucket: 'kitbox-4d7bd.appspot.com',
  messagingSenderId: '799535661322',
  appId: '1:799535661322:web:91a46248b27aad2ef6faf3',
};

if (!firebase.app.length) {
  firebase.initializeApp(firebaseConfig);
}

export {firebase};

import { initializeApp } from 'firebase/app';

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";


const config = {
  apiKey: "AIzaSyAATHyxmQgxxSsoDQmW-D1lccpbJAxXEHg",
  authDomain: "kol-project-b8e21.firebaseapp.com",
  projectId: "kol-project-b8e21",
  storageBucket: "kol-project-b8e21.appspot.com",
  messagingSenderId: "1083015288012",
  appId: "1:1083015288012:web:3bb80b054f5c102e49de69",
  measurementId: "G-98HT13QRRN",
};
export const app = initializeApp(config);
export const auth = getAuth(app)
export const googleAuthProvider = new GoogleAuthProvider()

// export {app,auth,googleAuthProvider}

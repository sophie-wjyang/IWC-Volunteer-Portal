import app from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore';

const config = {
    apiKey: "AIzaSyDdkrFTPxtbCH7lrEZlUgciUclHWSverMU",
    authDomain: "impact-without-contact.firebaseapp.com",
    databaseURL: "https://impact-without-contact.firebaseio.com",
    projectId: "impact-without-contact",
    storageBucket: "impact-without-contact.appspot.com",
    messagingSenderId: "435489592550",
    appId: "1:435489592550:web:7fc0029113574284a4d727",
    measurementId: "G-BQ7SD39ZCE"
  };

app.initializeApp(config);

export const auth = app.auth();
export const db = app.firestore();

export let user = auth.currentUser;

export const getCurrentUser = async () => {
  return await auth.currentUser;
}

export const createUser = (email, password) => {
  return auth.createUserWithEmailAndPassword(email, password);
}

export const emailVerification = () => {
  return auth.currentUser.sendEmailVerification();
}

export const login = (email, password) => {
  return auth.signInWithEmailAndPassword(email, password);
}

export const signOut = () => {
  auth.signOut();
}

export const passwordReset = (email) => {
  return auth.sendPasswordResetEmail(email);
}

export const passwordUpdate = (password) => {
  return auth.currentUser.updatePassword(password);
}

export default app;
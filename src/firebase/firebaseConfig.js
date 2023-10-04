// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';

import {
  getFirestore, onSnapshot, collection, deleteDoc, doc,
} from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDNJ9Wm4IwPPVmDRc9iAqoGjDcNHI0Odjw',
  authDomain: 'red-social-new-wave.firebaseapp.com',
  projectId: 'red-social-new-wave',
  storageBucket: 'red-social-new-wave.appspot.com',
  messagingSenderId: '83626664750',
  appId: '1:83626664750:web:25b5ea6f1ea43b5ba290bf',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// export const db = firebase.firestore();
export const db = getFirestore(app); // db es de base de datos

// Initialize services
// export const auth = getAuth(app);

export const createUse = (email, password) => createUserWithEmailAndPassword(auth, email, password);

export const signIn = (email, password) => signInWithEmailAndPassword(auth, email, password);

export const resetEmail = (email) => sendPasswordResetEmail(auth, email);

export const emailVerification = (user) => sendEmailVerification(user);

export function googleCount() {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider).then((result) => {
    console.log(result.user);
  });
}

export const onGetPosts = (callback) => onSnapshot(collection(db, 'posts'), callback);

export const deletePost = (id) => deleteDoc(doc(db, 'posts', id));

// export const stateChanged = (user) => onAuthStateChanged(auth, (user));

// En video usando firebase firestore midu.dev (1:00:41) habla de que el usuario en firebase tiene
// una propiedad que se llama uid (unit ID) que implica que tiene un identificador unico para ese
// usuario, también que lo podemos extrar de firebase y que lo podemos usar ejemplo user.uid

// export addDevit =({avatar, content, userID, userName}) => { return db.collection('posts').add({
// avatar,
// content,
// userID,
// UserName,
// createAt: firebase.firestore.Timestamp.fromDate(new Date()),
// likesCount: 0,
// sharedCount: 0,
// })
// }

// aqui exportaras las funciones que necesites

// export myFunction ...

import {
  collection, getDocs, addDoc, serverTimestamp,
} from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {
  db, createUse, emailVerification, googleCount,
} from '../firebase/firebaseConfig';

export const auth = getAuth();

export function addProfile({
  avatar, email, userID, name,
}) {
  return new Promise((resolve, reject) => {
    addDoc(collection(db, 'users'), {
      avatar: auth.currentUser.photoURL ? auth.currentUser.photoURL : 'urlimagengenerica',
      email,
      userID: auth.currentUser.uid,
      userName: name,
    })
      .then((docRef) => {
        resolve(docRef.id);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

 onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log('User is signed');

    const uid = user.uid;
    console.log(uid);
  } else {
    console.log('User is signed out');
  }
});

// onAuthStateChanged: (callback) => {
//   auth.onAuthStateChanged(callback);
// },


// Aquí puedes mostrar la foto del usuario en tu aplicación
const userProfilePhoto = document.createElement('img');
userProfilePhoto.src = photoURL;
userProfilePhoto.alt = 'Perfil de usuario';

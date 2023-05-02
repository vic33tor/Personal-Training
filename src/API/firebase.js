// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  where,
  query,
  onSnapshot,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDTRMljk8xa_WhDD3EpJX8bDXp7WtSSET8",
  authDomain: "justfitdb-1ae53.firebaseapp.com",
  projectId: "justfitdb-1ae53",
  storageBucket: "justfitdb-1ae53.appspot.com",
  messagingSenderId: "433550731077",
  appId: "1:433550731077:web:b98475faf82764e4c2802c",
};
// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const onLogIn = (ref, valorNombre, callback) => {
  onSnapshot(
    query(collection(db, ref), where("nombre", "==", valorNombre)),
    callback
  );
};

export const anade = (ref, el) => addDoc(collection(db, ref), el);

export const registraUsuario = (ref, usuario) =>
  addDoc(collection(db, ref), usuario);

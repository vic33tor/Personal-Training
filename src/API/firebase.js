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
  deleteField,
  arrayUnion,
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
    query(collection(db, ref), where("email", "==", valorNombre)),
    callback
  );
};

export const onGetRutina = (ref, user_id, callback) => {
  onSnapshot(
    query(collection(db, ref), where("user_id", "==", user_id)),
    callback
  );
};

export const onGetClaseUsuario = (ref, user_id, callback) => {
  onSnapshot(
    query(collection(db, ref), where("user_id", "==", user_id)),
    callback
  );
};

export const onGetEjs = (ref, callback) =>
  onSnapshot(collection(db, ref), callback);

export const anade = (ref, el) => addDoc(collection(db, ref), el);

export const registraUsuario = (ref, usuario) =>
  addDoc(collection(db, ref), usuario);

export const updateRutina = (ref, id, objeto) =>
  updateDoc(doc(db, ref, id), objeto);

export const deleteClase = (ref, id, objeto) =>
  updateDoc(doc(db, ref, id), objeto);

export const onDameReceta = (ref, callback) =>
  onSnapshot(collection(db, ref), callback);

export const onGetMonitorId = (ref, user_id, callback) => {
  onSnapshot(
    query(collection(db, ref), where("user_id", "==", user_id)),
    callback
  );
};

export const updateMonitorId = (ref, id, objeto) =>
  updateDoc(doc(db, ref, id), objeto);

export const onGetClases = (ref, callback) =>
  onSnapshot(collection(db, ref), callback);

export const getUnaClase = (ref, id_clase, callback) => {
  onSnapshot(
    query(collection(db, ref), where("user_id", "==", id_clase)),
    callback
  );
};

export const updateClasesContratadas = (ref, id, objeto) => {
  const docRef = doc(db, ref, id);
  return updateDoc(docRef, {
    clases: arrayUnion(objeto),
  });
};

export const onGetProgreso = (ref, idUsuario, callback) => {
  onSnapshot(
    query(collection(db, ref), where("idUsuario", "==", idUsuario)),
    callback
  );
};

export const updateProgreso = (ref, id, objeto) => {
  updateDoc(doc(db, ref, id), objeto);
};

export const updateNombreProgreso = (ref, id, objeto) => {
  updateDoc(doc(db, ref, id), objeto);
};

export const deleteProgreso = (documentId) => {
  const documentRef = doc(collection(db, "PROGRESO"), documentId); // Reemplaza "nombre_coleccion" con el nombre de tu colección
  deleteDoc(documentRef);
  console.log("Documento eliminado correctamente");
};

// Llamada a la función para eliminar un documento específico

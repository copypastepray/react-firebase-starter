import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc
} from "firebase/firestore";

require("dotenv").config();
const {
  REACT_APP_API_KEY,
  REACT_APP_AUTH_DOMAIN,
  REACT_APP_PROJECT_ID,
  REACT_APP_STORAGE_BUCKET,
  REACT_APP_MESSAGING_SENDER_ID,
  REACT_APP_APP_ID,
  REACT_APP_MEASUREMENT_ID
} = process.env;

const firebaseConfig = {
  apiKey: REACT_APP_API_KEY,
  authDomain: REACT_APP_AUTH_DOMAIN,
  projectId: REACT_APP_PROJECT_ID,
  storageBucket: REACT_APP_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_MESSAGING_SENDER_ID,
  appId: REACT_APP_APP_ID,
  measurementId: REACT_APP_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

// Add Collections to this object
const collRefs = {
  users: collection(db, "users")
};

// Agnostic Data functions

// coll: "users", data: {email: value}
export const addData = async (coll, data) => {
  await addDoc(collRefs[coll], data);
  return getData(coll);
};

// coll: "users", ID, data: {email: value}
export const updateData = async (coll, id, data) => {
  const docRef = doc(db, coll, id);
  await updateDoc(docRef, data);
  return getData(coll);
};

// coll: "users", ID
export const deleteData = async (coll, id) => {
  const userDoc = doc(db, coll, id);
  await deleteDoc(userDoc);
  return getData(coll);
};

// coll: "users"
export const getData = async (coll) => {
  const data = await getDocs(collRefs[coll]);
  return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

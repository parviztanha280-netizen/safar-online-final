import {initializeApp} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import {getFirestore,collection,addDoc,doc,setDoc,updateDoc,onSnapshot,query,orderBy,serverTimestamp} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";
import {firebaseConfig} from "./firebase-config.js";
const app=initializeApp(firebaseConfig); const db=getFirestore(app);
export {db,collection,addDoc,doc,setDoc,updateDoc,onSnapshot,query,orderBy,serverTimestamp};

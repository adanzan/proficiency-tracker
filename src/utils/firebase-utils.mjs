// Import the functions you need from the SDKs you need
import { getApp, initializeApp } from "firebase/app";
import {  initializeFirestore, connectFirestoreEmulator, getFirestore, collection, doc, addDoc, deleteDoc, getDocs } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAoxcB-w3JPHvl6vDZIPWbZxtXmMT0qjZc",
  authDomain: "project-kakapo.firebaseapp.com",
  projectId: "project-kakapo",
  storageBucket: "project-kakapo.appspot.com",
  messagingSenderId: "985729339799",
  appId: "1:985729339799:web:93a6e814e052d669a6b4d2"
};

// Initialize Firebase
export function initializeFirebase(){
    try{
      return getApp();
    } catch (e){
      // app has not been initialized
      const app = initializeApp(firebaseConfig);
  
      // initialize the database
      const db = initializeFirestore(app, {useFetchStreams: false})
      // connect up the emulator to the database
      if (process.env.NEXT_PUBLIC_EMULATE || process.env.FIRESTORE_EMULATOR_HOST){
        console.log("Connecting to emulator");
        connectFirestoreEmulator(db, "localhost", 8080 );
      }
      return app;
    }
  }

  /**
 * This is a helper function for bulk loading a collection. 
 * 
 * The main reason to use this is for seeding or testing.
 * 
 * @param {*} data - an Array of objects to be stored as documents
 * @param {string} collectionName  - the name of the collection
 */
export async function loadData(data, collectionName){

  const db = getFirestore();

  const collectionRef = collection(db, collectionName);

  await Promise.all(data.map(async (d)=>{
    // add the document to firestore
    const questionAnswerObj = {
      "qID" : d.qID,
      "question" : d.question,
      "answer" : d.answer
    }
    const questionChoiceObj = {
      "qID" : d.qID,
      "question" : d.question,
      "choices" : d.choices,
      "learningGoal" : d.learningGoal
    }

    await addDoc(collectionRef, questionAnswerObj);
    await addDoc(collectionRef, questionChoiceObj);


  }));
}


/**
 * This function is designed to remove all documents from a 
 * collection. (It will not take care of sub collections).
 * 
 * Its primary use is for testing.
 * 
 * @param {string} collectionName 
 */
export async function clearCollection(collectionName){
  const db = getFirestore();
  const docSnapshot = await getDocs(collection(db, collectionName));
  await Promise.all(docSnapshot.docs.map((d)=>{
    return deleteDoc(doc(db, "films", d.id))
  }));
}
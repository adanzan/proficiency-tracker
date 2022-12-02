// Import the functions you need from the SDKs you need
import { getApp, initializeApp } from "firebase/app";
import {  initializeFirestore, connectFirestoreEmulator, getFirestore, collection, doc, addDoc, deleteDoc, getDocs , setDoc} from "firebase/firestore";
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

//Function that seeds questions into databases
export async function loadData(data){

  const db = getFirestore();

  const queAnsRef = collection(db, "queAnsObjs");
  const queChoRef = collection(db, "queChoObjs");

  await Promise.all(data.map(async (d)=>{
    // add the document to firestore
    const questionAnswerObj = {
      "qID" : d.qID,
      "answer" : d.answer
    }
    const questionChoiceObj = {
      "qID" : d.qID,
      "question" : d.question,
      "choices" : d.choices,
      "learningGoal" : d.learningGoal
    }

    await addDoc(queAnsRef, questionAnswerObj);
    await addDoc(queChoRef, questionChoiceObj);


  }));
}

export async function addStudent(first, last, id){
  const db = getFirestore();

  const collectionRef = collection(db, "students");

  const student = {
    "first": first,
    "last": last,
    "id": id,
  }

  await setDoc(doc(collectionRef, student.id), student);
}

//Helper function to get highest score in a particular quiz
async function previousHighScore(quizNo, studentId){
  const db = getFirestore();
  let prev = undefined;
  const collectionSnapshot = await getDocs(collection(db, "students", studentId, "quizResults"));
  collectionSnapshot.forEach((document) => {
    if(document.id === `quiz${quizNo}`){
      prev = document.data();
    }
  });
  return (prev === undefined ? 0 : prev.bestScore);
}

//Updates students results in a particular quiz and also updates bestScore in that quiz
export async function updateStudentResults(quizNo, learningGoal,  studentId, attemptNo, score, answers){
  const db = getFirestore();

  const collectionRef = collection(db, "students");

  const hScore = await previousHighScore(quizNo, studentId);

  const quizObj = {
    "quizId": quizNo,
    "learningGoal": learningGoal,
    "bestScore": score > hScore ? score : hScore
    ,
  }

  const attempt = {
    "attemptNo": attemptNo,
    "score": score,
    "answers": answers,
  }

  await setDoc(doc(collectionRef, studentId, "quizResults", `quiz${quizNo}`), quizObj);
  await setDoc(doc(collectionRef, studentId, "quizResults", `quiz${quizNo}`, "attempts", `attempt ${attempt.attemptNo}`), attempt);
}

export async function addProfessor(first, last, id){
  const db = getFirestore();

  const collectionRef = collection(db, "professors");
  const professor = {
    "first": first,
    "last": last,
    "profId": id,
  }

  await addDoc(collectionRef, professor);
  
}

//Takes in a list of learningGoals and returns questions that meet that criteria
export async function getQuestions(learningGoals){
  const db = getFirestore();
  const collectionSnapshot = await getDocs(collection(db, "queChoObjs"))
  const questions = [];
  learningGoals.forEach((learningGoal) => {
    collectionSnapshot.forEach((document) => {
      if(document.data().learningGoal === learningGoal){
          questions.push(document.data());
      }
    })
  });
  console.log(questions);
  return questions;
}

// export async function getAnswers


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
/**
 * This loads the questionBank collection
 */


 import process from "node:process";
 import {readFileSync} from "node:fs";
 
 import {
   addProfessor,
   addStudent,
   getQuestions,
   initializeFirebase,
   loadData,
   updateStudentResults,
 } from "./firebase-utils.mjs";
 
 
 
 const seedFirestore = async(seedfile)=>{
   const contents = readFileSync(seedfile);
   const data = JSON.parse(contents);
 
   initializeFirebase();
   await loadData(data);
   await addProfessor("Christoper", "Andrews", "1");
   await addStudent("Smith", "Gakuya", "00739649");
   await updateStudentResults(["animals", "plants"], "00739649", "1", "50", [{"q1": "cow"}, {"q2" : "dog"}]);
   await updateStudentResults(["animals", "plants"], "00739649", "4", "500", [{"q1": "cow"}, {"q2" : "dog"}]);
   await updateStudentResults(["animals"], "00739649", "3", "10", []);
   await getQuestions([1]);
  
   console.log("Seeding complete");
 }
 
 
 const filename = process.argv[2]
 console.log(`Loading data from ${filename}`);
 
 seedFirestore(filename).then(process.exit);
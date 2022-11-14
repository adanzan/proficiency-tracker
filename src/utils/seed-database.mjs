/**
 * This loads the questionBank collection
 */


 import process from "node:process";
 import {readFileSync} from "node:fs";
 
 import {
     addProfessor,
   addStudent,
   initializeFirebase,
   loadData,
 } from "./firebase-utils.mjs";
 
 
 
 const seedFirestore = async(seedfile)=>{
   const contents = readFileSync(seedfile);
   const data = JSON.parse(contents);
 
   initializeFirebase();
   await loadData(data, "questionBank");
   await addProfessor("Christoper", "Andrews", "1");
   await addStudent("Smith", "Gakuya", "00739649")
  
   console.log("Seeding complete");
 }
 
 
 const filename = process.argv[2]
 console.log(`Loading data from ${filename}`);
 
 seedFirestore(filename).then(process.exit);
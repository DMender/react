// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getDatabase, ref, child, get } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZDm2iVa3I6yL8IDVI9jnsf4ytBvNvWks",
  authDomain: "react-4213a.firebaseapp.com",
  databaseURL: "https://react-4213a-default-rtdb.firebaseio.com",
  projectId: "react-4213a",
  storageBucket: "react-4213a.appspot.com",
  messagingSenderId: "174354638401",
  appId: "1:174354638401:web:0dfdfd005f3b8f5ecd48c0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const dbRef = ref(db);
get(child(dbRef, `posts`)).then((snapshot) => {
  if (snapshot.exists()) {
    console.log("Successful connection to Firebase.");
    sessionStorage.posts = JSON.stringify(snapshot.val());
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});
get(child(dbRef, `authors`)).then((snapshot) => {
  if (snapshot.exists()) {
    sessionStorage.authors = JSON.stringify(snapshot.val());
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});
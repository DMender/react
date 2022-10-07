// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getDatabase, ref, child, get, set } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js";

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

// recieve the comments from the Firebase database ONLY once on connection. 
/* if this were a production scale message board an event listener for the databse changing would be needed,
but the chances of two people overwriting each other in my demo is very slim and the contents of the comments are not important
so I'm taking a calculated shortcut */
get(child(dbRef, `posts`)).then((snapshot) => {
  if (snapshot.exists()) {
    console.log("Successful connection to Firebase server.");
    sessionStorage.posts = JSON.stringify(snapshot.val());
    sessionStorage.postChanges = sessionStorage.posts;
    sessionStorage.connected = true;
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

get(child(dbRef, `idlist`)).then((snapshot) => {
  if (snapshot.exists()) {
    sessionStorage.idlist = JSON.stringify(snapshot.val());
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});

get(child(dbRef, `datelist`)).then((snapshot) => {
  if (snapshot.exists()) {
    sessionStorage.datelist = JSON.stringify(snapshot.val());
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});

// onPageLoad event listener
document.addEventListener("DOMContentLoaded", function(event) {
  console.log("Page fully loaded and timer started!");
  window.setInterval(refresh, 200);
});

// if the comment is submitted in app.js send the data to Firebase in this file
function refresh() {
  if (sessionStorage.postChanges != sessionStorage.posts) {
    set(ref(db, `authors`), JSON.parse(sessionStorage.authors));
    set(ref(db, `posts`), JSON.parse(sessionStorage.posts));
    set(ref(db, `idlist`), JSON.parse(sessionStorage.idlist));
    set(ref(db, `datelist`), JSON.parse(sessionStorage.datelist));
    if (sessionStorage.connected) {
      sessionStorage.connected = false;
      sessionStorage.postChanges = sessionStorage.posts;
      location.reload();
    }
  } /*/ async communication between firebase.js and app.js debug code
  else {
    console.log("tick");
  }/**/
}
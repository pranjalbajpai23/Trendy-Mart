// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzUYs2a1B3CYan3h4Xm9hybxHH-a2GE2Y",
  authDomain: "authentication-93e2f.firebaseapp.com",
  databaseURL: "https://authentication-93e2f-default-rtdb.firebaseio.com",
  projectId: "authentication-93e2f",
  storageBucket: "authentication-93e2f.appspot.com",
  messagingSenderId: "772496980941",
  appId: "1:772496980941:web:818dcc4689f57ca0172284"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
console.log(firebase.auth().signInWithEmailAndPassword);    
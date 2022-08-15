
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyA6qR1nC7ixJr9WPvPco9ju-3TMUs0scnM",
  authDomain: "chati-react-chat-app.firebaseapp.com",
  projectId: "chati-react-chat-app",
  storageBucket: "chati-react-chat-app.appspot.com",
  messagingSenderId: "439269119341",
  appId: "1:439269119341:web:a366052a663627f5fdf664",
  measurementId: "G-V11CCQ720W"
};

const firebaseApp=firebase.initializeApp(firebaseConfig)
const db=firebaseApp.firestore()
const auth=firebase.auth()
const provider= new firebase.auth.GoogleAuthProvider();

export  {db,auth,provider};
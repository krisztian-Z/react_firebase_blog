import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
import {getAuth} from "firebase/auth";



const firebaseConfig = {
    apiKey: "AIzaSyD5fEEBU5vhk8WlaVPGPfavyDbQbL1Xd70",
    authDomain: "solentstudentblog.firebaseapp.com",
    projectId: "solentstudentblog",
    storageBucket: "solentstudentblog.appspot.com",
    messagingSenderId: "777112284050",
    appId: "1:777112284050:web:b4a3097a3093c94752ef4b"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const storage = getStorage(app);

  export {auth, db, storage};

import {initializeApp} from "firebase/app"
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore"


const firebaseConfig = {
    apiKey: "AIzaSyBNhg8aXs8IfQCqjzgJRn9eXJWvOGGBaiQ",
    authDomain: "task-manager-43c2e.firebaseapp.com",
    projectId: "task-manager-43c2e",
    storageBucket: "task-manager-43c2e.appspot.com",
    messagingSenderId: "201020569636",
    appId: "1:201020569636:web:4701749772cd0369f580b1"
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
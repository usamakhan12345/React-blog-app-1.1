import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth , createUserWithEmailAndPassword , signInWithEmailAndPassword ,  onAuthStateChanged  , signOut ,updatePassword} from "firebase/auth";
import { getFirestore , doc, setDoc , addDoc ,collection, serverTimestamp , Timestamp , query, where, onSnapshot ,getDoc , getDocs ,  updateDoc } from "firebase/firestore";





    const firebaseConfig = {
        apiKey: "AIzaSyA-cTxlFBrFylN-pBhiU6AqF2G28ZXkRB0",
        authDomain: "form-d3cbe.firebaseapp.com",
        projectId: "form-d3cbe",
        storageBucket: "form-d3cbe.appspot.com",
        messagingSenderId: "191835058931",
        appId: "1:191835058931:web:9646ef932eb37965bcbd86",
        measurementId: "G-B13VYH5FMG"
      }

      const app = initializeApp(firebaseConfig);
      const analytics = getAnalytics(app);
      const auth = getAuth(app);
      const db = getFirestore(app);
      console.log(auth)


export {auth , createUserWithEmailAndPassword , signInWithEmailAndPassword , onAuthStateChanged , db , doc, setDoc , signOut , addDoc ,collection , serverTimestamp, Timestamp , query, where, onSnapshot , getDoc , getDocs ,  updateDoc, updatePassword  };
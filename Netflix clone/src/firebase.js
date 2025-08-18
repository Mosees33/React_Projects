import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import {
  addDoc,
  collection,
  getFirestore
} from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "",
  authDomain: "netflix-clone-f7e6b.firebaseapp.com",
  projectId: "netflix-clone-f7e6b",
  storageBucket: "netflix-clone-f7e6b.firebasestorage.app",
  messagingSenderId: "176333849238",
  appId: ""
};


const app = initializeApp(firebaseConfig);
const Auth = getAuth(app)
const db = getFirestore(app);

const signUp = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(Auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
    toast.success("Account created succcesfully")
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      toast.error("Email is already in use.");
    } else {
      toast.error(error.message); 
    }
  }
}

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(Auth, email, password);
    toast.success("Logged In Successfully!");
  } catch (e) {
    if (e.code === 'auth/wrong-password' || e.code === 'auth/invalid-credential') {
      toast.error("Invalid Credentials");
    } else if (e.code === 'auth/user-not-found') {
      toast.error("User Not Found")
    } else {
      toast.error(e.message);
    }
  }
}

const logout = () => {
  signOut(Auth);
}

export { Auth, db, login, signUp, logout };


import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD5DqnSlrUM2N0ZrRrgH_P4P42Ojkndxis",
  authDomain: "crwn-clothingv.firebaseapp.com",
  projectId: "crwn-clothingv",
  storageBucket: "crwn-clothingv.appspot.com",
  messagingSenderId: "68342213980",
  appId: "1:68342213980:web:f496cb1dccbfb60766e599",
  measurementId: "G-LDJ4YHS6FG",
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopUp = () => signInWithPopup(auth, provider);

const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  // doc referense = doc(database, collectiong, identifier)
  // uid = unique identifier
  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (e) {
      console.log("error creating the user", e.message);
    }
  }

  return userDocRef;
};

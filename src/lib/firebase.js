import { initializeApp } from "firebase/app";
import { FieldValue } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCo68JXSvfvQDGD4hGawg5y5kvPCmL0SbI",
  authDomain: "insta-2-clone-6d3d8.firebaseapp.com",
  projectId: "insta-2-clone-6d3d8",
  storageBucket: "insta-2-clone-6d3d8.appspot.com",
  messagingSenderId: "878180342654",
  appId: "1:878180342654:web:b9e88175ea923cdccaf12f",
};
const firebaseApp = initializeApp(firebaseConfig);
const { value } = new FieldValue();

export { firebaseApp, value };

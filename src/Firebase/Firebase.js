
import { initializeApp } from "firebase/app";
import {getFirestore,collection} from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyCc2JfKYDRfjbLXYJzB-LgYV2yrbAmbA7k",
  authDomain: "flimyverse.firebaseapp.com",
  projectId: "flimyverse",
  storageBucket: "flimyverse.appspot.com",
  messagingSenderId: "819929401395",
  appId: "1:819929401395:web:18c8e08f5ec125fb48bb46"
};
const app = initializeApp(firebaseConfig);
export const db =getFirestore(app);
export const moviesRefe=collection(db,"movies");
export const reviewsRefe=collection(db,"reviews");
export const usersRefe=collection(db,"users");
export default app;
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCv84cTkunfxk0KtR0HN5BjZfWCVjxr4XY",
  authDomain: "cyboards-4a94d.firebaseapp.com",
  projectId: "cyboards-4a94d",
  storageBucket: "cyboards-4a94d.firebasestorage.app",
  messagingSenderId: "1010984319392",
  appId: "1:1010984319392:web:f4eac9315d54bd233b8cc5",
  measurementId: "G-SKD2WD5PWS"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;

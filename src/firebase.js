import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA8-qFUIj64exhlXvVjd2AjofuN-SCssNE",
  authDomain: "longdog-tracker-b389a.firebaseapp.com",
  projectId: "longdog-tracker-b389a",
  storageBucket: "longdog-tracker-b389a.appspot.com",
  messagingSenderId: "127376975766",
  appId: "1:127376975766:web:f66be96c960b1e041f1fb7",
  measurementId: "G-9X3ESKSHS4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);

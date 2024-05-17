import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBranZ8KndDZbJ--LJunuDUfuUPGjVpbA0",
  authDomain: "miniblog-7603e.firebaseapp.com",
  projectId: "miniblog-7603e",
  storageBucket: "miniblog-7603e.appspot.com",
  messagingSenderId: "320744757688",
  appId: "1:320744757688:web:9304be507667f3723a974d"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
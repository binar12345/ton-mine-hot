import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyDMmR3sh6iHu37TzytOQJUnKUZqQui42oA",
  authDomain: "test-818fd.firebaseapp.com",
  projectId: "test-818fd",
  storageBucket: "test-818fd.appspot.com",
  messagingSenderId: "946686728972",
  appId: "1:946686728972:web:6e875b5ffb05e39a1a0729",
  measurementId: "G-4ZKZJN8YN3"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export  {db};

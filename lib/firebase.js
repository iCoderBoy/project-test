import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyD3PpzET6dnuMDlzMGSQ5_mCr837uOx4Co",
  authDomain: "amalyot-adaa6.firebaseapp.com",
  databaseURL: "https://amalyot-adaa6-default-rtdb.firebaseio.com",
  projectId: "amalyot-adaa6",
  storageBucket: "amalyot-adaa6.firebasestorage.app",
  messagingSenderId: "988893324357",
  appId: "1:988893324357:web:a16b3cce52b52c773faf2c"
};


// Firebase o'rnatish
const app = initializeApp(firebaseConfig);

// Authentication, Firestore va Storage xizmatlarini ulash
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
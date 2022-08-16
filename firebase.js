import { initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  addDoc,
  query,
  getDocs,
  doc,
  serverTimestamp,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBP3mUfeOwGofF_zQbFvIac1VdbQ6mBsqE',
  authDomain: 'signal-clone-24575.firebaseapp.com',
  projectId: 'signal-clone-24575',
  storageBucket: 'signal-clone-24575.appspot.com',
  messagingSenderId: '323658065866',
  appId: '1:323658065866:web:c0174d94a31db33cd65133',
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auten = getAuth(app);
const auth = {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
};

export {
  db,
  auth,
  auten,
  collection,
  addDoc,
  query,
  getDocs,
  doc,
  serverTimestamp,
  orderBy,
  onSnapshot,
};

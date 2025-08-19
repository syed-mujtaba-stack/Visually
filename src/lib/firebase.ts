import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  projectId: "visually-sp6tf",
  appId: "1:630779654428:web:036cc968469e84a1f64ad9",
  storageBucket: "visually-sp6tf.firebasestorage.app",
  apiKey: "AIzaSyCkKmd1m-7w7LzfA_SatYP4dCGurFNtyB0",
  authDomain: "visually-sp6tf.firebaseapp.com",
  messagingSenderId: "630779654428",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };

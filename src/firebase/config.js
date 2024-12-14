import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyD6KonCGfKq9tD9YT_3v2m6zLn86wkVu-Y",
  authDomain: "speaket-323fc.firebaseapp.com",
  databaseURL: "https://speaket-323fc-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "speaket-323fc",
  storageBucket: "speaket-323fc.firebasestorage.app",
  messagingSenderId: "817906038170",
  appId: "1:817906038170:web:fe27a64928d464f3eaf623",
  measurementId: "G-T40TF51D1N"
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const database = getDatabase(app);
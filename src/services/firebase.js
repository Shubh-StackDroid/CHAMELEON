import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged, updateProfile } from 'firebase/auth';
import { getFirestore, serverTimestamp, doc, setDoc, updateDoc, collection, onSnapshot, getDoc, runTransaction } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'demo',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'demo.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'demo',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'demo.appspot.com',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || 'demo',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || 'demo'
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const ensureUser = () => new Promise(resolve => onAuthStateChanged(auth, u => resolve(u || signInAnonymously(auth).then(r => r.user)), { onlyOnce: true }));
export const saveName = name => auth.currentUser && updateProfile(auth.currentUser, { displayName: name });
export const roomCode = () => Array.from(crypto.getRandomValues(new Uint8Array(6))).map(n => 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'[n % 32]).join('');
export const roomRef = code => doc(db, 'rooms', code);
export const playersRef = code => collection(db, 'rooms', code, 'players');
export const playerRef = (code, uid) => doc(db, 'rooms', code, 'players', uid);
export const votesRef = code => collection(db, 'rooms', code, 'votes');
export const voteRef = (code, uid) => doc(db, 'rooms', code, 'votes', uid);
export const customWordsRef = uid => collection(db, 'users', uid, 'customWords');
export const customWordRef = (uid, id) => doc(db, 'users', uid, 'customWords', id);
export const listen = (ref, cb) => onSnapshot(ref, cb);
export { serverTimestamp, setDoc, updateDoc, getDoc, runTransaction };

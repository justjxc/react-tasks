import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyB6txr8asao11g45hxoJqXRtJZWKX9nFYA',
	authDomain: 'taskmanager-a1526.firebaseapp.com',
	projectId: 'taskmanager-a1526',
	storageBucket: 'taskmanager-a1526.appspot.com',
	messagingSenderId: '402237542275',
	appId: '1:402237542275:web:0c99d7ccb1d536cb2eb0b6',
	measurementId: 'G-CVWKHK8FRV',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);

const auth = getAuth();

export { db, auth };

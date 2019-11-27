import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore'; // <- needed if using firestore
import { createStore, combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { createFirestoreInstance, firestoreReducer } from 'redux-firestore'; // <- needed if using firestore

const firebaseConfig = {
	apiKey: 'AIzaSyB_tOnFxJW1YVDorwAfA47LzUSEQ0WYn_Q',
	authDomain: 'almacenamiento-remoto-828ae.firebaseapp.com',
	databaseURL: 'https://almacenamiento-remoto-828ae.firebaseio.com',
	projectId: 'almacenamiento-remoto-828ae',
	storageBucket: 'almacenamiento-remoto-828ae.appspot.com',
	messagingSenderId: '1059352880497',
	appId: '1:1059352880497:web:afe6eb4e8d2286322e02d0'
};

// react-redux-firebase config
const rrfConfig = {
	userProfile: 'users',
	useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
	// enableClaims: true // Get custom claims along with the profile
};

// Initialize firebase instance
firebase.initializeApp(firebaseConfig);

// Initialize other services on firebase instance
firebase.firestore(); // <- needed if using firestore

// Add firebase to reducers
const rootReducer = combineReducers({
	firebase: firebaseReducer,
	firestore: firestoreReducer // <- needed if using firestore
});

// Create store with reducers and initial state
const initialState = {};
const store = createStore(
	rootReducer,
	initialState,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const rrfProps = {
	firebase,
	config: rrfConfig,
	dispatch: store.dispatch,
	createFirestoreInstance // <- needed if using firestore
};

export { store, rrfProps };

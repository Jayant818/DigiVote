import firebase from 'firebase/app';
import 'firebase/auth';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyC3WVjIjqTkqludVa5IW5MzfuDzoVrE4jY",
	authDomain: "digivote-56aaa.firebaseapp.com",
	projectId: "digivote-56aaa",
	storageBucket: "digivote-56aaa.appspot.com",
	messagingSenderId: "960353137753",
	appId: "1:960353137753:web:c7ebc0772fe38fdf3a2d48",
	measurementId: "G-59F5W8GQEC",
};

const app = initializeApp(firebaseConfig);

export default app;

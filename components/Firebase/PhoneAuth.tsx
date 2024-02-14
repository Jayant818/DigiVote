"use client";
import { useState, useEffect, useRef } from "react";
import {
	getAuth,
	signInWithPhoneNumber,
	RecaptchaVerifier,
} from "firebase/auth";
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
const auth = getAuth(app);

let phoneNumberGlobal = "";

// window.recaptchaVerifier = new RecaptchaVerifier(
// 	"recaptcha-container",
// 	{
// 		size: "normal",
// 		callback: (response) => {
// 			sendVerificationCode(phoneNumberGlobal);
// 		},
// 		"expired-callback": () => {},
// 	},
// 	app
// );

function sendVerificationCode(phoneNumber) {
	const appVerifier = window.recaptchaVerifier;
	signInWithPhoneNumber(auth, phoneNumber, appVerifier)
		.then((confirmationResult) => {
			window.confirmationResult = confirmationResult;
		})
		.catch((error) => {});
}

function signInWithVerificationCode(code) {
	const confirmationResult = window.confirmationResult;
	confirmationResult
		.confirm(code)
		.then((result) => {
			const user = result.user;
		})
		.catch((error) => {});
}

export default function PhoneAuth() {
	const [phoneNumber, setPhoneNumber] = useState("");
	const recaptchaContainerRef = useRef(null); // Add a reference to the DOM element

	phoneNumberGlobal = phoneNumber;

	useEffect(() => {
		if (recaptchaContainerRef.current) {
			window.recaptchaVerifier = new RecaptchaVerifier(
				auth,
				recaptchaContainerRef.current, // use ref instead of id
				{
					size: "normal",
					callback: (response) => {
						sendVerificationCode(phoneNumberGlobal);
					},
					"expired-callback": () => {},
				}
			);
		}
	}, []);

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				sendVerificationCode(phoneNumber);
			}}
		>
			<input
				type="tel"
				value={phoneNumber}
				onChange={(e) => setPhoneNumber(e.target.value)}
				placeholder="Enter your phone number"
				required
			/>
			<button type="submit">Send OTP</button>
			<div id="recaptcha-container" ref={recaptchaContainerRef}></div>{" "}
			{/* Add the ref here */}
		</form>
	);
}

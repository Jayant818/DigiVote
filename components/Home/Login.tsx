"use client";
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SendHorizontal } from "lucide-react";
import { Loader2 } from "lucide-react";

import { sendSMS } from "@/lib/actions/send.actions";
import { useRouter } from "next/navigation";
import Webcam from "react-webcam";
import Image from "next/image";
import { ValidateUser } from "@/lib/actions/user.action";
import { setTimeout } from "timers";
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

const Login = (props) => {
	const [name, setName] = useState("");
	const [Aadhar, setaadhar] = useState("");
	const [otp, setOtp] = useState(12345678);
	const [flag, setFlag] = useState(false);
	const [loading, setLoading] = useState(false);
	const [generatedOtp, setGeneratedOtp] = useState(1);
	const router = useRouter();
	const [isInvalidOtp, setIsInvalidOtp] = useState(false);
	const [imgSrc, setImgSrc] = useState("");
	const [isValidUser, setIsValidUser] = useState(true);
	const [Voterid, setVoterid] = useState("");

	const recaptchaContainerRef = useRef(null);

	async function sendVerificationCode(phoneNumber) {
		console.log("Bhai BHia");
		console.log(recaptchaContainerRef.current);

		const recaptchaVerifier = new RecaptchaVerifier(
			auth,
			"recaptcha-container",
			{
				size: "invisible",
				callback: () => {
					console.log("recaptcha resolved..");
				},
			}
		);

		console.log("Verfied", recaptchaVerifier);
		await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier)
			.then((confirmationResult) => {
				setGeneratedOtp(otp);
				window.confirmationResult = confirmationResult;
				console.log("OTP sent");
			})
			.catch((error) => {
				console.log("Error aa gaya bhai ", error);
			});
		// }
	}

	const handleName = (e) => {
		setName(e.target.value);
	};
	const handleAadhar = (e) => {
		setaadhar(e.target.value);
	};

	const handleSubmit = async () => {
		const data = {
			name: name,
			aadharNo: Aadhar,
		};

		let User = await ValidateUser(data);
		console.log(User);
		setVoterid(User.voterId);
		if (User) {
			console.log(User.mobileNo);
			const num = `+91${User.mobileNo}`;
			await sendVerificationCode(num);
			capture();
			console.log("Called");
			setLoading(true);
			// await sendSMS(otp);
			setTimeout(() => {
				setFlag(true);
				setLoading(false);
			}, 5000);
		} else {
			setIsValidUser(false);
		}
	};

	const handleOtp = (e) => {
		setOtp(e.target.value);
	};

	const ResendOtp = async () => {
		// otp phir se send karo
		setLoading(true);
		const otp = Math.floor(100000 + Math.random() * 900000);
		setGeneratedOtp(otp);
		// await sendSMS(otp);
		setTimeout(() => {
			setLoading(false);
		}, 2000);
	};

	const handleLogin = () => {
		console.log(otp);
		window.confirmationResult
			.confirm(otp)
			.then((result) => {
				// User signed in successfully.
				const user = result.user;

				router.push(`/vote/${Voterid}`);

				// ...
			})
			.catch((error) => {
				console.log(error);
				console.log("Doesn't match");
				setIsInvalidOtp(true);
			});
	};

	const videoConstraints = {
		width: 1280,
		height: 720,
		facingMode: "user",
	};

	const webcamRef = React.useRef(null);
	const capture = React.useCallback(() => {
		console.log("capturing");
		const imageSrc = webcamRef.current.getScreenshot();
		setImgSrc(imageSrc);
		console.log(imageSrc);
	}, [webcamRef]);

	return (
		<div>
			<Dialog>
				<DialogTrigger asChild>
					<Button variant="outline">LogIN</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]">
					{flag ? (
						<>
							<DialogHeader>
								<DialogTitle>Verify</DialogTitle>
								<DialogDescription>Enter OTP</DialogDescription>
							</DialogHeader>
							<div className="grid gap-4 py-4">
								<div className="grid grid-cols-4 items-center gap-4">
									<Label htmlFor="otp">OTP</Label>
									<Input
										id="otp"
										className="col-span-3"
										onChange={handleOtp}
										value={otp}
									/>
								</div>
								<h3>Captured Image</h3>
								{imgSrc && (
									<Image src={imgSrc} alt="image" width={600} height={600} />
								)}
							</div>

							{isInvalidOtp && (
								<p className="text-red-500 text-sm">
									wrong OTP Pls try again...
								</p>
							)}
						</>
					) : (
						<>
							<DialogHeader>
								<DialogTitle>LogIN</DialogTitle>
								<DialogDescription>
									Enter Your Aadhar Card Details
								</DialogDescription>
							</DialogHeader>
							<div className="grid gap-4 py-4">
								<div className="grid grid-cols-4 items-center gap-4">
									<Label htmlFor="name">Name</Label>
									<Input
										id="name"
										className="col-span-3"
										onChange={handleName}
									/>
								</div>
								<div className="grid grid-cols-4 items-center gap-4">
									<Label htmlFor="username">Aadhar No.</Label>
									<Input
										id="Number"
										className="col-span-3"
										onChange={handleAadhar}
									/>
								</div>
								<div className="grid grid-cols-4 items-center gap-4">
									<Label htmlFor="webcam">Webcam</Label>
									<Webcam
										audio={false}
										// height={600}
										ref={webcamRef}
										screenshotFormat="image/webp"
										minScreenshotHeight={600}
										minScreenshotWidth={600}
										screenshotQuality={1}
										// width={600}
										videoConstraints={videoConstraints}
									/>
									{/* <Button onClick={capture}>Capture photo</Button> */}
								</div>
								{/* <div id="recaptcha-container" ref={recaptchaContainerRef}></div>{" "} */}
								{/* for firebase */}
								{/* <div id="recaptcha-container"></div> */}
								<div id="recaptcha-container"></div>
							</div>
						</>
					)}
					<DialogFooter>
						{flag ? (
							<div className="flex gap-2">
								<Button onClick={handleLogin}>
									Login
									<SendHorizontal className="ml-2 h-4 w-4" />
								</Button>
								{/* {loading ? (
									<Button disabled>
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
										Sending..
									</Button>
								) : ( */}
								{/* // <Button variant="destructive" onClick={ResendOtp}>
									// 	Resend OTP
									// </Button>
								// )} */}
							</div>
						) : (
							<>
								{loading ? (
									<Button disabled>
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
										Please wait
									</Button>
								) : (
									<>
										{/* <div
											id="recaptcha-container"
											ref={recaptchaContainerRef}
										></div> */}

										<Button type="submit" onClick={handleSubmit}>
											Send OTP
										</Button>
									</>
								)}
							</>
						)}
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default Login;

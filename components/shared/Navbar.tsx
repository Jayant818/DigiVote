"use client";
import React, { useEffect, useState } from "react";
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
import Register from "../Home/Register";
import { ValidateUser } from "@/lib/actions/user.action";

/*
---------
// */
// import { signInWithPhoneNumber } from "firebase/auth";
// import { getAuth, RecaptchaVerifier } from "firebase/auth";
// import { app } from "./Config";

const Navbar = () => {
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

		let isUser = await ValidateUser(data);
		if (isUser) {
			capture();
			console.log("Called");
			setLoading(true);
			const otp = Math.floor(100000 + Math.random() * 900000);
			setGeneratedOtp(otp);
			console.log("OTP ye hai ", otp);
			await sendSMS(otp);
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
		await sendSMS(otp);
		setTimeout(() => {
			setLoading(false);
		}, 2000);
	};

	const handleLogin = () => {
		if (otp == generatedOtp) {
			router.push("/vote");
		} else {
			console.log(otp, generatedOtp);
			setIsInvalidOtp(true);
		}
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

	/*
---------
*/

	// // Assuming 'app' is properly initialized elsewhere in your code
	// const auth = getAuth(app);

	// // Initialize recaptchaVerifier only if it's not already initialized
	// if (!(window as any).recaptchaVerifier) {
	// 	(window as any).recaptchaVerifier = new RecaptchaVerifier(
	// 		"recaptcha-container",
	// 		{
	// 			size: "invisible",
	// 			callback: (response) => {
	// 				console.log(response);
	// 				// reCAPTCHA solved, allow signInWithPhoneNumber.
	// 				// ...
	// 			},
	// 			"expired-callback": () => {
	// 				// Response expired. Ask user to solve reCAPTCHA again.
	// 				// ...
	// 			},
	// 		},
	// 		auth
	// 	);
	// }

	// const FbSendOTP = async () => {
	// 	try {
	// 		const formattedPhoneNumber = "+919711177191";
	// 		const confirmation = await signInWithPhoneNumber(
	// 			auth,
	// 			formattedPhoneNumber,
	// 			(window as any).recaptchaVerifier // Type assertion to inform TypeScript
	// 		);
	// 		console.log(confirmation);
	// 	} catch (err) {
	// 		console.error(err);
	// 	}
	// };
	/*
---------
*/

	return (
		<nav className="flex justify-between items-center px-6 py-2  bg-blue-400 ">
			<h3 className="font-extrabold text-white uppercase">DigiVote</h3>

			<div className="flex gap-4">
				<Register />
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
									{/* for firebase */}
									{/* <div id="recaptcha-container"></div> */}
									{!isValidUser && (
										<Image
											src="data:image/jpeg;base64,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"
											alt="Invalid user"
											width={600}
											height={600}
										/>
									)}
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
									{loading ? (
										<Button disabled>
											<Loader2 className="mr-2 h-4 w-4 animate-spin" />
											Sending..
										</Button>
									) : (
										<Button variant="destructive" onClick={ResendOtp}>
											Resend OTP
										</Button>
									)}
								</div>
							) : (
								<>
									{loading ? (
										<Button disabled>
											<Loader2 className="mr-2 h-4 w-4 animate-spin" />
											Please wait
										</Button>
									) : (
										// <Button type="submit" onClick={FbSendOTP}>
										<Button type="submit" onClick={handleSubmit}>
											Send OTP
										</Button>
									)}
								</>
							)}
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>
		</nav>
	);
};

export default Navbar;

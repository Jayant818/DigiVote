"use client";

import React, { useState } from "react";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import Webcam from "react-webcam";
import { createUser } from "@/lib/actions/user.action";

const Register = () => {
	const [imgSrc, setImgSrc] = useState("");
	const [name, setName] = useState("");
	const [aadhar, setAadhar] = useState("");
	const [number, setNumber] = useState("");
	const [voterId, setVoterId] = useState("");

	const videoConstraints = {
		width: 1280,
		height: 720,
		facingMode: "user",
	};
	const webcamRef = React.useRef(null);
	const capture = React.useCallback(async () => {
		console.log("capturing");
		const imageSrc = webcamRef.current.getScreenshot();
		setImgSrc(imageSrc);
		console.log(imageSrc);
		return imageSrc;
	}, [webcamRef]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const imageSrc = await capture();
		console.log("Submitted");
		const plainImg = imageSrc.split(",")[1];
		const data = {
			name: name,
			aadharNo: aadhar,
			mobileNo: number,
			img: plainImg,
			voterId: voterId,
			hasVoted: false,
		};
		console.log("Data", data);
		await createUser(data);
	};

	return (
		<div>
			<Dialog>
				<DialogTrigger asChild>
					<Button variant="outline">Register</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Add Your Account</DialogTitle>
						<DialogDescription>
							Enter your details to add your account
						</DialogDescription>
					</DialogHeader>
					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="name">Name</Label>
							<Input
								id="name"
								className="col-span-3"
								onChange={(e) => setName(e.target.value)}
							/>
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="aadhar">Aadhar No</Label>
							<Input
								id="aadhar"
								className="col-span-3"
								onChange={(e) => setAadhar(e.target.value)}
							/>
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="Voter Id">Voter Id</Label>
							<Input
								id="Voter Id"
								className="col-span-3"
								onChange={(e) => setVoterId(e.target.value)}
							/>
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="number">Mobile No</Label>
							<Input
								id="number"
								className="col-span-3"
								onChange={(e) => setNumber(e.target.value)}
							/>
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="webcam">Webcam</Label>
							<Webcam
								audio={false}
								// height={600}
								ref={webcamRef}
								screenshotFormat="image/webp"
								minScreenshotHeight={200}
								minScreenshotWidth={200}
								screenshotQuality={0.5}
								// width={600}
								videoConstraints={videoConstraints}
							/>
							{/* <Button onClick={capture}>Capture photo</Button> */}
						</div>
					</div>
					<DialogFooter>
						<DialogClose asChild>
							<Button type="submit" onClick={handleSubmit}>
								Register
							</Button>
						</DialogClose>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default Register;

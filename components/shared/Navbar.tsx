"use client";
import React, { useState } from "react";
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

const Navbar = () => {
	const [name, setName] = useState("");
	const [Aadhar, setaadhar] = useState();
	const [otp, setOtp] = useState("12345678");
	const [flag, setFlag] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleName = (e) => {
		setName(e.target.value);
	};
	const handleAadhar = (e) => {
		setaadhar(e.target.value);
	};

	const handleSubmit = () => {
		console.log("Called");
		setLoading(true);
		setTimeout(() => {
			setFlag(true);
			setLoading(false);
		}, 5000);
	};

	const handleOtp = (e) => {
		setOtp(e.target.value);
	};

	const ResendOtp = () => {
		// otp phir se send karo
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
		}, 2000);
	};
	return (
		<nav className="flex justify-between items-center px-6 py-2  bg-blue-400 ">
			<h3 className="font-extrabold text-white uppercase">DigiVote</h3>

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
							</div>
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
							</div>
						</>
					)}
					<DialogFooter>
						{flag ? (
							<div className="flex gap-2">
								<Button>
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
									<Button type="submit" onClick={handleSubmit}>
										Send OTP
									</Button>
								)}
							</>
						)}
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</nav>
	);
};

export default Navbar;

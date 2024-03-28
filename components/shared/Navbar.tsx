"use client";
import { useState } from "react";
import Web3 from "web3";
import Login from "../Home/Login";
import Register from "../Home/Register";
import { Button } from "../ui/button";

interface NavbarProps {
	isValidUser?: boolean;
	connect?: () => void;
	connected?: boolean;
}

const Navbar = ({
	isValidUser = false,
	connect,
	connected = false,
}: NavbarProps) => {
	const [isMetaMaskConnected, setIsMetaMaskConnected] = useState(false);

	const handleClick = async () => {
		try {
			if (connect) connect();
		} catch (error) {
			console.error("Error connecting to MetaMask:", error);
		}
	};

	return (
		<nav className="flex justify-between items-center px-6 py-2 bg-blue-400">
			<h3 className="font-extrabold text-white uppercase">DigiVote</h3>
			{!isValidUser && (
				<>
					<div className="flex gap-4">
						<Register />
						<Login />
					</div>
				</>
			)}
			{isValidUser &&
				(connected ? (
					<p>Connected to metamask</p>
				) : (
					<Button
						onClick={handleClick}
						className="bg-blue-500 text-white font-bold rounded-md px-4 py-2"
					>
						Connect to MetaMask
					</Button>
				))}
		</nav>
	);
};

export default Navbar;

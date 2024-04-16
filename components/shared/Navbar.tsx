"use client";
import { useState } from "react";
import Web3 from "web3";
import Login from "../Home/Login";
import Register from "../Home/Register";
import { Button } from "../ui/button";
import Link from "next/link";

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
	const [scrolling, setScrolling] = useState(false);

	// useEffect(() => {
	// 	const handleScroll = () => {
	// 		if (window.scrollY > 0) {
	// 			setScrolling(true);
	// 		} else {
	// 			setScrolling(false);
	// 		}
	// 	};

	// 	window.addEventListener("scroll", handleScroll);

	// 	return () => {
	// 		window.removeEventListener("scroll", handleScroll);
	// 	};
	// }, []);
	// const [isMetaMaskConnected, setIsMetaMaskConnected] = useState(false);

	// const handleClick = async () => {
	// 	try {
	// 		if (connect) connect();
	// 	} catch (error) {
	// 		console.error("Error connecting to MetaMask:", error);
	// 	}
	// };

	return (
		<div className=" flex justify-between w-full px-10   transition duration-300 ease-in-out">
			<h1 className="text-2xl text-stone-900 font-semibold">DigiVote</h1>
			{!isValidUser ? (
				<>
					<ul className="text-stone-900 flex justify-between text-lg w-[160px]">
						<li>
							<Link href="/" className="relative group">
								<Register />
								<div className="absolute w-full h-[2px] bg-amber-500 bottom-[-5px] left-0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></div>
							</Link>
						</li>
						<li>
							<Link href="/" className="relative group">
								<Login />
								<div className="absolute w-full h-[2px] bg-amber-500 bottom-[-5px] left-0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></div>
							</Link>
						</li>
					</ul>
				</>
			) : (
				<>
					<Link href="/" className="relative group text-black">
						Logout
						<div className="absolute w-full h-[2px] bg-amber-500 bottom-[-5px] left-0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></div>
					</Link>
				</>
			)}
		</div>
	);
};

export default Navbar;

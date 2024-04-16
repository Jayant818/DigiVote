"use client";
import { connectCallBack } from "@/lib/utils";
import Image from "next/image";
import React, { useState } from "react";

const GetResult = () => {
	const [contract, setContract] = useState(null);
	const [connected, setConnected] = useState(false);
	const [loading, setLoading] = useState(false);
	const [votes, setVotes] = useState([]);
	const [Result, setResult] = useState(null);
	const [submitted, setSubbmitted] = useState(false);

	const [electionName, setElectionName] = useState("");
	const [address, setAddress] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSubbmitted(true);
		console.log(votes);
		// get the objects from the votes array and filter them on the basis of name and contract address
		const result = votes.filter(
			(vote) => vote.name === electionName && vote.owner === address
		);
		console.log(result);
		setResult(result);
		console.log("Submit");
		setSubbmitted(false);
	};

	const handleClick = async () => {
		setLoading(true);
		const { contract, connected, newVotes } = await connectCallBack();
		console.log("Votes", newVotes);
		setContract(contract);
		setConnected(connected);
		setVotes(newVotes);
		setLoading(false);
	};

	if (!connected && !loading) {
		return (
			<div className="relative">
				<div className="h-screen w-full overflow-hidden  dark:bg-black bg-neutral-100  dark:bg-dot-neutral/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center">
					{/* Radial gradient for the container to give a faded look */}
					<div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-neutral-100 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
					<p
						className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-stone-900  py-8 "
						onClick={handleClick}
					>
						Connect To{" "}
						<span className="text-blue-700 cursor-pointer">MetaMask</span>
					</p>
				</div>
				<div className="absolute top-8 flex justify-center w-screen"></div>
				<div className="flex items-center justify-center absolute top-0 bottom-16 left-[150px]">
					<Image src="/bgImg.jpeg" alt="bgimg" width={1100} height={1100} />
				</div>
			</div>
		);
	}

	if (loading) {
		return (
			<div className="flex justify-center items-center mt-20">
				<div id="wifi-loader">
					<svg className="circle-outer" viewBox="0 0 86 86">
						<circle className="back" cx="43" cy="43" r="40"></circle>
						<circle className="front" cx="43" cy="43" r="40"></circle>
						<circle className="new" cx="43" cy="43" r="40"></circle>
					</svg>
					<svg className="circle-middle" viewBox="0 0 60 60">
						<circle className="back" cx="30" cy="30" r="27"></circle>
						<circle className="front" cx="30" cy="30" r="27"></circle>
					</svg>
					<svg className="circle-inner" viewBox="0 0 34 34">
						<circle className="back" cx="17" cy="17" r="14"></circle>
						<circle className="front" cx="17" cy="17" r="14"></circle>
					</svg>
					<div className="text" data-text="Searching"></div>
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col items-center justify-center  min-h-screen bg-gray-100">
			<h3 className="text-2xl font-bold mb-6 text-gray-800">Get Your Result</h3>
			<form className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
				<div className="mb-4">
					<input
						type="text"
						placeholder="Enter Your Election Name"
						className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
						onChange={(e) => setElectionName(e.target.value)}
					/>
				</div>
				<div className="mb-6">
					<input
						type="text"
						placeholder="Enter Your Address"
						className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
						onChange={(e) => setAddress(e.target.value)}
					/>
				</div>
				<button
					type="submit"
					className="w-full py-2 px-4 bg-indigo-600 text-white font-bold rounded-md hover:bg-indigo-700 transition-colors duration-300"
					onClick={handleSubmit}
				>
					Submit
				</button>
			</form>
			<div>
				{submitted ? (
					<div className="flex justify-center items-center mt-20">
						<div id="wifi-loader">
							<svg className="circle-outer" viewBox="0 0 86 86">
								<circle className="back" cx="43" cy="43" r="40"></circle>
								<circle className="front" cx="43" cy="43" r="40"></circle>
								<circle className="new" cx="43" cy="43" r="40"></circle>
							</svg>
							<svg className="circle-middle" viewBox="0 0 60 60">
								<circle className="back" cx="30" cy="30" r="27"></circle>
								<circle className="front" cx="30" cy="30" r="27"></circle>
							</svg>
							<svg className="circle-inner" viewBox="0 0 34 34">
								<circle className="back" cx="17" cy="17" r="14"></circle>
								<circle className="front" cx="17" cy="17" r="14"></circle>
							</svg>
							<div className="text" data-text="Searching"></div>
						</div>
					</div>
				) : (
					<>
						{!Result ? (
							<h3 className="text-lg text-gray-600 mt-10">
								No Result Available
							</h3>
						) : (
							<div className="w-full flex justify-center items-center">
								<div className="space-y-4 border-2 border-dashed border-gray-400 rounded-md mt-10 p-4  shadow-md hover:shadow-lg transition-shadow duration-300">
									<div className="flex gap-2 items-center text-gray-500">
										Results of {Result[0].description}
									</div>
									<h3 className="text-3xl font-bold text-gray-800">
										{Result[0].description}
									</h3>
									<p className="space-y-3 mt-4">
										{Result[0].options.map((option, idx) => (
											<div
												key={Math.random() + idx}
												className="flex gap-4 w-[90%] justify-between items-center"
											>
												<div className="flex gap-2 items-center">
													{Result[0].images && (
														<img
															src={Result[0].images[option]}
															alt={option}
															className="w-8 h-8 rounded-full"
														/>
													)}
													<p className="text-gray-800">{option}</p>
												</div>
												<p className="text-gray-800">{Result[0].Votes[idx]}</p>
											</div>
										))}
									</p>
								</div>
							</div>
						)}
					</>
				)}
			</div>
		</div>
	);
};

// const obj = {
//     "id": 2,
//     "owner": "0x1CBd3b2770909D4e10f157cABC84C7264073C9Ec",
//     "createdAt": 1712602588,
//     "endTime": 1713293760000,
//     "totalVotes": 1,
//     "Votes": [
//         0,
//         1,
//         0
//     ],
//     "description": "PM Election 2024",
//     "options": [
//         "Mallikarjun Kharge - Congress",
//         "Narendra Modi - BJP",
//         "None"
//     ],
//     "images": {
//         "Mallikarjun Kharge - Congress": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Mallikarjun_Kharge_%28crop%29.jpg/112px-Mallikarjun_Kharge_%28crop%29.jpg",
//         "Narendra Modi - BJP": "https://upload.wikimedia.org/wikipedia/commons/1/1a/Official_Photograph_of_Prime_Minister_Narendra_Modi_Portrait_%28crop%29.png",
//         "None": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdtXQvVco8EV9mB6qqvu3BsBnqrkmP7gLV-g&s"
//     },
//     "state": "All",
//     "name": "PM Election"
// }

export default GetResult;

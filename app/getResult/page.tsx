"use client";
import { connectCallBack } from "@/lib/utils";
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
			<div className="text-3xl">
				Connect To{" "}
				<span className="text-blue-700 cursor-pointer" onClick={handleClick}>
					MetaMask
				</span>
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
		<div>
			<h3>Get Your Result</h3>
			<form className="border-2 border-dashed border-zinc-700">
				<input
					type="text"
					placeholder="Enter Your Election Name"
					className="px-4 py-2"
					onChange={(e) => setElectionName(e.target.value)}
				/>
				<input
					type="text"
					placeholder="Enter Your Address"
					className="px-4 py-2"
					onChange={(e) => setAddress(e.target.value)}
				/>
				<button
					type="submit"
					className="px-4 py-2 bg-blue-700 text-white"
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
							<h3>No Result Available</h3>
						) : (
							<div>
								<h3>{JSON.stringify(Result[0].Votes)}</h3>
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

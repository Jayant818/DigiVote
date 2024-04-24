"use client";
import Navbar from "@/components/shared/Navbar";
import { getContract } from "@/components/shared/contract";
import React, { useEffect, useState } from "react";

const CreateVote = () => {
	const [contract, setContract] = useState(null);
	const [isConnected, setIsConnected] = useState(false);
	const [ipfsUrl, setIpfsUrl] = useState("");
	const [numOptions, setNumOptions] = useState(0);
	const [endDate, setEndDate] = useState("");

	useEffect(() => {
		async function checkConnection() {
			const accounts = await window?.ethereum?.request({
				method: "eth_requestAccounts",
			});
			if (Array.isArray(accounts) && accounts.length > 0) {
				handleInit();
			} else {
				setIsConnected(false);
			}
		}
	}, []);

	const handleInit = async () => {
		setIsConnected(true);
		const { contract, signer } = await getContract();
		setContract(contract);
	};

	const connectCallBack = async () => {
		const { contract, signer } = await getContract();
		setContract(contract);
		if (contract) {
			console.log("Contract", contract);
			setIsConnected(true);
		}
	};

	const handleCreateVote = async (e) => {
		e.preventDefault();

		// Validate input fields
		if (!ipfsUrl || !numOptions || !endDate) {
			alert("Please fill in all required fields.");
			return;
		}

		try {
			const { contract } = await getContract();
			if (!contract) {
				throw new Error("Failed to connect to contract. Please try again.");
			}

			// Parse the endDate string to get the Unix timestamp in milliseconds
			const endDateTime = new Date(endDate).getTime();
			const data = await contract.createVote(ipfsUrl, numOptions, endDateTime);
			console.log("Vote creation data:", data);
			alert("Vote Created Successfully");
		} catch (error) {
			console.error("Error creating vote:", error);
			alert("Error Creating Vote: " + error.message);
		}
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
			<div className="max-w-md w-full px-4 py-8 bg-white shadow-lg rounded-lg">
				<h1 className="text-2xl font-bold mb-6 text-center">Create Election</h1>
				<form onSubmit={handleCreateVote}>
					<div className="mb-4">
						<label
							htmlFor="ipfsUrl"
							className="block text-gray-700 font-bold mb-2"
						>
							IPFS URL:
						</label>
						<input
							type="text"
							id="ipfsUrl"
							value={ipfsUrl}
							onChange={(e) => setIpfsUrl(e.target.value)}
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>
					<div className="mb-4">
						<label
							htmlFor="numOptions"
							className="block text-gray-700 font-bold mb-2"
						>
							Number of Options:
						</label>
						<input
							type="number"
							id="numOptions"
							value={numOptions}
							onChange={(e) => setNumOptions(parseInt(e.target.value, 10))}
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>
					<div className="mb-6">
						<label
							htmlFor="endDate"
							className="block text-gray-700 font-bold mb-2"
						>
							End Date and Time:
						</label>
						<input
							type="datetime-local"
							id="endDate"
							value={endDate}
							onChange={(e) => setEndDate(e.target.value)}
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>
					<button
						type="submit"
						className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 transition-colors duration-300"
					>
						Create Vote
					</button>
				</form>
			</div>
		</div>
	);
};

export default CreateVote;

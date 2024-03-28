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
		// ... (rest of your code for collecting form data)

		try {
			const { contract } = await getContract();
			console.log("Contract value is this ", contract);

			if (!contract) {
				throw new Error("Failed to connect to contract. Please try again.");
			}

			await contract.createVote(
				ipfsUrl,
				numOptions,
				new Date(endDate).getTime()
			);
			alert("Vote Created Successfully");
		} catch (error) {
			alert("Error Creating Vote: " + error.message);
		}
	};

	return (
		<div>
			<Navbar
				isValidUser={true}
				connect={connectCallBack}
				connected={isConnected}
			/>
			<div className="max-w-md mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
				<h2 className="text-2xl font-bold mb-6 text-center">Create Vote</h2>
				<form>
					<div className="mb-4">
						<label htmlFor="ipfsUrl" className="block font-bold mb-2">
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
						<label htmlFor="numOptions" className="block font-bold mb-2">
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
						<label htmlFor="endDate" className="block font-bold mb-2">
							End Date:
						</label>
						<input
							type="date"
							id="endDate"
							value={endDate}
							onChange={(e) => setEndDate(e.target.value)}
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>
					<button
						onClick={handleCreateVote}
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

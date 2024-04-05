"use client";
import Navbar from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";
import { getUserData } from "@/lib/actions/user.action";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { MetaMaskInpageProvider } from "@metamask/providers";
import { ethers } from "ethers";
import { abi, address, getContract } from "@/components/shared/contract";
import Vote from "@/components/Vote/Vote";

declare global {
	interface Window {
		ethereum?: MetaMaskInpageProvider;
	}
}

//@ts-ignore

export const Page = (params: any) => {
	const [contract, setContract] = useState(null);
	const [isConnected, setIsConnected] = useState(false);
	const id = params.params.id;
	const [votes, setVotes] = useState([]);

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

	const gateway = "https://silver-quiet-sheep-692.mypinata.cloud/";

	const handleInit = async () => {
		const { contract, signer } = await getContract();
		setContract(contract);
		setIsConnected(true);
	};

	const connectCallBack = async () => {
		const { contract, signer } = await getContract();

		setContract(contract);
		if (contract) {
			console.log("Contract", contract);
			// setTimeout(() => {
			// }, 4000);
			const filter = contract.filters.VoteCreated();
			const events = await contract.queryFilter(filter);
			console.log(events);
			await setVoteData(events);
			setIsConnected(true);
		}
	};

	const setVoteData = async (Votes) => {
		console.log("Called");
		const newVotes = [];
		const promises = [];
		const { contract, signer } = await getContract();

		for (const vote of Votes) {
			console.log("Vote", vote);
			console.log("Vote", vote.args);

			// const voteCreatedEventInterface = new ethers.utils.Interface([
			// 	"event VoteCreated(address indexed owner, uint256 indexed createdAt, uint256 indexed voteId, uint256 endTime)",
			// ]);

			// // Decode the event arguments
			// const decodedArgs = voteCreatedEventInterface.decodeEventLog(
			// 	"VoteCreated",
			// 	vote.args,
			// 	[
			// 		"0xBcd4042DE499D14e55001CcbB24a551F3b954096", // owner address
			// 		ethers.BigNumber.from("1712341842"), // createdAt timestamp
			// 		ethers.BigNumber.from("0"), // voteId
			// 		ethers.BigNumber.from("1712448000000"), // endTime timestamp
			// 	]
			// );

			// // Access the decoded arguments
			// const owner = decodedArgs.owner;
			// const createdAt = decodedArgs.createdAt.toNumber();
			// const voteId = decodedArgs.voteId.toNumber();
			// const endTime = decodedArgs.endTime.toNumber();
			const { 0: owner, 1: createdAt, 2: voteId, 3: endTime } = vote.args;
			console.log("Owner", owner);
			console.log("contract", contract);
			const voteData = await contract.getVote(voteId);
			console.log("Vote Data", voteData);
			const uri = voteData[0];
			if (!uri) return;
			const currentVotes = voteData[2];
			const currentVoteNumbers = currentVotes.map((val) => Number(val));
			const newVote = {
				id: Number(voteId),
				owner: owner,
				createdAt: Number(createdAt),
				endTime: Number(endTime),
				totalVotes: currentVoteNumbers.reduce((sum, value) => sum + value, 0),
				Votes: currentVoteNumbers,
			};
			try {
				const data = await fetch(gateway + uri);
				const newData = await data.json();
				newVote.description = newData.description;
				newVote.options = newData.options;
				newVotes.push(newVote);
			} catch (e) {
				console.error(e);
			}
			// promises.push(promise);
		}
		console.log("New Votes", newVotes);
		// await Promise.all(promises);
		setVotes(newVotes);
	};

	// console.log(params.params.id);
	// console.log("Type of id ", typeof id);
	// console.log(id);
	// const user = await getUserData(id);
	// const user = null;
	// if (!user) {
	// 	return <div>User not found</div>;
	// }
	return (
		<>
			<Navbar
				isValidUser={true}
				connect={connectCallBack}
				connected={isConnected}
			/>
			<Vote
				connected={isConnected}
				connectCallBack={connectCallBack}
				contract={contract}
				votes={votes}
			/>
		</>
	);
};

export default Page;

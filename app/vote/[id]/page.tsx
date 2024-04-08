"use client";
import Navbar from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";
import { getUserData, updateUser } from "@/lib/actions/user.action";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { MetaMaskInpageProvider } from "@metamask/providers";
import { ethers } from "ethers";
import { abi, address, getContract } from "@/components/shared/contract";
import Vote from "@/components/Vote/Vote";
import { User } from "lucide-react";

declare global {
	interface Window {
		ethereum?: MetaMaskInpageProvider;
	}
}

//@ts-ignore

export const Page = ({ params }: any) => {
	const [contract, setContract] = useState(null);
	const [isConnected, setIsConnected] = useState(false);
	const [user, setUser] = useState(null);
	console.log(params.id);
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
		getUserData(params.id).then((data) => {
			setUser(data);
			console.log("User", data);
		});
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
				newVote.images = newData.images;
				newVote.state = newData.state;
				newVote.name = newData.name;
				newVotes.push(newVote);
			} catch (e) {
				console.error(e);
			}
		}
		console.log("New Votes", newVotes);
		setVotes(newVotes);
	};

	const VoteNow = async (id, optionIdx, name) => {
		try {
			console.log(user);
			await contract?.vote(id, optionIdx);
			alert("Vote recorded successfully");
			// Additional code after successful vote recording can go here
			const newUser = await updateUser(user.voterId, name);
			console.log("updated User", newUser);
			setUser(newUser);
		} catch (e) {
			alert("Already Voted");
		}
	};

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
				userData={user}
				VoteNow={VoteNow}
			/>
		</>
	);
};

export default Page;

import { getContract } from "@/components/shared/contract";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
const gateway = "https://silver-quiet-sheep-692.mypinata.cloud/";

export const connectCallBack = async () => {
	const { contract, signer } = await getContract();

	// setContract(contract);
	if (contract) {
		console.log("Contract", contract);
		const filter = contract.filters.VoteCreated();
		const events = await contract.queryFilter(filter);
		const newVotes = await setVoteData(events);
		// setIsConnected(true);
		return { contract, connected: true, newVotes };
	}
	return { contract, connected: false };
};

export const setVoteData = async (Votes: any) => {
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
	return newVotes;
};

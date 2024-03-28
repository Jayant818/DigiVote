import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";

interface VoteParams {
	connected: boolean;
	connectCallBack: () => void;
	contract: any;
}

const Vote = ({ connected, connectCallBack, contract }: VoteParams) => {
	const [votes, setVotes] = useState([]);
	const gateway = "https://silver-quiet-sheep-692.mypinata.cloud/";
	useEffect(() => {
		const getData = async () => {
			// getting the event VoteCreated from the Logs
			const filter = contract.filters.VoteCreated();
			const result = await contract.queryFilter(filter);
			console.log(result);
			if (result) setVoteData(result);
		};
		if (!contract) {
			return;
		} else {
			getData();
		}

		// get the data from BC
	}, [contract]);

	const setVoteData = async (votes) => {
		const newVotes = [];
		const promises = [];

		for (const vote of votes) {
			const { owner, createdAt, voteId, endTime } = vote.args;
			const voteData = await contract.getVote(voteId);
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
				votes: currentVoteNumbers,
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
		// await Promise.all(promises);
		setVotes(newVotes);
	};

	const VoteNow = async (id, optionIdx) => {
		await contract
			.vote(id, optionIdx)
			.then(() => alert("Success"))
			.catch((e) => alert(e.message));
	};

	if (!connected) {
		return (
			<div className="text-3xl">
				Connect To{" "}
				<span
					className="text-blue-700 cursor-pointer"
					onClick={connectCallBack}
				>
					MetaMask
				</span>
			</div>
		);
	}
	return (
		<div>
			{votes && (
				<>
					<h3>{votes[0].description}</h3>
					<p>
						{votes[0].options.map((option, idx) => (
							<div key={Math.random() + idx}>
								<p>
									{option} - {votes[0].votes[idx]}
								</p>
								<Button
									onClick={() => {
										VoteNow(votes[0].id, idx);
									}}
								>
									Vote
								</Button>
							</div>
						))}
					</p>
				</>
			)}
		</div>
	);
};

export default Vote;

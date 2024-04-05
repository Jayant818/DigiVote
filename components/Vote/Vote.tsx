"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";

interface VoteParams {
	connected: boolean;
	connectCallBack: () => void;
	contract: any;
	votes: any;
}

const Vote = ({ connected, connectCallBack, contract, votes }: VoteParams) => {
	const VoteNow = async (id, optionIdx) => {
		await contract
			.vote(id, optionIdx)
			.then(() => alert("Vote recorded successfully"))
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
			{connected && (
				// <>{JSON.stringify(votes)}</>
				<>
					{votes.length === 0 ? (
						<h3>No votes available</h3>
					) : (
						<div className=" flex  flex-col px-10  py-10 gap-4  border-2 rounded-md mt-10 ">
							{votes.map((vote, idx) => (
								<div key={Math.random() + idx} className="space-y-4">
									<h3 className="text-3xl font-bold text-white ">
										{vote.description}
									</h3>
									<p className="space-y-3 mt-4">
										{vote.options.map((option, idx) => (
											<div
												key={Math.random() + idx}
												className="flex gap-4 w-[40%] justify-between"
											>
												<div className="flex gap-4 items-center">
													{vote.images && (
														<Image
															alt={option}
															src={vote.images[option]}
															width={50}
															height={50}
														/>
													)}
													<p className="text-white">{option}</p>
												</div>
												<Button
													onClick={() => {
														VoteNow(vote.id, idx);
													}}
												>
													Vote
												</Button>
											</div>
										))}
									</p>
								</div>
							))}
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default Vote;

// import React, { useEffect, useState } from "react";
// import { Button } from "../ui/button";

// interface VoteParams {
// 	connected: boolean;
// 	connectCallBack: () => void;
// 	contract: any;
// }

// const Vote = ({ connected, connectCallBack, contract }: VoteParams) => {
// 	const [votes, setvotes] = useState([]);
//
// 	const gateway = "https://silver-quiet-sheep-692.mypinata.cloud/";
// 	useEffect(() => {
// 		const handleVoteCreated = (owner, createdAt, voteId, endTime) => {
// 			console.log("VoteCreated event:", owner, createdAt, voteId, endTime);
// 			// You can add your logic here to update the votes state or fetch the new vote data
// 		};

// 		if (contract) {
// 			const filter = contract.filters.VoteCreated();
// 			contract.on(filter, handleVoteCreated);

// 			// Clean up the event listener when the component unmounts
// 			return () => {
// 				contract.off(filter, handleVoteCreated);
// 			};
// 		}
// 	}, [contract]);

// 	const setVoteData = async (votes) => {
// 		const newvotes = [];
// 		const promises = [];

// 		for (const vote of votes) {
// 			const { owner, createdAt, voteId, endTime } = vote.args;
// 			const voteData = await contract.getVote(voteId);
// 			const uri = voteData[0];
// 			if (!uri) return;
// 			const currentvotes = voteData[2];
// 			const currentVoteNumbers = currentvotes.map((val) => Number(val));
// 			const newVote = {
// 				id: Number(voteId),
// 				owner: owner,
// 				createdAt: Number(createdAt),
// 				endTime: Number(endTime),
// 				totalvotes: currentVoteNumbers.reduce((sum, value) => sum + value, 0),
// 				votes: currentVoteNumbers,
// 			};
// 			try {
// 				const data = await fetch(gateway + uri);
// 				const newData = await data.json();
// 				newVote.description = newData.description;
// 				newVote.options = newData.options;
// 				newvotes.push(newVote);
// 			} catch (e) {
// 				console.error(e);
// 			}
// 			// promises.push(promise);
// 		}
// 		// await Promise.all(promises);
// 		setvotes(newvotes);
// 	};

// 	const VoteNow = async (id, optionIdx) => {
// 		await contract
// 			.vote(id, optionIdx)
// 			.then(() => setShowModal(true))
// 			.catch((e) => alert(e.message));
// 	};

// 	if (!connected) {
// 		return (
// 			<div className="text-3xl">
// 				Connect To{" "}
// 				<span
// 					className="text-blue-700 cursor-pointer"
// 					onClick={connectCallBack}
// 				>
// 					MetaMask
// 				</span>
// 			</div>
// 		);
// 	}
// 	return (
// 		<div className="container mx-auto px-4">
// 			{votes && (
// 				<>
// 					<h3 className="text-2xl font-bold mb-4">{votes[0].description}</h3>
// 					<div className="grid grid-cols-1 gap-4">
// 						{votes[0].options.map((option, idx) => (
// 							<div
// 								key={Math.random() + idx}
// 								className="bg-white rounded-lg shadow p-4"
// 							>
// 								<p className="text-lg mb-2">
// 									{option} - {votes[0].votes[idx]}
// 								</p>
// 								<Button
// 									onClick={() => {
// 										VoteNow(votes[0].id, idx);
// 									}}
// 									className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
// 								>
// 									Vote
// 								</Button>
// 							</div>
// 						))}
// 					</div>
// 				</>
// 			)}
// 			<Modal show={showModal} onClose={() => setShowModal(false)}>
// 				<h3 className="text-xl font-bold mb-4">Success</h3>
// 				<p>Your vote has been recorded successfully.</p>
// 			</Modal>
// 		</div>
// 	);
// };

// export default Vote;

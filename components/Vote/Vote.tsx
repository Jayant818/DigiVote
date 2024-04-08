"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { updateUser } from "@/lib/actions/user.action";

interface VoteParams {
	connected: boolean;
	connectCallBack: () => void;
	contract: any;
	votes: any;
	userData: any;
	VoteNow: any;
}

const Vote = ({
	connected,
	connectCallBack,
	contract,
	votes,
	userData,
	VoteNow,
}: VoteParams) => {
	const [user, setUser] = useState(userData);
	const [loading, setLoading] = useState(false);
	const handleVote = async (id, optionIdx, name) => {
		try {
			await VoteNow(id, optionIdx, name);
			// await contract.vote(id, optionIdx);
			// alert("Vote recorded successfully");
			// // Additional code after successful vote recording can go here
			// const user = await updateUser(userData.voterId, name);
			// console.log("updated User", user);
			// setUser(user);
		} catch (e) {
			alert("Already Voted");
		}
	};
	const handleClick = async () => {
		setLoading(true);
		await connectCallBack();
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

	const isLive = (endTime) => {
		const date = new Date(endTime);
		const currentDate = new Date();
		const diff = date.getTime() - currentDate.getTime();
		return diff >= 0 ? true : false;
	};

	const timeLeft = (endTime) => {
		const date = new Date(endTime);
		const currentDate = new Date();
		const diff = date.getTime() - currentDate.getTime();
		if (diff <= 0) return "Voting Ended";

		const daysLeft = Math.floor(diff / (1000 * 60 * 60 * 24));
		const hoursLeft = Math.floor(
			(diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
		);
		// return `${daysLeft} days`;
		return `${daysLeft} days , ${hoursLeft} hours left`;
	};
	return (
		<div>
			{connected && (
				// <>{JSON.stringify(votes)}</>
				<>
					{votes.length === 0 ? (
						<h3>No votes available</h3>
					) : (
						<div className=" flex flex-wrap  px-10   gap-10  mb-10 ">
							{votes.map((vote, idx) => {
								if (
									(vote.state === "All" || vote.state === userData.state) &&
									!userData.voted[vote.name]
								) {
									return (
										<div
											key={Math.random() + idx}
											className="space-y-4 border-2 border-dashed border-zinc-600400 rounded-md mt-10 p-4 w-[40%] shadow-md shadow-gray-300 hover:shadow-xl hover:shadow-gray-300"
										>
											<div className="flex gap-2 items-center">
												{isLive(vote.endTime) ? (
													<>
														<div className="w-4 h-4 rounded-full bg-green-500 animate-blink"></div>
														<p className="">Live</p>
													</>
												) : (
													<>
														<div className="w-4 h-4 rounded-full bg-red-500 animate-blink"></div>
														<p className="">Ended</p>
													</>
												)}
												<p className="text-red-500 font-semibold">
													{timeLeft(vote.endTime)}
												</p>
											</div>
											<h3 className="text-3xl font-bold text-white ">
												{vote.description}
											</h3>
											{isLive(vote.endTime) && (
												<p className="space-y-3 mt-4">
													{vote.options.map((option, idx) => (
														<div
															key={Math.random() + idx}
															className="flex gap-4 w-[90%] justify-between"
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
																<p className="text-black">{option}</p>
															</div>
															<Button
																onClick={() => {
																	handleVote(vote.id, idx, vote.name);
																}}
															>
																Vote
															</Button>
														</div>
													))}
												</p>
											)}
										</div>
									);
								}
							})}
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default Vote;

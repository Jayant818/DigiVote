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
			.catch((e) => alert("Already Voted"));
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
						<div className=" flex   px-10   gap-10  mb-10 ">
							{votes.map((vote, idx) => (
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
									)}
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

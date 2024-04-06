"use client";
import { connectCallBack } from "@/lib/utils";
import React, { useState } from "react";

const getResult = () => {
	const [contract, setContract] = useState(null);
	const [connected, setConnected] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleClick = async () => {
		setLoading(true);
		const { contract, connected } = await connectCallBack();
		setContract(contract);
		setConnected(connected);
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

	return <div>Here are the Results</div>;
};

export default getResult;

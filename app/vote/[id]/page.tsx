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

	// console.log(params.params.id);
	// console.log("Type of id ", typeof id);
	// console.log(id);
	// const user = await getUserData(id);
	const user = null;
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
			/>
		</>
	);
};

export default Page;

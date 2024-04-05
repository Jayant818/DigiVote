import { ethers } from "ethers";

export const address = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
export const abi = [
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "owner",
				type: "address",
			},
			{
				indexed: true,
				internalType: "uint256",
				name: "createdAt",
				type: "uint256",
			},
			{
				indexed: true,
				internalType: "uint256",
				name: "voteId",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "endTime",
				type: "uint256",
			},
		],
		name: "VoteCreated",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "voter",
				type: "address",
			},
			{
				indexed: true,
				internalType: "uint256",
				name: "voteId",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "option",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "createdAt",
				type: "uint256",
			},
		],
		name: "Voted",
		type: "event",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "voteId",
				type: "uint256",
			},
			{
				internalType: "address",
				name: "member",
				type: "address",
			},
		],
		name: "didVote",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "voteId",
				type: "uint256",
			},
		],
		name: "getVote",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string",
			},
			{
				internalType: "address",
				name: "",
				type: "address",
			},
			{
				internalType: "uint256[]",
				name: "",
				type: "uint256[]",
			},
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "string",
				name: "uri",
				type: "string",
			},
			{
				internalType: "uint256",
				name: "options",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "endTime",
				type: "uint256",
			},
		],
		name: "createVote",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "voteId",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "option",
				type: "uint256",
			},
		],
		name: "vote",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
];
export const provider =
	typeof window !== "undefined" && window.ethereum
		? new ethers.BrowserProvider(window.ethereum)
		: null;

export const connect = async () => {
	await provider?.send("eth_requestAccounts", []);
	return getContract();
};

export const getContract = async () => {
	if (!provider) {
		throw new Error(
			"Please connect your wallet to interact with the contract."
		);
	}
	const signer = await provider.getSigner();
	console.log("signer", signer);
	const contract = new ethers.Contract(address, abi, signer);
	return { contract, signer };
};

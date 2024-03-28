import { ethers } from "ethers";

export const address = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
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

// export const getContract = async () => {
// 	const signer = provider?.getSigner();
// 	//@ts-ignore
// 	const contract = new ethers.Contract(address, abi, signer);
// 	return { contract, signer };
// };

// connect to metamask through browsser using ethers.js
// export const connectToMetaMask = async () => {
// 	try {
// 		// Check if Web3 is injected by MetaMask
// 		if (typeof window.ethereum !== "undefined") {
// 			// Request access to the user's MetaMask account
// 			await window.ethereum.request({ method: "eth_requestAccounts" });

// 			// Create a new Web3 instance
// 			const web3 = new ethers.providers.Web3Provider(window.ethereum);

// 			// Check if the user is connected to the desired network
// 			const networkId = await web3.getNetwork();
// 			// if (networkId !== /* your desired network ID */) {
// 			//   alert('Please switch to the desired network');
// 			//   return;
// 			// }

// 			console.log("MetaMask connected successfully");
// 			return web3;
// 		} else {
// 			alert("Please install MetaMask to connect");
// 		}
// 	} catch (error) {
// 		console.error("Error connecting to MetaMask:", error);
// 	}
// };

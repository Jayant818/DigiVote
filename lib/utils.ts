import { getContract } from "@/components/shared/contract";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
// import * as faceapi from "face-api.js";
// import getConfig from "next/config";

// const { publicRuntimeConfig } = getConfig();
// const MODEL_URL = `${publicRuntimeConfig.staticFolder}`;

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

// const loadModels = async () => {
// 	try {
// 		// Load the tiny-yolov2 model for face detection
// 		await faceapi.nets.tinyYolov2.loadFromUri(MODEL_URL);

// 		// Load the other required models
// 		await Promise.all([
// 			faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
// 			faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
// 		]);
// 	} catch (error) {
// 		console.error("Error loading models:", error);
// 	}
// };

// export async function VerifyImages(image1Base64, image2Base64) {
// 	try {
// 		// Convert base64 data URLs to Blob objects
// 		const image1Blob = dataURLToBlob(image1Base64);
// 		const image2Blob = dataURLToBlob(image2Base64);

// 		// Convert Blob objects to HTMLImageElement instances
// 		const img1 = await faceapi.bufferToImage(image1Blob);
// 		const img2 = await faceapi.bufferToImage(image2Blob);

// 		// Detect faces in both images (models should be loaded by now)
// 		const detections1 = await faceapi
// 			.detectAllFaces(img1, new faceapi.TinyFaceDetectorOptions())
// 			.withFaceLandmarks()
// 			.withFaceDescriptors();
// 		const detections2 = await faceapi
// 			.detectAllFaces(img2, new faceapi.TinyFaceDetectorOptions())
// 			.withFaceLandmarks()
// 			.withFaceDescriptors();

// 		// Check if faces were detected in both images
// 		if (detections1.length === 0 || detections2.length === 0) {
// 			throw new Error("No faces detected in one or both images");
// 		}

// 		// Compare the face descriptors
// 		const faceMatcher = new faceapi.FaceMatcher(detections1);
// 		const bestMatch = faceMatcher.findBestMatch(detections2.descriptors);

// 		// Check if the match distance is below a threshold
// 		const threshold = 0.6; // Adjust this value as needed
// 		const isSamePerson = bestMatch.distance < threshold;

// 		return isSamePerson;
// 	} catch (error) {
// 		console.error("Error verifying images:", error);
// 		throw error;
// 	}
// }

// // Helper function to convert a data URL to a Blob object
// function dataURLToBlob(dataURL) {
// 	// Validate the input data URL
// 	const isValidDataURL = /^data:(.+);base64,(.+)$/i.test(dataURL);
// 	if (!isValidDataURL) {
// 		throw new Error("Invalid data URL");
// 	}

// 	const binary = atob(dataURL.split(",")[1]);
// 	const array = [];
// 	for (let i = 0; i < binary.length; i++) {
// 		array.push(binary.charCodeAt(i));
// 	}

// 	// Determine the MIME type from the data URL
// 	const mimeType = dataURL.split(",")[0].split(":")[1].split(";")[0];

// 	return new Blob([new Uint8Array(array)], { type: mimeType });
// }

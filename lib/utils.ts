import { getContract } from "@/components/shared/contract";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const connectCallBack = async () => {
	const { contract, signer } = await getContract();

	// setContract(contract);
	if (contract) {
		console.log("Contract", contract);
		// setIsConnected(true);
		return { contract, connected: true };
	}
	return { contract, connected: false };
};

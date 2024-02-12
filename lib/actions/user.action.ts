"use server";

import User from "@/databases/user.model";
import { connectToDB } from "../mongoose";

interface CreateUserParams {
	name: string;
	aadharNo: string;
	mobileNo: string;
	img: string;
	voterId: string;
	hasVoted: boolean;
}

export async function createUser(userData: CreateUserParams) {
	try {
		connectToDB();

		const user = await User.create(userData);
		console.log("Bhai User ban gaya ");
		return user;
	} catch (err) {
		return console.log("Error aa gaya bhai 😔", err);
	}
}

interface validateUserParams {
	aadharNo: string;
	name: string;
}

export async function ValidateUser(userData: validateUserParams) {
	try {
		connectToDB();

		const user = await User.findOne({
			name: userData.name,
			aadharNo: userData.aadharNo,
		});

		if (user) {
			return user;
		} else {
			return false;
		}
	} catch (err) {
		return console.log("Bhai Bhari Dikkat  ho gaya user hi na hai ", err);
	}
}

// export async function getUserData(aadharNo:string){
// 	try{
// 		connectToDB();
// 		const user = await User.findOne({})
// 	}catch(err){

// 	}
// }

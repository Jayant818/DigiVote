import mongoose from "mongoose";

let isConnected: boolean = false;

export async function connectToDB() {
	if (!process.env.MONGODB_URL) {
		return console.log("MongoDB Url doesn't exist");
	} else if (isConnected) {
		return console.log("Already Connected to the DB");
	} else {
		try {
			await mongoose.connect(process.env.MONGODB_URL, {
				dbName: "digiVote",
			});
			console.log("Connected");
			isConnected = true;
		} catch (err) {
			console.log("Can't able to Connect to the DB", err);
		}
	}
}

import { Schema, models, model, Document } from "mongoose";

export interface IUser extends Document {
	name: string;
	aadharNo: string;
	mobileNo: string;
	img: string;
	voterId: number;
	hasVoted: boolean;
}

const UserSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	aadharNo: {
		type: String,
		required: true,
	},
	mobileNo: {
		type: String,
		required: true,
	},
	img: {
		type: String,
		required: true,
	},
	voterId: {
		type: String,
		required: true,
	},
	hasVoted: {
		type: Boolean,
		default: false,
	},
});

const User = models.User || model<IUser>("User", UserSchema);

export default User;

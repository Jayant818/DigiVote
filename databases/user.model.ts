import { Schema, models, model, Document } from "mongoose";

export interface IUser extends Document {
	name: string;
	aadharNo: string;
	mobileNo: string;
	img: string;
	voterId: number;
	voted: {
		[key: string]: boolean;
	};
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
	state: {
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
	voted: {
		type: Object,
		default: {
			// Set default vote names with false values
			"PM Election": false,
			"CM Election": false,

			// Add more if needed
		},
	},
});

const User = models.User || model<IUser>("User", UserSchema);

export default User;

"use server";
const { Vonage } = require("@vonage/server-sdk");

const vonage = new Vonage({
	apiKey: "2f8bb7a1",
	apiSecret: "SI217VN7mRdlKWKN",
});

const from = "Vonage APIs";
const to = "919711177191";

export async function sendSMS(otp) {
	const text = `Your OTP for Voting is ${otp}. Please don't share with anyone else.`;
	await vonage.sms
		.send({ to, from, text })
		.then((resp) => {
			console.log("Message sent successfully");
			console.log(resp);
		})
		.catch((err) => {
			console.log("There was an error sending the messages.");
			console.error(err);
		});
}

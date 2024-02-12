import React from "react";
import { Button } from "../ui/button";
import fast2sms from "fast-two-sms";
import isCI from "is-ci";

const SendSMS = () => {
	const handleClick = () => {
		let options = {
			authorization:
				"sijXHY97MnblkcNfdmhy0BIKSFLxW5TuPQq4Rav36gz1AJeUZES97qFEvwh1aUekzyl3Xb0QPZHriOR4",
			message: "YOUR_MESSAGE_HERE",
			numbers: ["9711177191"],
		};
		fast2sms.sendMessage(options);
	};
	return (
		<div>
			Heee
			<Button onClick={handleClick}>Send SMS</Button>
		</div>
	);
};

export default SendSMS;

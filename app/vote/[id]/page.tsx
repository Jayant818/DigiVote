import { Button } from "@/components/ui/button";
import { getUserData } from "@/lib/actions/user.action";
import Image from "next/image";
import React from "react";

const page = async (params) => {
	const id = params.params.id;
	// console.log(params.params.id);
	// console.log("Type of id ", typeof id);
	// console.log(id);
	const user = await getUserData(id);
	if (!user) {
		return <div>User not found</div>;
	}
	return (
		<div className="p-4">
			<div className="bg-[#a1978d] border-2 flex  items-center flex-col w-[350px] rounded-md space-y-2 py-6">
				<Image alt="3 lion" src="/lion.png" width={30} height={30} />
				<h3 className="uppercase">Election Commission of India</h3>
				<h3 className="uppercase">IdentitY card</h3>
				<div className="flex gap-10 items-center">
					<div className="bg-[#727272] rounded-full w-20 h-20"></div>
					<Image
						src={`data:image/png;base64,${user.img}`}
						alt="user image"
						width={200}
						height={300}
					/>
				</div>
				<div className="flex justify between gap-28">
					<p>Elector's Name</p>
					<p>{user.name}</p>
				</div>
				<div className="flex justify between gap-20">
					<p>Aadhar Number</p>
					<p>{user.aadharNo}</p>
				</div>
				<div className="flex justify between gap-28">
					<p>Voter Id</p>
					<p className="pl-4">{user.voterId}</p>
				</div>

				{/* <div>{user.mobileNo}</div> */}
				{/* <div>{user.img}</div> */}

				{/* <div>{user.hasVoted}</div> */}
				{user.hasVoted ? (
					<Button variant="destructive" disabled>
						Already Voted
					</Button>
				) : (
					<Button className="">Vote Now</Button>
				)}
			</div>
		</div>
	);
};

export default page;

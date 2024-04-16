import React from "react";
import Image from "next/image";
// import Design1 from "@/components/assets/Design1.png";
// import Design from "@/components/assets/Design.png";
const HomePage = () => {
	return (
		<div className="flex w-screen justify-between mt-14">
			<div className="flex flex-col gap-y-2 ml-20 justify-center">
				<p className="text-stone-900 w-fit text-5xl font-bold">
					Secure, Online Elections
				</p>
				<p className="text-stone-900 w-[700px]  text-xl">
					Create an election protal or vote for anyone in seconds. Your voters
					can vote from any location on any device.
				</p>
				<button className="bg-neutral-100 text-stone-900 px-2 py-2   mt-4 text-2xl hover:text-neutral-100 hover:bg-stone-900 border-2 border-stone-900  font-semibold rounded-lg w-[150px] hover:border-neutral-100">
					Vote Now!
				</button>
			</div>
			<Image src="/Design.jpeg" alt="bgimg" width={700} height={700} />
		</div>
	);
};

export default HomePage;

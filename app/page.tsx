import HomePage from "@/components/Home/HomePage";
import Navbar from "@/components/shared/Navbar";

export default function Home() {
	return (
		<div className="relative">
			<div className="h-screen w-full overflow-hidden  dark:bg-black bg-neutral-100  dark:bg-dot-neutral/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center">
				{/* Radial gradient for the container to give a faded look */}
				<div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-neutral-100 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
				{/* <p className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
                 Backgrounds
                </p> */}
			</div>
			<div className="absolute top-8 flex justify-center w-screen">
				<Navbar />
			</div>
			<div className=" absolute top-32 w-screen flex justify-start items-center h-[400px]">
				<HomePage />
			</div>
		</div>
	);
}

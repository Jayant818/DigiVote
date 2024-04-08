/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "encrypted-tbn0.gstatic.com",
				port: "",
			},
			{
				protocol: "https",
				hostname: "upload.wikimedia.org",
				port: "",
			},
			{
				protocol: "https",
				hostname: "media.licdn.com",
				port: "",
			},
		],
	},
};

export default nextConfig;

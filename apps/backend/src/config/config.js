import dotenv from "dotenv";
dotenv.config();

const config = {
	port: process.env.PORT || 4000,
	dbname: process.env.DB_NAME || "",
	dbuser: process.env.DB_USER || "",
	dbpass: process.env.DB_PASS || "",
	secret: process.env.JWT_KEY,
	cloud_name : process.env.CLOUD_NAME,
	cloud_apikey : process.env.CLOUD_APIKEY,
	cloud_secret: process.env.CLOUD_SECRET
};

export default config;

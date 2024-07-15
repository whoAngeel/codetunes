import dotenv from "dotenv";
dotenv.config();

const config = {
	port: process.env.PORT || 4000,
	dbname: process.env.DB_NAME || "",
	dbuser: process.env.DB_USER || "",
	dbpass: process.env.DB_PASS || "",
};

export default config;

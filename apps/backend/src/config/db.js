import {  Sequelize} from "@sequelize/core";
import { PostgresDialect } from "@sequelize/postgres";
import config from "./config.js";

export const sequelize = new Sequelize({
    dialect: PostgresDialect,
    database: config.dbname,
    user: config.dbuser,
    password: config.dbpass,
    host: 'localhost',
    port: 5432,
    ssl: false,
    clientMinMessages: 'notice',
})
export const connection = async () => {
	try {
		await sequelize.authenticate();
        console.log('Connection has been established successfully ✅✅✅');
	} catch (error) {
        console.log("Error connecting to database ☠️☠️☠️");
    }
};

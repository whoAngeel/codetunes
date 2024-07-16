import { badData, boomify, notAcceptable, notFound } from "@hapi/boom";
import { Song, User } from "../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
export const login = async (email, password) => {
	const user = await findByEmail(email);
	if (!user) throw notFound("User not found");
	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) throw badData("Wrong password");
	
	const token = jwt.sign({ id: user.id }, config.secret);
	delete user.dataValues.password;
	user.dataValues.token = token;
	return user;
};

export const register = async (userData) => {
	const usedEmail = await findByEmail(userData?.email);
	if (usedEmail) throw notAcceptable("Email already exists");
	const password = await bcrypt.hash(userData?.password, 10);
	const newUser = await User.create({
		...userData,
		password,
	});
	delete newUser.dataValues.password;
	return newUser;
};

const findByEmail = async (email) => {
	return await User.findOne({ where: { email } });
};

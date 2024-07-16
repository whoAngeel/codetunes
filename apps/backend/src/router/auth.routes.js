import { Router } from "express";
import { login, register } from "../services/auth.services.js";
import passport from "passport";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
const router = Router();

router.post("/register/local", async (req, res, next) => {
	try {
		const data = req.body;
		const rta = await register(data);
		res.status(201).json(rta);
	} catch (error) {
		next(error);
	}
});

router.post(
	"/login/local",
	passport.authenticate("local", { session: false }),
	async (req, res, next) => {
		try {
			const user = req.user;
			console.log(user);
			const payload = {
				sub: user.id,
				id: user.id,
			};
			const token = jwt.sign(payload, config.secret);
			res.json({token});
		} catch (error) {
			next(error);
		}
	}
);

export default router;

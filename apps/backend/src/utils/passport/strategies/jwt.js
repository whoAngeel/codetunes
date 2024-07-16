import { ExtractJwt, Strategy } from "passport-jwt";
import config from "../../../config/config.js";

export default new Strategy(
	{
		jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		secretOrKey: config.secret,
	},
	(payload, done) => {
		return done(null, payload);
	}
);

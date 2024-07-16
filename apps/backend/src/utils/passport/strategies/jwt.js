import { ExtractJwt, Strategy } from "passport-jwt";
import config from "../../../config/config.js";

const JWTStrategy = new Strategy(
	{
		jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		secretOrKey: config.secret,
	},
	(payload, done) => {
		return done(null, payload);
	}
);

export default JWTStrategy;

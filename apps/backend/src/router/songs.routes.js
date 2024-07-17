import { Router } from "express";
import fileUpload from "express-fileupload";
import { uploadFile } from "../config/cloudinary.js";
import passport from "passport";
import { Song } from "../models/index.js";
import {dirname} from 'path';
import {fileURLToPath} from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url))
const router = Router();

router.use( 
	fileUpload({
		useTempFiles: true,
		tempFileDir: `${__dirname}/tmp`,
	})
);

router.post(
	"/upload",
	passport.authenticate("jwt", { session: false }),
	async (req, res, next) => {
		try {
            console.log(__dirname);
			const result = await uploadFile(req.files.song);
			const song = await Song.create({
				...req.body,
				cloudinaryPublicId: result.public_id,
				cloudinarySecureUrl: result.secure_url,
			});
			res.json(song);
		} catch (error) {
			next(error);
		}
	}
);

export default router;

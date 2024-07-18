import { Router } from "express";
import fileUpload from "express-fileupload";
import { uploadFile } from "../config/cloudinary.js";
import passport from "passport";
import { Song } from "../models/index.js";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { deleteSong, searchSong } from "../services/songs.service.js";
const __dirname = dirname(fileURLToPath(import.meta.url));
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

router.get("/search", async (req, res, next) => {
	try {
		const { name } = req.query;
		const rta =await searchSong(name);
		res.json(rta);
	} catch (error) {
		next(error);
	}
});

router.delete(
	"/:songId",
	passport.authenticate("jwt", { session: false }),
	async (req, res, next) => {
		try {
			const { songId } = req.params;
			const rta = await deleteSong(songId)
			res.json(rta);
		} catch (error) {
			next(error)
		}
	}
);

export default router;

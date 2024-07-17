import { Router } from "express";
import fileUpload from "express-fileupload";
import { uploadFile } from "../config/cloudinary.js";
import { uploadSong } from "../services/songs.service.js";

const router = Router();

router.use(
	fileUpload({
		useTempFiles: true,
		tempFileDir: "./src/tmp",
	})
);


router.post("/upload", async (req, res, next) => {
	try {
       const song = req.file.song
       const data = req.body
       const rta = uploadSong(song, data)
       res.json((rta))
	} catch (error) {
		next(error);
	}
});

export default router;

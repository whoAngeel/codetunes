import { Router } from "express";
import {
	createArtist,
	getAll,
	getbyId,
	getSongsByArtists,
	ownArtists,
	searchArtist,
} from "../services/artists.service.js";
import passport from "passport";

const router = Router();

router.get("/", async (req, res, next) => {
	try {
		const rta = await getAll();
		res.json(rta);
	} catch (error) {
		next(error);
	}
});

router.get(
	"/own",
	passport.authenticate("jwt", { session: false }),
	async (req, res, next) => {
		try {
			const rta = ownArtists(req.user.id);
			res.json(rta);
		} catch (error) {
			next(error);
		}
	}
);


router.get("/search", async (req, res, next) => {
	try {
		const {data} = req.query;
		const rta = await searchArtist(data);
		res.json(rta);
	} catch (error) {
		next(error);
	}
});

router.get("/:id", async (req, res, next) => {
	try {
		const { id } = req.params;
		const rta = getbyId(id);
		res.json(rta);
	} catch (error) {
		next(error);
	}
});

router.get("/songs/:artistId", async (req, res, next) => {
	try {
		const { artistId } = req.params;
		const rta = getSongsByArtists(artistId);
		res.json(rta);
	} catch (error) {
		next(error);
	}
});

router.post(
	"/",
	passport.authenticate("jwt", { session: false }),
	async (req, res, next) => {
		try {
			const userId = req.user.id;
			const artistData = { ...req.body, userId };
			const rta = await createArtist(artistData);
			res.status(201).json(rta);
		} catch (error) {
			next(error);
		}
	}
);


export default router;

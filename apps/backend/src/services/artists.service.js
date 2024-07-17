import { Artist, Song, User } from "../models/index.js";
import { Op } from "@sequelize/core";

export async function getAll() {
	const artists = await Artist.findAll({
		include: {
			model: Song,
			as: "songs",
			separate: true,
			order: [["createdAt", "desc"]],
		},
	});
	return artists;
}

export async function ownArtists(id) {
	const artists = await Artist.findAll({ userId: id });
	return artists;
}

export async function getbyId(artistId) {
	return await Artist.findByPk(artistId, {
		include: {
			model: Song,
			as: "songs",
			order: [["createdAt", "desc"]],
		},
	});
}

export async function getSongsByArtists(artistId) {
	return await Song.findAll({ artistId });
}

export async function createArtist(artistData) {
	const artist = await Artist.create(artistData);
	return artist;
}

export async function searchArtist(search) {
	return await Artist.findAll({
		where: {
			[Op.or]: [
				{ name: { [Op.like]: `%${search}%` } },
				{ bio: { [Op.like]: `%${search}%` } },
			],
		},
	});
}

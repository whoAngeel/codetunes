import { Op } from "@sequelize/core";
import { deleteFile, uploadFile } from "../config/cloudinary.js";
import { Song } from "../models/index.js";

export async function uploadSong(songFile, data) {
	const result = await uploadFile(songFile);
	const song = await Song.create({
		...data,
		cloudinaryPublicId: result.public_id,
		cloudinarySecureUrl: result.secure_url,
	});
	return song;
}

export async function searchSong(text) {
	const songs = await Song.findAll({
		where: {
			title: { [Op.like]: `%${text}%` },
		},
	});
	return songs;
}

export async function deleteSong(songId) {
	const song = await Song.findByPk(songId);
	const result = await deleteFile(song.dataValues.cloudinaryPublicId);
	await song.destroy();
	return song;
}

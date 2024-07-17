import { uploadFile } from "../config/cloudinary.js";
import { Song } from "../models/index.js";

export async function uploadSong(songFile, data) {
	const result = await uploadFile(songFile);
	const song = await Song.create({
		...data,
		cloudinaryPublicId: result.public_id,
		cloudinarySecureUrl: result.secure_url,
	});
    return song
}

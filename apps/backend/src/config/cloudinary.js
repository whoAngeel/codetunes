import { v2 as cloudinary } from "cloudinary";
import uniqid from "uniqid";
import config from "./config.js";

cloudinary.config({
	cloud_name: config.cloud_name,
	api_key: config.cloud_apikey,
	api_secret: config.cloud_secret,
	secure: false,
});

export const uploadFile = (file) => {
	return cloudinary.uploader.upload(file.tempFilePath, {
		folder: "codetunes",
		public_id: uniqid("audio"),
		resource_type: "auto",
	});
};
export const uploadImage = (file)=>{
	return cloudinary.uploader.upload(file.tempFilePath,{
		folder: 'images',
		public_id: uniqid('image'),
		resource_type: 'image',
	})
}

export const deleteFile = (public_id) => {
	return cloudinary.uploader.destroy(public_id, {
		resource_type: "video",
	});
};

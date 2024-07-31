import React from "react";
import Modal from "./Modal";
import { useForm } from "react-hook-form";
import axios from "axios";

function CreateArtistModal() {
	const { register, handleSubmit, formState } = useForm();
	const { isSubmitting } = formState;
	const createArtist = async (data) => {
		const formData = new FormData();
		formData.append("name", data.name);
		formData.append("gender", data.gender);
		formData.append("bio", data.bio);
		formData.append("image", data.coverImg[0]);
		axios
			.post("/api/artists", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
					Authorization: `Bearer ${sessionStorage.getItem("token")}`,
				},
			})
			.then((res) => {
				console.log(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<>
			<Modal>
				<form onSubmit={handleSubmit(createArtist)} className="modal-box">
					<h3 className="font-bold text-lg text-center mb-8">
						Create Artist
					</h3>
					<div className="flex flex-col gap-4">
						<div className="w-full flex items-start">
							<span className="w-1/4">Name</span>
							<input
								type="text"
								placeholder="Name"
								{...register("name")}
								className="input input-sm w-3/4 max-w-xs"
							/>
						</div>
						<div className="w-full flex items-start">
							<span className="w-1/4">Gender</span>
							<input
								type="text"
								placeholder="Gender"
								{...register("gender")}
								className="input input-sm w-3/4 max-w-xs"
							/>
						</div>
						<div className="w-full flex items-start">
							<span className="w-1/4">Bio</span>
							<textarea
								className="textarea w-3/4"
								placeholder="bio"
								{...register("bio")}
							></textarea>
						</div>

						<div className="w-full flex items-start">
							<span className="w-1/4">Avatar</span>
							<input
								type="file"
								className="file-input file-input-bordered 
								file-input-sm file-input-success w-3/4 max-w-xs "
								{...register("coverImg")}
							/>
						</div>
						<button
							disabled={isSubmitting}
							className="btn btn-primary btn-sm"
						>
							{isSubmitting && (
								<>
									<span class="loading loading-spinner"></span>
									Submitting...
								</>
							)}
							Create
						</button>
					</div>
				</form>
			</Modal>
		</>
	);
}

export default CreateArtistModal;

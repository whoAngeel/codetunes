import React from "react";
import Modal from "./Modal";

function CreateArtistModal() {
	return (
		<>
			<Modal>
				<form action="" className="modal-box">
					<h3 className="font-bold text-lg text-center mb-8">
						Create Artist
					</h3>
					<div className="flex flex-col gap-4">
						<div className="w-full flex items-start">
							<span className="w-1/4">Name</span>
							<input
								type="text"
								placeholder="Name   "
								className="input input-sm w-3/4 max-w-xs"
							/>
						</div>
						<div className="w-full flex items-start">
							<span className="w-1/4">Gender</span>
							<input
								type="text"
								placeholder="Gender"
								className="input input-sm w-3/4 max-w-xs"
							/>
						</div>
						<div className="w-full flex items-start">
							<span className="w-1/4">Bio</span>
							<textarea
								className="textarea w-3/4"
								placeholder="bio"
							></textarea>
						</div>

						<div className="w-full flex items-start">
							<span className="w-1/4">Avatar</span>
							<input
								type="file"
								class="file-input file-input-bordered file-input-sm file-input-success w-3/4 max-w-xs "
							/>
						</div>
                        <button className="btn btn-primary btn-sm">Create</button>
					</div>
				</form>
			</Modal>
		</>
	);
}

export default CreateArtistModal;

import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ArtistsTable from "../components/ArtistsTable";
import Modal from "../components/Modal";
import CreateArtistModal from "../components/CreateArtistModal";

function Artists() {
	return (
		<div className="">
			<CreateArtistModal/>

			<div className="flex justify-between items-center w-full px-8 mt-4">
				<h1 className="text-3xl text-left font-bold">Artists List</h1>
				<button
					className="btn btn-primary btn-sm"
					onClick={() => document.getElementById("my_modal_2").showModal()}
				>
					Crear Artista
				</button>
			</div>

			<section className=" body-font mx-auto flex w-full my-8">
				<ArtistsTable />
			</section>
		</div>
	);
}

export default Artists;

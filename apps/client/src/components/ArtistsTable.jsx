import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function ArtistsTable() {
	const [artists, setArtists] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	useEffect(() => {
		axios
			.get("/api/artists/own", {
				headers: {
					Authorization: `Bearer ${sessionStorage.getItem("token")}`,
				},
			})
			.then((res) => {
				setArtists(res.data);
				console.log(artists);
			})
			.catch((error) => {
				console.log(error);
				toast.error(error.message);
				setError(error.message);
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error {error}</div>;
	}

	return (
		<div className="w-full mx-auto">
			{artists.length > 0 ? (
				<div className="overflow-x-auto">
					<table className="table">
						{/* head */}
						<thead>
							<tr>
								<th>Name</th>
								<th>Bio</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{artists.map((artist) => {
								return (
									<tr className="hover" key={artist.id}>
										<td>
											<div className="flex items-center gap-3">
												<div className="avatar">
													<div className="mask mask-squircle h-12 w-12">
														<img
															src={artist.coverImg}
															alt="Avatar Tailwind CSS Component"
														/>
													</div>
												</div>
												<div>
													<div className="font-bold">
														{artist.name}
													</div>
													<div className="text-sm opacity-50">
														{artist.genre}
													</div>
												</div>
											</div>
										</td>
										<td>
											{artist.bio}
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			) : (
				<div className="text-center text-3xl w-full text-gray-600">
					no artists yet
				</div>
			)}
		</div>
	);
}

export default ArtistsTable;

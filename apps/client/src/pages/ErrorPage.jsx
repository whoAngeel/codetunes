import React from "react";
import { useRouteError } from "react-router-dom";

function ErrorPage() {
	const error = useRouteError();
	console.error(error);
	return (
		<div id="error-page">
			<h1 className="text-3xl">Oops!</h1>
			<p>Sorry, an unexpected error has ocurred. </p>
			<p>
				<i>{error.statusText || error.message}</i>
			</p>
		</div>
	);
}

export default ErrorPage;

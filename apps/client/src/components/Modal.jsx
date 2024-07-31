import React from "react";

function Modal({ children }) {
	return (
		<dialog id="my_modal_2" className="modal">
			{children}
			<form method="dialog" className="modal-backdrop">
				<button>close</button>
			</form>
		</dialog>
	);
}

export default Modal;

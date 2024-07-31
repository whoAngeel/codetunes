import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { BiHide, BiShow } from "react-icons/bi";
import { MdEmail, MdPassword } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function Login() {
	const [showPassword, setShowPassword] = useState(false);
	const [type, setType] = useState("password");
	const { register, handleSubmit } = useForm();
	const navigate = useNavigate();
	const handleShowPassword = () => {
		setShowPassword(!showPassword);
		setType(showPassword ? "text" : "password");
	};

	const login = (data) => {
		axios
			.post("/api/auth/login/local", data)
			.then((res) => {
				console.log(res.data);
				sessionStorage.setItem("token", res.data.token);
				navigate("/");
			})
			.catch((err) => {
				console.log(err);
				toast.error(err.response.data.message);
			});
	};
	return (
		<div className="min-h-screen flex flex-col justify-center content-center items-center py-12 sm:px-6 lg:px-8 w-full ">
			<div className="mt-8 w-1/4">
				<form
					className=" flex flex-col gap-2 gap-y-4 "
					onSubmit={handleSubmit(login)}
				>
					<label className="input input-bordered flex items-center gap-2">
						<MdEmail />
						<input
							type="email"
							className="grow"
							placeholder="Correo Electronico"
							{...register("email")}
						/>
					</label>
					<label className="input input-bordered flex items-center gap-2">
						<MdPassword />
						<input
							type={type}
							className="grow"
							placeholder="Contraseña"
							{...register("password")}
						/>
						<div onClick={handleShowPassword}>
							{showPassword ? <BiHide /> : <BiShow />}
						</div>
					</label>
					<button className="btn btn-primary">Entrar</button>
				</form>
			</div>
		</div>
	);
}

export default Login;

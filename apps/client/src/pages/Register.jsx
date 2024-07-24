import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MdOutlineAlternateEmail, MdPassword} from "react-icons/md";
import { BiShow,BiHide } from "react-icons/bi";

import { FiUser } from "react-icons/fi";
import toast from "react-hot-toast";
import {registerUser} from '../services/api';
import { useNavigate, Router } from "react-router-dom";
import axios from "axios";

function Register() {
  const [showPassword, setShowPassword] = useState(false)
  const [type, setType] = useState("password")
  const { register, handleSubmit, formState:{errors, isSubmitting}} = useForm()
  const navigate = useNavigate()
  
  const registerUser=  (data)=>{
      axios.post('/api/auth/register/local', data).then(res=>{
        console.log(res.data);
        navigate('/login')
      }).catch(err=>{
        console.log(err);
        toast.error(err.response.data.message)
      })
  }
  const handleShowPassword = ()=>{
    setShowPassword(!showPassword)
    setType(showPassword ? "password" : "text")
  }
	return (
		<div className="min-h-screen  flex flex-col justify-center py-12 sm:px-6 lg:px-8">
			<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
				<div className=" sm:mx-auto sm:w-full sm:max-w-md ">
					<form className="flex flex-col gap-2 " onSubmit={handleSubmit(registerUser)}>
						<div className="flex flex-row gap-2">
							<label className="input input-bordered flex items-center gap-2">
								<input
									type="text"
									className="grow"
									placeholder="Nombre(s)"
                  {...register('firstname')}
								/>
							</label>
							<label className="input input-bordered flex items-center gap-2 w-full">
								<input
									type="text"
									className="grow"
									placeholder="Apellidos"
                  {...register('lastname')}
								/>
							</label>
						</div>
						<div className="" >
							<label className="input input-bordered flex items-center gap-2">
								<MdOutlineAlternateEmail />
								<input
									type="text"
									className="grow"
									placeholder="Email"
                  {...register('email')}
								/>
							</label>
						</div>
						<div>
							<label className="input input-bordered flex items-center gap-2">
              <FiUser/>
								<input type="text" className="grow" placeholder="Nombre de usuario" {...register('username')}/>
							</label>
						</div>
            <div>
              <label className="input input-bordered flex items-center gap-2">
              <MdPassword/>
                <input
                  type={type}
                  className="grow"
                  placeholder="Contraseña"
                  {...register('password')}
                />
                <div onClick={handleShowPassword}>
                  {showPassword ? <BiHide/> : <BiShow/>}
                </div>
              </label>
            </div>
            <button className="btn btn-primary text-xl" disabled={isSubmitting}>Registrar</button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Register;

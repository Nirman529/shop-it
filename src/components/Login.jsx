import 'bootstrap/dist/css/bootstrap.css';
import "../App.css"
import React, { useState } from 'react'
import axios from "axios"
import Swal from 'sweetalert2'
import { setLoader } from '../Services/LoaderService';
import apiLink from '../apiLink';

const Login = () => {
	let firstObj = {
		email: "",
		password: ""
	}

	const [obj, setObj] = useState(firstObj)
	const submit = async (e) => {
		e.preventDefault();

		// condition for checking the empty field of email and password 
		if (obj.email === "" || obj.password === "") {
			Swal.fire({
				icon: 'question',
				title: 'Oops...',
				text: 'Email or Password Missing!',
			})
			setObj({ ...firstObj });
		} else {
			Swal.fire({
				position: 'top-end',
				icon: 'success',
				title: 'Login Successful',
				showConfirmButton: false,
				timer: 1500
			}).then(async () => {
				  
				await getLogin(obj);
			})
		}
		setObj({ ...firstObj });
	};

	// Read API implementation done
	const getLogin = async (object) => {
		setLoader(true)
		await axios
			.post(`${apiLink}/user/login`, object)
			.then((response) => {
				setLoader(false);
				localStorage.setItem('token', response.data.token);
				localStorage.setItem('expiresIn', response.data.expiresIn);

				setTimeout(() => {
					window.location.href = '/';
				}, 200);
			})
			.catch((err) => {
				setLoader(false)
				let head = err?.response?.data?.error
				if (head) {
					Swal.fire({
						icon: 'info',
						title: head,
						text: 'Enter correct information!!!',
					})
				}
			});
	};

	const UpdateData = async (e) => {
		setObj({ ...obj, [e.target.name]: e.target.value });
	};

	return (
		<>
			<div className='row login-body'>
				<div className='col'>
					<div className='form-container sign-in-container'>
						<form className='login-form'>
							<div className="flex ">
								<div className="mb-2 fs-1">Sign-In</div>
								<div className="mb-3 mt-3">
									<label className="login-label">Email address</label>
									<input type="email" className="login-input" id="email" name='email' placeholder='Enter email here' onChange={UpdateData} />
								</div>

								<div className="mb-3">
									<label className="login-label">Password</label>
									<input type="password" className="login-input" id="password" name='password' placeholder='Enter password here' onChange={UpdateData} />
								</div>
								<button className="login-button" id='signIn' type="submit" onClick={submit}>Sign in</button>
							</div>
						</form>
					</div>

					<div className='overlay-container'>
						<div className="overlay">
							<div className="overlay-panel overlay-right">
								<h1 className='login-h1'>Hello, Friend!</h1>
								<p className='login-p'>Enter your personal details and start journey with us</p>
								<p className='login-p'>SoftClues Solutions</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Login
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserByUserName } from "../ApiManager";
import logo from "../assets/ShowGo.svg";

export const Login = () => {
	const [userName, setUserName] = useState();
	const [password, setPassword] = useState();
	const navigate = useNavigate();

	const handleLogin = (e) => {
		e.preventDefault();

		return getUserByUserName(userName).then((foundUsers) => {
			if (foundUsers.length === 1) {
				const user = foundUsers[0];
				if (user.password === password) {
					localStorage.setItem(
						"activeUser",
						JSON.stringify({
							id: user.id,
						})
					);

					navigate("/");
				}
			} else {
				window.alert("Invalid login");
			}
		});
	};

	return (
		<main className='container'>
			<section>
				<header className='App-header'>
					<img src={logo} />
				</header>
				<form className='form--login' onSubmit={handleLogin}>
					<h2>Please sign in</h2>
					<fieldset>
						<label htmlFor='inputUserName'> User Name </label>
						<input
							id='inputUserName'
							type='text'
							onChange={(evt) => setUserName(evt.target.value)}
							className='form-control'
							placeholder='Enter user name'
							required
							autoFocus
						/>
					</fieldset>
					<fieldset>
						<label htmlFor='inputPassword'> Password </label>
						<input
							id='inputPassword'
							type='text'
							onChange={(evt) => setPassword(evt.target.value)}
							className='form-control'
							placeholder='Enter password'
							required
							autoFocus
						/>
					</fieldset>
					<fieldset>
						<button type='submit'>Sign In</button>
					</fieldset>
				</form>
			</section>
			<section className='link--register'>
				<button
					type='submit'
					onClick={() => {
						navigate("/register");
					}}
				>
					Register
				</button>
			</section>
		</main>
	);
};

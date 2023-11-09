import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserEmail, makeNewUser } from "../ApiManager";
import { StateDropdown } from "../forms/StateDropdown";

export const Register = (props) => {
	const [user, setUser] = useState({
		name: "",
		img: "",
		phone: 0,
		email: "",
		city: "",
		state: "",
		willingToTravel: false,
		distance: 0,
		username: "",
		password: "",
	});

	const defaultProfilePic =
		"https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png";

	const [profilePic, setProfilePic] = useState(defaultProfilePic);
	let navigate = useNavigate();

	const registerNewUser = () => {
		return makeNewUser(user)
			.then((res) => res.json())
			.then((createdUser) => {
				if (createdUser.hasOwnProperty("id")) {
					localStorage.setItem(
						"activeUser",
						JSON.stringify({
							id: createdUser.id,
						})
					);

					navigate("/");
				}
			});
	};

	const handleRegister = (e) => {
		e.preventDefault();
		return getUserEmail(user.email).then((response) => {
			if (response.length > 0) {
				// Duplicate email. No good.
				window.alert("Account with that email address already exists");
			} else {
				// Good email, create user.
				registerNewUser();
			}
		});
	};

	const updateUser = (evt) => {
		const copy = { ...user };
		copy[evt.target.id] = evt.target.value;
		setUser(copy);
	};

	const updateUserWithRadioButton = (evt) => {
		const copy = { ...user };
		copy[evt.target.name] = evt.target.value;
		setUser(copy);
	};

	const updateProfilePic = (value) => {
		const copy = { ...user };
		copy.img = value;
		setUser(copy);
		setProfilePic(value);
	};

	return (
		<main className='container'>
			<form className='form--login' onSubmit={handleRegister}>
				<h1 className='h3 mb-3 font-weight-normal'>
					Please Register for Showtime
				</h1>
				<img src={profilePic} alt='Profile Picture' />
				<fieldset>
					<label htmlFor='img'> Profile Picture </label>
					<input
						type='text'
						id='img'
						className='form-control'
						placeholder='Enter a profile picture URL'
						required
						autoFocus
					/>
					<button
						type='button'
						className='btn'
						onClick={() => {
							const userImg = document.getElementById("img");
							updateProfilePic(userImg.value);
						}}
					>
						Update Image
					</button>
					<button
						type='button'
						className='btn'
						onClick={() => {
							const userImg = document.getElementById("img");
							updateProfilePic(defaultProfilePic);
							userImg.value = "";
						}}
					>
						Remove Image
					</button>
				</fieldset>
				<fieldset>
					<label htmlFor='name'> Name </label>
					<input
						onChange={updateUser}
						type='text'
						id='name'
						className='form-control'
						placeholder='Enter your name'
						required
						autoFocus
					/>
				</fieldset>
				<fieldset>
					<label htmlFor='username'> User Name </label>
					<input
						onChange={updateUser}
						type='text'
						id='username'
						className='form-control'
						placeholder='User name'
						required
					/>
				</fieldset>
				<fieldset>
					<label htmlFor='password'> Password </label>
					<input
						onChange={updateUser}
						type='text'
						id='password'
						className='form-control'
						placeholder='Create password'
						required
					/>
				</fieldset>
				<fieldset>
					<label htmlFor='email'> Email </label>
					<input
						onChange={updateUser}
						type='email'
						id='email'
						className='form-control'
						placeholder='Email address'
						required
					/>
				</fieldset>
				<fieldset>
					<label htmlFor='phone'> Phone Number </label>
					<input
						onChange={updateUser}
						type='tel'
						id='phone'
						pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
						className='form-control'
						placeholder='XXX-XXX-XXXX'
						required
					/>
				</fieldset>
				<div className='row'>
					<fieldset>
						<label htmlFor='city'> City </label>
						<input
							onChange={updateUser}
							type='text'
							id='city'
							className='form-control'
							placeholder='Enter City'
							required
						/>
					</fieldset>
					<StateDropdown updateUser={updateUser} />
				</div>
				<fieldset className='col'>
					<div>Are you willing to travel for gigs?</div>
					<div className='row'>
						<input
							onChange={updateUserWithRadioButton}
							type='radio'
							id='willingToTravelTrue'
							className='form-control form-check-input'
							name='willingToTravel'
							value='true'
							required
						/>
						<label htmlFor='willingToTravelTrue' className='form-check-label'>
							Yes
						</label>
						<input
							onChange={updateUserWithRadioButton}
							type='radio'
							id='willingToTravelFalse'
							className='form-control form-check-input'
							name='willingToTravel'
							value='false'
							required
						/>
						<label htmlFor='willingToTravelFalse' className='form-check-label'>
							No
						</label>
					</div>
				</fieldset>
				{user.willingToTravel === "true" ? (
					<>
						<fieldset>
							<label htmlFor='city'>
								{" "}
								Distance you're willing to travel in miles{" "}
							</label>
							<input
								onChange={updateUser}
								type='number'
								id='distance'
								className='form-control'
								required
							/>
						</fieldset>
					</>
				) : (
					""
				)}
				<fieldset>
					<button type='submit'> Register </button>
				</fieldset>
			</form>
		</main>
	);
};

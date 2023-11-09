import { Link, useNavigate } from "react-router-dom";

export const NavBar = () => {
	const navigate = useNavigate();

	return (
		<ul className='navbar'>
			<li className='navbar__item navbar__logout'>
				<Link
					className='navbar__link'
					to=''
					onClick={() => {
						localStorage.removeItem("activeUser");
						navigate("/", { replace: true });
					}}
				>
					Logout
				</Link>
			</li>
		</ul>
	);
};

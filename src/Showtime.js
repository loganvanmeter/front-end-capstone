import { Route, Routes } from "react-router-dom";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import { ApplicationView } from "./views/ApplicationView";
import { Authorized } from "./views/Authorized";
import { NavBar } from "./nav/NavBar";

export const Showtime = () => {
	return (
		<Routes>
			<Route path='/login' element={<Login />} />
			<Route path='/register' element={<Register />} />
			<Route
				path='*'
				element={
					<Authorized>
						<>
							<NavBar />
							<ApplicationView />
						</>
					</Authorized>
				}
			/>
		</Routes>
	);
};

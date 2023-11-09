import { Outlet, Route, Routes } from "react-router-dom";

export const ApplicationView = () => {
	const localUser = localStorage.getItem("activeUser");
	const localUserObject = JSON.parse(localUser);

	if (localUserObject) {
		return (
			<>
				<Routes>
					<Route
						path='/'
						element={
							<>
								<Outlet />
							</>
						}
					></Route>
				</Routes>
			</>
		);
	}
};

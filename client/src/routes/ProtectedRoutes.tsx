import { Outlet, useRoutes } from 'react-router-dom';

import { DashboardRoutes } from '../features/dashboard';
import DefaultDashboardPage from '../features/dashboard/routes/DashboardPage';
import NotFound from '../components/NotFound';

const App = () => {
	let pathName = window.location.pathname;
	return (
		<>
			{pathName === '/' ? <DefaultDashboardPage /> : ''}
			<Outlet />
		</>
	);
};

const ProtectedRoutes = () => {
	const routes = [
		{
			path: 'dashboard',
			children: DashboardRoutes,
		},
	];

	return useRoutes([
		{
			path: '',
			element: <App />,
			children: routes,
		},
		{
			path: '*',
			element: <NotFound />,
		},
	]);
};

export default ProtectedRoutes;

import { Navigate, useRoutes } from 'react-router-dom'

import { AuthRoutes } from '../features/auth'

const PublicRoutes = () => {
	return useRoutes([
		{
			path: 'auth',
			children: AuthRoutes,
		},
		{
			path: '*',
			element: <Navigate to='/auth' />,
		},
	])
}

export default PublicRoutes

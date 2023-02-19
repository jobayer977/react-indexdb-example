import ProtectedRoutes from './ProtectedRoutes';
import PublicRoutes from './PublicRoutes';
import React from 'react';
import { useAuth } from '../features/auth/hooks/useAuth';

const AppRoutes = () => {
	const { isAuthenticated } = useAuth();
	return isAuthenticated ? <ProtectedRoutes /> : <PublicRoutes />;
};

export default AppRoutes;

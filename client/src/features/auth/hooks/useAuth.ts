import { useLogin, useRegister } from '../../../services/api-quries';
import { message } from 'antd';
import { storage } from '../../../utils';
export const useAuth = () => {
	const loginFn = useLogin({
		config: {
			onSuccess: (data: any) => {
				message.success('Login success');
				storage.setToken(data?.data?.payload?.token);
				window.location.assign(window.location.origin as unknown as string);
			},
		},
	});
	const registerFn = useRegister({
		config: {
			onSuccess: (data: any) => {
				message.success('Register success');
				storage.setToken(data?.data?.payload?.token);
				window.location.assign(window.location.origin as unknown as string);
			},
		},
	});
	const logoutFn = () => {
		storage.clear();
		window.location.assign(window.location.origin as unknown as string);
	};
	const isAuthenticated = storage.getToken() ? true : false;
	return {
		loginFn,
		logoutFn,
		isAuthenticated,
		registerFn,
	};
};

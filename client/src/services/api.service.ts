import { CoreAxiosInstance } from './../config/axios/core-axios-instantance';
export const ApiServices = {
	login: (data: any) => {
		return CoreAxiosInstance.post('/auth/login/user', data);
	},
	register: (data: any) => {
		return CoreAxiosInstance.post('/auth/register/user', data);
	},
};

import axios, { AxiosError } from 'axios';

import { ENV } from './../../ENV';
import { message } from 'antd';
import { storage } from '../../utils/util-function';

const headers = {
	'Content-Type': 'application/json',
	'X-Request-ID': 124,
	'X-Client-Version': 123,
	Authorization: `Bearer ${storage?.getToken()}`,
};
export const CoreAxiosInstance = axios.create({
	baseURL: ENV.CORE_END_POINT,
	timeout: 60000,
	headers,
});
CoreAxiosInstance.interceptors.request.use(
	(config: any) => {
		config.headers['Authorization'] = `Bearer ${storage?.getToken()}`;
		return config;
	},
	(error: any) => {
		return Promise.reject(error);
	}
);
CoreAxiosInstance.interceptors.response.use(
	(response: any) => {
		return response;
	},
	(error: AxiosError) => {
		if (error?.response?.status === 401) {
			storage.clear();
			window.location.assign(window.location.origin as unknown as string);
		} else if (error.response?.data?.success === false) {
			error.response?.data?.errorMessages?.map((x: string) => {
				return message.error(x);
			});
		}
		return error;
	}
);

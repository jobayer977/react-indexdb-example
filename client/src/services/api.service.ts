import { IBaseFilterRequest, ICreateTaskRequest } from 'src/models';

import { CoreAxiosInstance } from './../config/axios/core-axios-instantance';
import { stringify } from 'qs';
export const ApiServices = {
	login: (data: any) => {
		return CoreAxiosInstance.post('/auth/login/user', data);
	},
	register: (data: any) => {
		return CoreAxiosInstance.post('/auth/register/user', data);
	},
	tasks(options: IBaseFilterRequest) {
		return CoreAxiosInstance.get(`/tasks?${stringify(options)}`);
	},
	taskById(id: string) {
		return CoreAxiosInstance.get(`/tasks/${id}`);
	},
	createTask(payload: ICreateTaskRequest) {
		return CoreAxiosInstance.post(`/tasks`, payload);
	},
	deleteTask(id: string) {
		return CoreAxiosInstance.delete(`/tasks/${id}`);
	},
	sectors(options: IBaseFilterRequest) {
		return CoreAxiosInstance.get(`/sectors?${stringify(options)}`);
	},
	updateTask(data: { id: string; payload: ICreateTaskRequest }) {
		const { id, payload } = data;
		return CoreAxiosInstance.put(`/tasks/${id}`, payload);
	},
};

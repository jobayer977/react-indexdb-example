import {
	MutationConfig,
	QueryConfig,
	queryClient,
} from '../config/react-query/react-query';
import { useMutation, useQuery } from 'react-query';

import { ApiServices } from './api.service';
import { IBaseFilterRequest } from '../models';
interface ILoginMutation {
	config?: MutationConfig<typeof ApiServices.login>;
}
export const useLogin = ({ config }: ILoginMutation) => {
	return useMutation({
		...config,
		mutationFn: ApiServices.login,
	});
};
interface ICreateTaskMutation {
	config?: MutationConfig<typeof ApiServices.createTask>;
}
export const useCreateTask = ({ config }: ICreateTaskMutation) => {
	return useMutation({
		...config,
		mutationFn: ApiServices.createTask,
		onSettled: () => {
			queryClient.invalidateQueries('tasks');
		},
	});
};
interface IUpdateTaskMutation {
	config?: MutationConfig<typeof ApiServices.updateTask>;
}
export const useUpdateTask = ({ config }: IUpdateTaskMutation) => {
	return useMutation({
		...config,
		mutationFn: ApiServices.updateTask,
		onSettled: () => {
			queryClient.invalidateQueries('tasks');
		},
	});
};
interface IDeleteTaskMutation {
	config?: MutationConfig<typeof ApiServices.deleteTask>;
}
export const useDeleteTask = ({ config }: IDeleteTaskMutation) => {
	return useMutation({
		...config,
		mutationFn: ApiServices.deleteTask,
		onSettled: () => {
			queryClient.invalidateQueries('tasks');
		},
	});
};
interface IRegisterMutation {
	config?: MutationConfig<typeof ApiServices.register>;
}
export const useRegister = ({ config }: IRegisterMutation) => {
	return useMutation({
		...config,
		mutationFn: ApiServices.register,
	});
};
interface ITaskQuery {
	config?: QueryConfig<typeof ApiServices.tasks>;
	options: IBaseFilterRequest;
}
export const useTasks = ({ config, options }: ITaskQuery) => {
	return useQuery({
		...config,
		queryFn: () => ApiServices.tasks(options),
		queryKey: ['tasks', options],
	} as any);
};
interface ISectorsQuery {
	config?: QueryConfig<typeof ApiServices.sectors>;
	options: IBaseFilterRequest;
}
export const useSectors = ({ config, options }: ISectorsQuery) => {
	return useQuery({
		...config,
		queryFn: () => ApiServices.sectors(options),
		queryKey: ['sectors', options],
	} as any);
};
interface TaskQuery {
	config?: QueryConfig<typeof ApiServices.sectors>;
	id: string;
}
export const useTask = ({ config, id }: TaskQuery) => {
	return useQuery({
		...config,
		queryFn: () => ApiServices.taskById(id),
		queryKey: ['task', id],
	} as any);
};

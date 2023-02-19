import { ApiServices } from './api.service';
import { MutationConfig } from 'src/config/react-query/react-query';
import { useMutation } from 'react-query';

interface ILoginMutation {
	config?: MutationConfig<typeof ApiServices.login>;
}
export const useLogin = ({ config }: ILoginMutation) => {
	return useMutation({
		...config,
		mutationFn: ApiServices.login,
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

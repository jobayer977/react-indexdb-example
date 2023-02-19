export interface IOption {
	label: string;
	value: string;
}
export interface ILoginRequest {
	email: string;
	password: string;
}

export interface IBaseFilterRequest {
	searchTerm?: string;
	page?: number;
	take?: number;
	userId?: string;
}
export interface ICreateTaskRequest {
	name: string;
	sectors?: string[] | null;
	userId: string;
}

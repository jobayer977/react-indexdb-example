export interface ITaskEntity {
	id: string;
	serial: number;
	isActive: boolean;
	createdAt: string;
	updatedAt: string;
	title: string;
	parent?: null;
	value: string;
	children?: null[] | null;
}

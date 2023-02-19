import jwt_decode from 'jwt-decode';
const storagePrefix = '';
export const storage = {
	getToken: (): string | false => {
		let item: any = localStorage.getItem(`${storagePrefix}token`);
		return item;
	},
	getDecodedToken: (): any => {
		let item: any = localStorage.getItem(`${storagePrefix}token`);
		return jwt_decode(item);
	},
	setToken: (token: string) => {
		localStorage.setItem(`${storagePrefix}token`, JSON.stringify(token));
	},
	clear: () => {
		localStorage.clear();
	},
	setData(data: any, key: string) {
		localStorage.setItem(key, JSON.stringify(data));
	},
	getDate(key: string) {
		let item = localStorage.getItem(key);
		if (!item) {
			return;
		}
		return JSON.parse(item);
	},
	removeData(key: string) {
		localStorage.removeItem(key);
	},
};

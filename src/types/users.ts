export type ID = number;

export interface IState{
	currentPage: number;
	currentUser: ID;
	users: IUser[]
}

export interface IContact {
	id: ID
	name: string;
	phone: string;
	img?: string;
}

export interface IAuth {
	login: string;
	pass: number | string;
}

export interface IUser {
	id: ID;
	name: string;
	auth: IAuth;
	img?: string;
	contacts?: IContact[];
}
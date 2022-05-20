import { IContact, ID, IUser } from "./users";

export interface AddUserAction{
	type: string,
	payload: IUser
}

export interface SetCurrentUserAction {
	type: string,
	payload: ID
}

export interface DeleteContactAction {
	type: string,
	payload: ID
}

export interface AddEditContactAction {
	type: string,
	payload: IContact
}

export interface setPageAction {
	type: string,
	payload: number
}
import { createSlice } from "@reduxjs/toolkit";
import { AddEditContactAction, AddUserAction, DeleteContactAction, SetCurrentUserAction, setPageAction } from "../../types/actions";
import { IContact, IState, IUser } from "../../types/users";

const testContacts: IContact[] = [
	{
		id: 1,
		name: 'Sergey',
		phone: '254849845'
	},
	{
		id: 2,
		name: 'Anton',
		phone: '726535161'
	},
	{
		id: 3,
		name: 'Boris',
		phone: '516651461'
	},
	{
		id: 4,
		name: 'Anna',
		phone: '21436578'
	},
	{
		id: 5,
		name: 'Emma',
		phone: '55444889'
	},
	{
		id: 6,
		name: 'Михаил',
		phone: '0254849845'
	},
	{
		id: 7,
		name: 'Валентина',
		phone: '9726535161'
	},
	{
		id: 8,
		name: 'Банк',
		phone: '3516651461'
	},
	{
		id: 9,
		name: 'Fillip',
		phone: '421436578'
	},
	{
		id: 10,
		name: 'John',
		phone: '655444889'
	},
	{
		id: 11,
		name: 'Полиция',
		phone: '972655161'
	},
	{
		id: 12,
		name: 'Черный плащ',
		phone: '351661461'
	},
	{
		id: 13,
		name: 'Mr Max',
		phone: '42136578'
	},
	{
		id: 14,
		name: 'Patrik',
		phone: '65544889'
	}
]

const testObj:IState = {
	currentPage: 1,
	currentUser: -1,
	users: [
		{
			id: 0,
			name: 'Tester',
			auth: {
				login: 'test',
				pass: 'test'
			},
			contacts: [...testContacts]
		}
	] as IUser[]
}

const findContactIndex = (arr:IContact[], id: number) => {
	return arr.findIndex(a => a.id === id)
}

const findCurrentUser = (state: IState) => {
	return state.users.find(user => user.id === state.currentUser)
}

const pushStateToLocalStorage = (state: IState) => {
	localStorage.state = JSON.stringify(state)
}

if (localStorage.getItem('state') === null) localStorage.setItem('state', JSON.stringify(testObj))

const initState: IState = localStorage.getItem('state') === null ? {...testObj} : JSON.parse(localStorage.getItem('state')!)

const usersSlice = createSlice({
	name: 'users',
	initialState: initState,
	reducers: {
		addUser(state, action: AddUserAction) {
			state.users.push(action.payload)
			pushStateToLocalStorage(state)
		},
		setCurrentUser(state, action: SetCurrentUserAction) {
			state.currentUser = action.payload;
			pushStateToLocalStorage(state)
		},
		setPage(state, action: setPageAction) {
			state.currentPage = action.payload;
			pushStateToLocalStorage(state)
		},
		deleteContact(state, action: DeleteContactAction) {
			const arr = findCurrentUser(state)?.contacts
			arr?.splice(findContactIndex(arr, action.payload), 1)
			pushStateToLocalStorage(state)
		},
		addContact(state, action: AddEditContactAction) {
			findCurrentUser(state)?.contacts?.unshift(action.payload)
			pushStateToLocalStorage(state)
		},
		editContact(state, action: AddEditContactAction) {
			const contact = findCurrentUser(state)?.contacts?.find(contact => contact.id === action.payload.id);
			if (contact) {
				contact.name = action.payload.name
				contact.phone = action.payload.phone
				pushStateToLocalStorage(state)
			}
		}
	}
})

export default usersSlice.reducer;
export const { addUser, deleteContact, setCurrentUser, addContact, editContact, setPage } = usersSlice.actions;
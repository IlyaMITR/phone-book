import { SyntheticEvent, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { addUser, setCurrentUser, setPage } from "../../store/slices/users-slice";
import { IUser } from "../../types/users";
import './forms.scss';


export default function RegistrationForm() {

	const users = useAppSelector(state => state.data.users);
	const [isFoundUser, setFoundUser] = useState(false);
	const dispatch = useAppDispatch();
	const changePage = (num: number) => {
		dispatch(setPage(num))
	}

	const nameInput = useRef<HTMLInputElement>(null)
	const loginInput = useRef<HTMLInputElement>(null)
	const passInput = useRef<HTMLInputElement>(null)

	const createUser = (e: SyntheticEvent) => {
		e.preventDefault();
		const nameObj = nameInput.current;
		const loginObj = loginInput.current;
		const passObj = passInput.current;
		if (nameObj && loginObj && passObj) {
			const foundUser = users.find(user => user.auth.login === loginObj.value)
			if (foundUser) {
				setFoundUser(true)
			} else {
				const model: IUser = {
					id: Date.now(),
					name: nameObj.value,
					auth: {
						login: loginObj.value,
						pass: passObj.value
					},
					contacts: []
				}
				dispatch(addUser(model))
				dispatch(setCurrentUser(model.id))
				changePage(3)
				setFoundUser(false)
			}
		}
	}

	return (
		<div className="auth-form">
			<h2>Регистрация</h2>
			<form action="" onSubmit={createUser}>
				<label htmlFor="reg-name">Имя:<input ref={nameInput} id="reg-name" type="text" required /></label>
				{
					isFoundUser ? <span className="warning">Данный логин уже используется</span> : null
				}
				<label htmlFor="reg-login">Логин:<input ref={loginInput} id="reg-login" type="text" required /></label>
				<label htmlFor="reg-password">Пароль:<input ref={passInput} id="reg-password" type="password" required /></label>
				<input id="submit" type="submit" value='Создать аккаунт'/>
			</form>
			<span className="create" onClick={() => changePage(1)}>Авторизоваться</span>
		</div>
	)
}
import { SyntheticEvent, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setCurrentUser, setPage } from "../../store/slices/users-slice";
import './forms.scss'


export default function AuthForm() {

	const [isFoundUser, setFoundUser] = useState(true);
	const users = useAppSelector(state => state.data.users);
	const dispatch = useAppDispatch();
	const changePage = (num: number) => {
		dispatch(setPage(num))
	};

	const loginInput = useRef<HTMLInputElement>(null)
	const passInput = useRef<HTMLInputElement>(null)

	const handleSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
		const loginObj = loginInput.current;
		const passObj = passInput.current;
		if (loginObj && passObj) {
			const foundUser = users.find(user => user.auth.login === loginObj.value && user.auth.pass === passObj.value)
			if (foundUser) {
				dispatch(setCurrentUser(foundUser.id))
				changePage(3)
				setFoundUser(true)
			} else {
				setFoundUser(false)
			}
		}
	}

	return (
		<div className="auth-form">
			<h2>Авторизация</h2> 
			<form action="" onSubmit={handleSubmit}>
				{
					isFoundUser ? null : <span className="warning">Неверный логин или пароль</span>
				}
				<label htmlFor="au-login">
					Логин:<input ref={loginInput} id="au-login" type="text" required />
				</label>
				<label htmlFor="au-password">
					Пароль:<input ref={passInput} id="au-password" type="password" required />
				</label>
				<input id="submit" type="submit" value='Войти' />
			</form>
			<span className="create" onClick={() => changePage(2)}>Создать аккаунт</span>
		</div>
	)
}
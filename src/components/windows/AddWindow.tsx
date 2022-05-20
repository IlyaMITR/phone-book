import { SyntheticEvent, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { addContact } from '../../store/slices/users-slice';
import { IContact } from '../../types/users';
import './windows.scss';

interface IAddWindow{
	setVisible: () => void
}

export default function AddWindow({ setVisible }: IAddWindow) {

	const user = useAppSelector(state => state.data.users.find(user => user.id === state.data.currentUser));
	const [isFoundContact, setFoundContact] = useState(false);
	const nameInput = useRef<HTMLInputElement>(null)
	const phoneInput = useRef<HTMLInputElement>(null)

	const dispatch = useAppDispatch()

	const handleSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
		const nameObj = nameInput.current;
		const phoneObj = phoneInput.current;
		if (nameObj && phoneObj && user) {
			const foundContact = user.contacts?.find(contact => contact.phone === phoneObj.value)
			if (foundContact) {
				setFoundContact(true)
			} else {
				const newContact: IContact = {
					id: Date.now(),
					name: nameObj.value,
					phone: phoneObj.value
				} 
				dispatch(addContact(newContact))
				setFoundContact(false)
				setVisible()
			}
		}
	}

	const bgClick = (e: any) => {
		if (e.target.className === 'window-bg') setVisible()
	}

	return (
		<div className='window-bg' onClick={bgClick}>
			<div className="window">
				<div className="window__head">Новый контакт</div>
				<div className="window__body">
					<form action="" onSubmit={handleSubmit}>
						{
							isFoundContact ? <span className="warning">Данный телефон уже используется</span> : null
						}
						<label htmlFor="new-name">
							Имя: <input ref={nameInput} type="text" id="new-name" required />
						</label>
						<label htmlFor="new-phone">
							Телефон: <input ref={phoneInput} type="number" id="new-phone" required />
						</label>
						<input type="submit" value='Создать'/> 
					</form>
				</div>
			</div>
		</div>
	)
}
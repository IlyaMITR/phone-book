import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import './PhoneBook.scss';
import { IContact, ID } from "../../types/users";
import { deleteContact, editContact } from "../../store/slices/users-slice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";

interface IPhoneBookItem{
	contactID: ID;
}

export default function PhoneBookItem({ contactID }: IPhoneBookItem) {

	const contact = useAppSelector(
		state =>
			state.data.users.find(
				user => user.id === state.data.currentUser
			)?.contacts?.find(
				item => item.id === contactID
			)
	)
	
	const [height, setHeight] = useState('2em')
	const [isEdit, setEdit] = useState(false)
	const [isFilledName, setFilledName] = useState(true);
	const [isFilledPhone, setFilledPhone] = useState(true);
	
	useEffect(() => console.log('ITEM'), [contact])

	const nameInput = useRef<HTMLInputElement>(null)
	const phoneInput = useRef<HTMLInputElement>(null)

	const unFold = (e: any) => {
		if (e.target.className !== 'phone-book-item__control' && e.target.type !== 'text' && isEdit === false)
			height === '2em' ? setHeight('5em') : setHeight('2em')
	}

	const dispatch = useAppDispatch();

	const handleEdit = () => {
		setEdit(!isEdit)
		setFilledName(true)
		setFilledPhone(true)
	}

	const handleDelete = () => {
		dispatch(deleteContact(contact!.id))
	}

	const handleSave = (e: SyntheticEvent) => {
		e.preventDefault();
		const nameObj = nameInput.current;
		const phoneObj = phoneInput.current;
		if (nameObj && phoneObj) {
			if (nameObj.value && phoneObj.value) {
				const editedContact: IContact = {
					id: contact!.id,
					name: nameObj.value,
					phone: phoneObj.value
				}
				dispatch(editContact(editedContact))
				handleEdit()
			} else {
				if (!nameObj.value) setFilledName(false)
				if (!phoneObj.value) setFilledPhone(false)
			}
		}

	}

	return contact ? (
		<div className="phone-book-item" onClick={unFold} style={{ height: height }}>
			{
				isEdit ?
					<>
						<label className={`edit ${isFilledName ? null : 'not-filled'}`} htmlFor="ch-name">Имя: <input ref={nameInput} type="text" id='ch-name' defaultValue={contact.name}/></label>
						<label className={`edit ${isFilledPhone ? null : 'not-filled'}`} htmlFor="ch-phone">Телефон: <input ref={phoneInput} type="number" id='ch-phone' defaultValue={contact.phone}/></label>
					</> :
					<>
						<div className="phone-book-item__name">{contact.name}</div>
						<div className="phone-book-item__phone">{contact.phone}</div>
					</>
			}
			{
				height === '5em' ?
					<>
						<span className='phone-book-item__control' onClick={isEdit ? handleSave : handleEdit}>
							{isEdit ? 'Сохранить' : 'Редактировать'}
						</span>
						<span className="phone-book-item__control" onClick={isEdit ? handleEdit : handleDelete}>
							{isEdit ? 'Отменить' : 'Удалить'}
						</span>
					</> : null
			}
		</div>
	) : null
}
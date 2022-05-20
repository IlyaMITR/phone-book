import { useEffect, useState } from "react";
import './PhoneBook.scss';
import PhoneBookItem from "./PhoneBookItem";
import SearchPanel from "../search-panel/SearchPanel";
import { useAppSelector } from "../../hooks/redux";
import AddButton from "./AddButton";
import UserInfo from "../user-info/UserInfo";


export default function PhoneBook() {

	
	const user = useAppSelector(state => state.data.users.find(u => u.id === state.data.currentUser))
	const contacts = user?.contacts
	
	useEffect(() => {
		console.log('BOOK')
		console.log(contacts)
		setData(contacts)
	}, [contacts?.length])

	const [data, setData] = useState(contacts)

	const searchElement = (e: any) => {
		setData(contacts?.filter(el => el.name.toLowerCase().includes(e.target.value.toLowerCase())))
	}

	return user ? (
		<div className="phone-book">
			<SearchPanel handleChange={searchElement} />
			<AddButton />
			<UserInfo name={user.name}/>
			<div className="phone-book__list">
				{
					data?.map(item => <PhoneBookItem contactID={item.id} key={item.id} />)
				}
			</div>
		</div>
	) : null
}
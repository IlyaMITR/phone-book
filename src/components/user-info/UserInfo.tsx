import { useAppDispatch } from '../../hooks/redux';
import { setPage } from '../../store/slices/users-slice';
import '../phone-book/PhoneBook.scss'

interface IUserInfo{
	name: string;
}

export default function UserInfo({ name }: IUserInfo) {

	const dispatch = useAppDispatch();
	const changePage = (num: number) => {
		dispatch(setPage(num))
	}

	return (
		<div className="user-info">
			<div className="user-info__name">{name}</div>
			<button className="user-info__quit" onClick={() => changePage(1)}>Выйти</button>
		</div>
	)
}
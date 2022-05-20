import React from "react";
import './SearchPanel.scss';

interface ISearchPanel{
	handleChange: (e:any) => void;
}

export default function SearchPanel({ handleChange }: ISearchPanel) {
	return (
		<div className="search-panel">
			<label htmlFor="cont-search">Поиск:<input id="cont-search" type="text" onChange={handleChange}/></label>
		</div>
	)
}
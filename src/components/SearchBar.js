import React, { useContext } from "react";
import { RecipeContext } from "../contexts/Context";
import "../Search.css";

export default function SearchBar() {
	const { searchValue, setSearchValue } = useContext(RecipeContext);
	const onInputChange = (event) => {
		const { value } = event.target;
		setSearchValue(value);
	};
	return (
		<div className="searchField">
			<form>
				<input type="text" placeholder="Search" value={searchValue} onChange={onInputChange} />
			</form>
		</div>
	);
}

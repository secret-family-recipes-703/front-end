import React, { useContext } from "react";
import { RecipeContext } from "../contexts/Context";
import { useHistory, Link, Route } from "react-router-dom";
import searchIcon from "../images/search_icon.png";
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
				{/* <button type="submit" className="search-btn" onClick={onInputChange}>
					<img src={searchIcon} alt="search button" />
				</button> */}
			</form>
		</div>
	);
}

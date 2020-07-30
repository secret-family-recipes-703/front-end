import React, { useEffect, useContext } from "react";
import axiosWithAuth from "../util/axiosWithAuth";
import { useHistory, Link } from "react-router-dom";
import { RecipeContext } from "../contexts/Context";
import NavBar from "./navBar";
import Recipe from "./recipeCard";
import Styled from "styled-components";
import video from "../assets/strawberryVid.mp4";
import SearchBar from "./SearchBar";
import "../Search.css";

const RecipesDiv = Styled.div`
box-sizing: border-box;
display: flex;
flex-wrap: wrap;
justify-content: space-around;
margin: 0 auto 2rem;
max-width: 1100px;
padding: 0 2rem;
/* overflow: scroll; */
max-height: 100vh;
#videoBG {
            position: fixed;
            z-index: -1;
            min-height: 50%;
            max-height:100%;
            min-width: 100%;
            bottom: 0;
            right: 0;
            padding: none;
            overflow-x: hidden;
            background-repeat: no-repeat;
            background-size: cover;

            /* background-position: center; */
        }
`;


const Recipes = (props) => {
	const { searchValue } = useContext(RecipeContext);
	const { recipes, addRecipes } = useContext(RecipeContext);
	const { push } = useHistory();
	function routeToRecipe(ev, recipe) {
		ev.preventDefault();
		props.history.push(`/recipe/${recipe.id}`);
	}

	useEffect(() => {
		axiosWithAuth()
			.get("/recipes")
			.then((res) => {
				addRecipes(res.data.data);
			});
	}, []);


	useEffect(() => {
		console.log(searchValue);
		recipes &&
			recipes.filter((recipe) => {
				return (
					recipe.category.toLowerCase().includes(searchValue.toLowerCase()) ||
					recipe.name.toLowerCase().includes(searchValue.toLowerCase())
				);
			});
	}, [searchValue]);
	// 	return (
	// 		<div className="recipes-container">
	// 			<a href="/new">Add a New Recipe</a>
	// 			<ul>
	// 				{recipes.map((recipe) => (
	// 					<ul className="recipe-cards">
	// 						{recipe.name} // {recipe.category} // {recipe.source} <img src={recipe.imageURL} />
	// 					</ul>
	// 				))}
	// 			</ul>
	// 		</div>
	// 	);
	// };

	return (
		<div>
			<NavBar />
			<SearchBar />
			<RecipesDiv>
				{recipes &&
					recipes
						// .filter((recipe) => {
						// 	recipe.category.toLowerCase().includes(searchValue.toLowerCase()) ||
						// 		recipe.name.toLowerCase().includes(searchValue.toLowerCase());
						// })
						.map((recipe) => {
							return (
								<Link style={{ textDecoration: "none" }} to={`/recipe/${recipe.id}`}>
									<Recipe recipe={recipe} />
								</Link>
							);
						})}

				{recipes.map((recipe) => {
					return (
						<Link to={`/recipe/${recipe.id}`}>
							<Recipe recipe={recipe} />
						</Link>
					);
				})}
				<video id="videoBG" poster="../src/assets/strawberry.png" autoPlay muted loop>
					<source src={video} type="video/mp4" />
				</video>
			</RecipesDiv>
		</div>
	);
};

export default Recipes;

import React from "react";
import Styled from "styled-components";

const RecipeDiv = Styled.div`
 &:hover {transform: scale(1.1)}
    max-width: 500px;
    display: flex
    flex-direction: column;
    align-items: center;
    width: 325px;
    /* min-width: 250px;
    max-width: 250px; */
    margin: 3rem 0 0;
    border-radius: 20px;
    background-color: rgba(74, 198, 215, 0.7);
    box-sizing: border-box;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
    font-family: 'Merienda-Regular';
    font-size: 2.5rem;
    text-align: center;
    color: black;
    height: 350px;
    img{
        width:100%;
        border-radius: 20px;
        height: 200px
    }
    h2{
        padding: 0 1rem;
    }
    p{
        padding: 0 1rem;
    }
`;
const RecipeCard = (props) => {
	const { recipe } = props;
	return (
		<RecipeDiv>
			<div id="image-container">
				<img alt="recipe pic" src={recipe.imageURL} />
			</div>
			<h2>{recipe.name} </h2>
			<p>Category: {recipe.category}</p>
			<p>Source: {recipe.source}</p>
		</RecipeDiv>
	);
};

export default RecipeCard;

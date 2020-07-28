import React from "react"

const Recipe = props => {
    return (
        <div className="recipe">
            <h4>{props.name}</h4>
            <p>{props.source}</p>
            <p>{props.category}</p>
            <img alt="recipe pic">{props.imageURL}</img>
        </div>
    )
}

export default Recipe;
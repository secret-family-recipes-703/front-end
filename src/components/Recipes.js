import React from 'react'
import {connect} from 'react-redux'
import Recipe from './Recipe'

const Recipes = props => {
  return (
    <div className="recipes">
      <h2>
        Recipes:
      </h2>
      <div>
        {(props.recipes.map(recipe => {
          return (
            <Recipe
              key={recipe.id}
              id={recipe.id}
              name={recipe.name}
              category={recipe.category}
              source={recipe.source}
              image={recipe.imageURL}
            />
          )
        }))}
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    recipes: state.recipes.data
  }
}

export default connect(mapStateToProps, {})(Recipes)
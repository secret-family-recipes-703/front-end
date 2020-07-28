import React from 'react'

const NewRecipe = () => {
  return (
    <div className="addNew">
      <a href='/recipes'>Back to Recipe List</a>
      <input placeholder="Name"></input>
      <input placeholder="Category"></input>
      <input placeholder="Source"></input>
      <input placeholder="Ingredients"></input>
      <input placeholder="Instructions"></input>
      <button>Submit</button>
    </div>
  )
}

export default NewRecipe
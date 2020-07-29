import React from "react"
import ParentDiv from '../styles/recipeforms'


const RecipeForm = props => {
const {formErrors, formValues, disabled, inputChange, postNewRecipe} = props

const submit = evt => {
    evt.preventDefault()
    const newRecipe = {
      title: formValues.title.trim(),
      source: formValues.source.trim(),
      category: formValues.category,
    }
    postNewRecipe(newRecipe)
  }

  const onInputChange = evt => {
    const { name, value } = evt.target
    inputChange(name, value)
  }

    return(
        <ParentDiv>
                <form onSubmit={submit}>
                    <h2>Add Your Recipe!</h2>
                <div className='errors'>
                    <div id='titleError'>{formErrors.title}</div>
                </div>
                    <label htmlFor='title'>
                        <input
                            type='text'
                            name='title'
                            value={formValues.title}
                            placeholder='Enter title of recipe'
                            onChange={onInputChange}
                        ></input>
                    </label>
                    <label htmlFor='source'>
                        <input
                            type='text'
                            name='source'
                            value={formValues.source}
                            placeholder='Enter source of recipe'
                            onChange={onInputChange}
                        ></input>
                    </label>
                    <label htmlFor='imgSRC'>
                        <input
                            type='text'
                            name='src'
                            value={formValues.src}
                            placeholder='Enter URL of image'
                            onChange={onInputChange}
                        ></input>
                    </label>
                    <label htmlFor='category'>
                        <select
                            onChange={onInputChange}
                            value={formValues.category}
                            name='category'
                        >
                            <option value='' >Food category</option>
                            <option value='pizza' >Pizza</option>
                            <option value='lame' >Not pizza</option>
                        </select>
                    </label>

                    <button disabled={disabled} id='submitBtn'>Add Recipe</button>

                </form>
         </ParentDiv>
    )
}

export default RecipeForm
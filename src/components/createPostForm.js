import React from "react"

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
        <div>
            <div className='errors'>
                <div id='titleError'>{formErrors.title}</div>
            </div>
            <form onSubmit={submit}>
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
                {/* <label htmlFor='ingredients'>
                    <input
                    type='text'
                    name='ingredients'
                    value={formValues.ingredients}
                    placeholder='Enter ingredients for recipe'
                    onChange={onInputChange}
                    ></input>
                </label>
                <label htmlFor='instructions'>
                    <input
                    type='text'
                    name='instructions'
                    value={formValues.instructions}
                    placeholder='Enter instructions of recipe'
                    onChange={onInputChange}
                    ></input>
                </label> */}
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


         </div>
    )
}

export default RecipeForm
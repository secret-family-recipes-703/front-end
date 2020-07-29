import React, {useState} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'

import './App.css';

import {RecipeContext} from './contexts/Context'

import Login from './components/Login'
import Register from './components/Register'
import Recipes from './components/Recipes'
// import NewRecipe from './components/New'
import RecipeForm from './components/createPost'
import InstructionsForm from './components/addInstructionsForm'
import IngredientsForm from './components/addIngredientsForm'
import RecipePage from './components/RecipePage'

function App() {
  const [recipes, addRecipes] = useState([''])
  const [searchValue, setSearchValue] = useState('')

  return (
    <Router>
      <div className="App">
        
        <Route exact path="/" component={Register} className="RegisterComponent" />

        <RecipeContext.Provider value={{recipes, addRecipes, searchValue, setSearchValue}}>
          <Route exact path="/login" component={Login} />
          <Route exact path="/recipes" component={Recipes} />
          <Route exact path="/create" component={RecipeForm} />
          <Route exact path='/instructions' component={InstructionsForm} />
          <Route exact path='/ingredients' component={IngredientsForm} />
          <Route path="/recipe/:id" component={RecipePage} />
        </RecipeContext.Provider>
      </div>
    </Router>
  );
}

export default App;

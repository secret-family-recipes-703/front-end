import React, {useState} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'

import './App.css';

import {RecipeContext} from './contexts/Context'

import Login from './components/Login'
import Register from './components/Register'
import Recipes from './components/Recipes'
import NewRecipe from './components/New'

function App() {
  const [recipes, addRecipes] = useState([''])

  return (
    <Router>
      <div className="App">
        
        <Route exact path="/" component={Register} className="RegisterComponent" />

        <RecipeContext.Provider value={{recipes, addRecipes}}>
          <Route exact path="/login" component={Login} />
          <Route exact path="/recipes" component={Recipes} />
          <Route exact path="/new" component={NewRecipe} />
        </RecipeContext.Provider>
      </div>
    </Router>
  );
}

export default App;

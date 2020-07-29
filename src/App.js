import React from 'react';
import './App.css';

import NewRecipe from './components/createPost'
import NewInstructions from './components/addInstructionsForm'
import NewIngredients from './components/addIngredientsForm'

function App() {
  return (
    <div>
      <NewRecipe/>
      <NewInstructions/>
      <NewIngredients/>
    </div>
  );
}

export default App;

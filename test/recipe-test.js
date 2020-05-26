import { expect } from 'chai';

import User from '../src/user'
import Recipe from '../src/recipe';
import recipeData from '../src/data/recipe-data';
import usersData from '../src/data/users-data'

describe('Recipe', function() {
  let recipe, recipeInfo, user;

  beforeEach(function() {
    user = usersData[0];
    recipeInfo = recipeData[0];
    recipe = new Recipe(recipeInfo);
  })

  it('is a function', function() {
    expect(Recipe).to.be.a('function');
  });

  it('should be an instance of Recipe', function() {
    expect(recipe).to.be.an.instanceof(Recipe);
  });

  it('should initialize with an id', function() {
    expect(recipe.id).to.eq(595736);
  });

  it('should initialize with an name', function() {
    expect(recipe.name).to.eq('Loaded Chocolate Chip Pudding Cookie Cups');
  });

  it('should initialize with an image', function() {
    expect(recipe.image).to.eq('https://spoonacular.com/recipeImages/595736-556x370.jpg');
  });

  it('should initialize with an array of ingredients', function() {
    const ingredient = {
      "id": 20081,
      "name": "all purpose flour",
      "quantity": {
        "amount": 1.5,
        "unit": "c"
      }
    }
    expect(recipe.ingredients[0]).to.deep.eq(ingredient);
  });

  it('should be able to return ingredient data for recipe', function() {
    
    expect(recipe.calculateIngredientsCost().length).to.equal(recipe.ingredients.length)
    
  });
});

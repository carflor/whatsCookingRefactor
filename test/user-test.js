import { expect } from 'chai';

import User from '../src/user';
import users from '../src/data/users-data';
import recipeData from '../src/data/recipe-data'
// import RecipeRepo from '../src/recipeRepo'

describe.only('User', function() {
  let user, userInfo, recipe;

  beforeEach(function() {
    userInfo = users[0];
    user = new User(userInfo)
    recipe = recipeData[0];
  });

  it('should be a function', function() {
    expect(User).to.be.a('function');
  });

  it('should initialize with an id', function() {
    expect(user.id).to.eq(1);
  });

  it('should initialize with a name', function() {
    expect(user.name).to.eq('Saige O\'Kon');
  });

  it('should initialize with a pantry', function() {
    expect(user.pantry[0].ingredient).to.eq(20081);
  });

  it('should check if recipe can be cooked', function() {
    expect(user.checkAbility2Cook(recipe)).to.be.true
  });

  it('should check if recipe can be cooked', function() {
    let user2 = new User(users[1]);
    expect(user2.checkAbility2Cook(recipe)).to.be.false
  });

  it('should be able to cook a recipe', function() {
    user.cookRecipe(recipe);
    expect(user.pantry[0].amount).to.equal(2.5);
    expect(user.pantry[4].amount).to.equal(0);
    expect(user.pantry[12].amount).to.equal(1);
  });

  it('should return the required ingredients if user cannot cook recipe', function() {
    let user2 = new User(users[1]);
    let requiredIngredients =   [
      {name: 'egg', id: 1123, quantity: {amount: 1, unit: 'large'}},
      {name: 'granulated sugar', id: 19335, quantity: {amount: 0.5, unit: 'c'}},
      {name: 'instant vanilla pudding mix', id: 19206, quantity: {amount: 2, unit: 'Tbsp'}},
      {name: 'light brown sugar', id: 19334, quantity: {amount: 0.5, unit: 'c'}},
      {name: 'salt', id: 2047, quantity: {amount: 0.5, unit: 'tsp'}},
      {name: 'sea salt', id: 1012047, quantity: { amount: 22, unit: 'servings' }}
    ]
    expect(user2.findRequiredIngredients(recipe)).to.deep.equal(requiredIngredients);
  });
});

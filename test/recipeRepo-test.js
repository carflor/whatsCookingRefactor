import { expect } from 'chai';

import RecipeRepo from '../src/recipeRepo';
import recipeData from '../src/data/recipe-data';


describe('recipeRepo', function() {
  let recipeRepo, recipe, recipe1, recipe2, recipeFavorites, recipesToCook;

  beforeEach(function() {
    recipeRepo = new RecipeRepo(recipeData);
    recipeFavorites = new RecipeRepo();
    recipesToCook = new RecipeRepo();

    recipe = recipeData[0];
    recipe1 = recipeData[1]
    recipe2 = recipeData[2];
  });

  it('should be a function', function() {
    expect(RecipeRepo).to.be.a('function');
  });

  it('should be an instance of RecipeRepo', function() {
    expect(recipeRepo).to.be.an.instanceOf(RecipeRepo);
  })

  it('should have an array of recipes', function() {
    expect(recipeRepo.cookBook).to.deep.equal(recipeData);
  })

  it('should start as an empty array', function() {
    expect(recipeFavorites.cookBook).to.deep.equal([]);
  })

  it('should be able to add recipes to favorite recipes', function() {
    recipeFavorites.addRecipe(recipe1);
    recipeFavorites.addRecipe(recipe);    
    expect(recipeFavorites.cookBook).to.deep.equal([recipe1, recipe]);
  })

  it('should return an empty array if no argument is given', function() {
    recipeFavorites.addRecipe();
    expect(recipeFavorites.cookBook).to.deep.equal([undefined]);
  })

  it('should be able to add recipes to cook', function() {
    recipesToCook.addRecipe(recipe1);
    recipesToCook.addRecipe(recipe);    
    expect(recipesToCook.cookBook).to.deep.equal([recipe1, recipe]);
  });

  it('should return an empty array if no argument is given', function() {
    recipesToCook.addRecipe();
    expect(recipesToCook.cookBook).to.deep.equal([undefined]);
  })

  it("should be able to remove a recipe", function() {
    recipesToCook.addRecipe(recipe);
    recipesToCook.addRecipe(recipe1);
    recipesToCook.addRecipe(recipe2);
    recipesToCook.removeRecipe(recipe1);
    expect(recipesToCook.cookBook).to.deep.equal([recipe, recipe2]);
  });
  
  it("should not remove any recipes if no argument is given", function() {
    recipesToCook.addRecipe(recipe);
    recipesToCook.addRecipe(recipe1);
    recipesToCook.addRecipe(recipe2);
    recipesToCook.removeRecipe();
    expect(recipesToCook.cookBook).to.deep.equal([recipe, recipe1, recipe2]);
  })

  it('should be able to filter by a tag', function() {
    let filteredResults = recipeRepo.filterByType(["side dish"]);
    expect(filteredResults.length).to.equal(3);
  });

  it('should be able to filter by multiple tags', function() {
    let filteredResults = recipeRepo.filterByType(["side dish", "main course"]);
    let testResults = [recipeRepo.cookBook[1], recipeRepo.cookBook[3], recipeRepo.cookBook[4], recipeRepo.cookBook[5]];
    expect(filteredResults).to.deep.equal(testResults);
  });

  it('should be able to search for a matching string in name', function() {
    let searchResults = recipeRepo.searchRecipes('loaded');
    expect(searchResults).to.deep.equal([recipe]);
  });

  it('should be able to search to a matching string in ingredients', function() {
    let searchResults = recipeRepo.searchRecipes('egg');
    let testResults = [recipe, recipeRepo.cookBook[3], recipeRepo.cookBook[4], recipeRepo.cookBook[5]];
    expect(searchResults).to.deep.equal(testResults);
  });

  it('should be able to search to a matching string in ingredients', function() {
    let searchResults = recipeRepo.searchRecipes('poop');
    expect(searchResults).to.deep.equal([]);
  });

  it('should do nothing if no search parameter is given', function() {
    let searchResult = recipeRepo.searchRecipes()
    expect(searchResult).to.deep.equal(recipeRepo.cookBook);
  })

});
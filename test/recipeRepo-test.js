import { expect } from 'chai';
import RecipeRepo from '../src/recipeRepo';
import recipeData from '../src/data/recipe-data';
import ingredientsData from '../src/data/ingredient-data';

describe('recipeRepo', function() {
  let ingredients, recipeRepo, recipeRepo2, recipe, recipe1, recipe2;

  beforeEach(function() {
    recipeRepo = new RecipeRepo(recipeData);
    recipeRepo2 = new RecipeRepo();

    recipe = recipeData[0];
    recipe1 = recipeData[1]
    recipe2 = recipeData[2];
    ingredients = ingredientsData;
  });

  it('should be a function', function() {
    expect(RecipeRepo).to.be.a('function');
  });

  it('should be an instance of RecipeRepo', function() {
    expect(recipeRepo).to.be.an.instanceOf(RecipeRepo);
  })

  it('should have an array of recipes', function() {
    expect(recipeRepo.recipes).to.deep.equal(recipeData);
  })

  it('should be an empty array if no recipe data is given', function() {
    expect(recipeRepo2.recipes).to.deep.equal([]);
  })

  it('should be able to add recipes to favorite recipes', function() {
    recipeRepo.addRecipe(recipe1, 'userFavorites');   
    expect(recipeRepo.userFavorites[0]).to.deep.equal(recipe1);
  })

  it('should be able to add recipes to recipes2Cook', function() {
    recipeRepo.addRecipe(recipe, 'recipes2Cook');    
    expect(recipeRepo.recipes2Cook[0]).to.deep.equal(recipe);
  })

  it('should return an empty array if no argument is given', function() {
    recipeRepo.addRecipe();
    expect(recipeRepo.userFavorites).to.deep.equal([]);
  })

  it('should be able to add recipes to cook', function() {
    recipeRepo.addRecipe(recipe1, 'recipes2Cook');
    recipeRepo.addRecipe(recipe, 'recipes2Cook');   
    expect(recipeRepo.recipes2Cook).to.deep.equal([recipe1, recipe]);
  });

  it('should return an empty array if no argument is given', function() {
    recipeRepo.addRecipe();
    expect(recipeRepo.userFavorites).to.deep.equal([]);
  })

  it("should be able to remove a recipe", function() {
    recipeRepo.addRecipe(recipe, "recipes2Cook");
    recipeRepo.addRecipe(recipe1, "recipes2Cook");
    recipeRepo.addRecipe(recipe2, "recipes2Cook");
    recipeRepo.removeRecipe(recipe1, "recipes2Cook");
    expect(recipeRepo.recipes2Cook).to.deep.equal([recipe, recipe2]);
  });
  
  it("should not remove any recipes if no argument is given", function() {
    recipeRepo.addRecipe(recipe, "userFavorites");
    recipeRepo.addRecipe(recipe1, "userFavorites");
    recipeRepo.addRecipe(recipe2, "userFavorites");
    recipeRepo.removeRecipe();
    expect(recipeRepo.userFavorites).to.deep.equal([recipe, recipe1, recipe2]);
  })

  it('should be able to filter by a tag', function() {
    let filteredResults = recipeRepo.filterByType(["side dish"]);
    expect(filteredResults.length).to.equal(3);
  });

  it('should be able to filter by multiple tags', function() {
    let filteredResults = recipeRepo.filterByType(["side dish", "main course"]);
    let testResults = [recipeRepo.recipes[1], recipeRepo.recipes[3], recipeRepo.recipes[4], recipeRepo.recipes[5]];
    expect(filteredResults).to.deep.equal(testResults);
  });

  it('should be able to search for a matching string in name', function() {
    let searchResults = recipeRepo.searchRecipes('loaded', ingredients);
    expect(searchResults).to.deep.equal([recipe]);
  });

  it('should be able to search to a matching string in ingredients', function() {
    let searchResults = recipeRepo.searchRecipes('poop', ingredients);
    expect(searchResults).to.deep.equal([]);
  });

  it('should do nothing if no search parameter is given', function() {
    let searchResult = recipeRepo.searchRecipes()
    expect(searchResult).to.deep.equal(recipeRepo.recipes);
  });
});
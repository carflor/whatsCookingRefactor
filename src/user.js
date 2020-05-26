import RecipeRepo from '../src/RecipeRepo'

class User {
  constructor(user) {
    this.id = user.id;
    this.name = user.name;
    this.pantry = user.pantry;
    this.favoriteRecipes = new RecipeRepo(); 
    this.recipesToCook = new RecipeRepo();
  }

  // saveRecipe(recipe) {
  //   this.favoriteRecipes.push(recipe);
  // }

  // removeRecipe(recipe) {
  //   let i = this.favoriteRecipes.indexOf(recipe);
  //   this.favoriteRecipes.splice(i, 1);
  // }

  decideToCook(recipe) {
    this.recipesToCook.push(recipe);
  }
  
  // filterRecipes(type) {
  //   return this.favoriteRecipes.filter(recipe => recipe.type.includes(type));
  // }
}

export default User;

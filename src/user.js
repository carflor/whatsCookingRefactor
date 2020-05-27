import RecipeRepo from '../src/RecipeRepo'

class User {
  constructor(user) {
    this.id = user.id;
    this.name = user.name;
    this.pantry = user.pantry;
  }

  decideToCook(recipe) {
    this.recipesToCook.push(recipe);
  }
}

export default User;

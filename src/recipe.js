import ingredientsData from '../src/data/ingredient-data'

class Recipe {
  constructor(recipe) {
    this.id = recipe.id;
    this.name = recipe.name;
    this.image = recipe.image;
    this.tags = recipe.tags;
    this.ingredients = recipe.ingredients;
    this.instructions = recipe.instructions;
    this.isFavorite = false;
    // this.isCooked = false; 
  }

  calculateIngredientsCost() { 
    let ingredientsId = this.ingredients.map(ingredient => ingredient.id)

    return ingredientsData.filter(ingData => {
      return ingredientsId.includes(ingData.id);
    });
  }
}

export default Recipe;

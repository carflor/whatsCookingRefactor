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
  }

  calculateIngredientsCost() { 
    let ingredientsId = this.ingredients.map(ingredient => ingredient.id)

    return ingredientsData.filter(ingData => {
      return ingredientsId.includes(ingData.id);
    });
  }

  findIngredientNames(ingredientKey) {
    return this.ingredients.map(ingredient => {
      let name = ingredientKey.find(ing => ingredient.id === ing.id).name;
      ingredient.name = name
      return ingredient 
    })
  }
}

export default Recipe;

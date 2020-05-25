class Recipe {
  constructor(recipe) {
    this.id = recipe.id;
    this.name = recipe.name;
    this.image = recipe.image;
    this.tags = recipe.tags;
    this.ingredients = recipe.ingredients;
    this.instructions = recipe.instructions;
  }

  calculateIngredientsCost(ingredientData) {
    // return this.ingredients.map(i => {
    //   ingredientData.find(ingredient => ingredient === i);
    // });
  }
  //calculate ingredients missing
  // isCooked t/f
  // isFav t/f
  // fav and to cook are instances of recipeRepo
  
}

export default Recipe;

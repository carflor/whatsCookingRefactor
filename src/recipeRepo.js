import Recipe from './recipe'
class RecipeRepo {
  constructor(recipes) {
    this.recipes = recipes || [];
    this.userFavorites = [];
    this.recipes2Cook = [];
  }

  addRecipe(recipe, recipeGroup) {
    if (recipeGroup === 'userFavorites') {
      recipe.isFavorite = true;
      this[recipeGroup].push(recipe);
    } else if (recipeGroup === 'recipes2Cook') {
      this[recipeGroup].push(recipe);
    } else {
      return []
    }      
  }

  removeRecipe(recipe, recipeGroup) {
    if (!recipe) {
      return
    }
    if (recipeGroup === 'userFavorites') {
      recipe.isFavorite = false;
    } 
    if (recipeGroup === 'recipes2Cook') {
      recipe.isCooked = true;
    }
    const index = this[recipeGroup].indexOf(recipe)
    this[recipeGroup].splice(index, 1)
  }

  filterByType(tagNames) {
    let filtered = [];
    this.recipes.forEach(recipe => {
      tagNames.forEach(name => {
        if (recipe.tags.includes(name)) {
          filtered.push(recipe)
        } 
      })
    })
    return filtered
  }

  searchRecipes(str, ingredientKey) {
    if (!str) {
      return this.recipes
    }
    const filteredMeals = [];
    this.recipes.forEach(meal => {
      let mealName = meal.name.toLowerCase();
      if ((mealName.includes(str) && !filteredMeals.includes(meal))) {
        filteredMeals.push(meal)
      }
    })
    this.recipes.forEach(meal => { 
      meal = new Recipe(meal);
      let mealIngredients = meal
        .findIngredientNames(ingredientKey)
        .map(meal => meal.name)
        .join(' ').toLowerCase();
      if (mealIngredients.includes(str) && !filteredMeals.includes(meal)) {
        filteredMeals.push(meal)
      }
    })
    return filteredMeals
  }
}

export default RecipeRepo;

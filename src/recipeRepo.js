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
    }  
    this[recipeGroup].push(recipe);
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
    const index = recipeGroup.indexOf(recipe)
    return this[recipeGroup].splice(index, 1)
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

  searchRecipes(str) {
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
      meal = new Recipe (meal);
         
      let mealIngredients = meal.ingredients.map(ingredient => ingredient.name).join(' ').toLowerCase()
      // console.log(mealIngredients)
      if (mealIngredients.includes(str) && !filteredMeals.includes(meal)) {
        filteredMeals.push(meal)
      }
    })
    return filteredMeals
  }
}

export default RecipeRepo;

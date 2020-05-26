class RecipeRepo {
  constructor(recipes) {
    this.cookBook = (recipes) ? recipes : [];
  }

  addRecipe(recipe) {
   this.cookBook.push(recipe)
  };

  removeRecipe(recipe) {
    if (!recipe) {
      return
    }
    const index = this.cookBook.indexOf(recipe)
    return this.cookBook.splice(index, 1)
  }

  filterByType(tagNames) {
    let filtered = [];
    this.cookBook.forEach(recipe => {
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
      return this.cookBook
    }
    const filteredMeals = [];
    this.cookBook.forEach(meal => {
      let mealName = meal.name.toLowerCase()
      let mealIngredients = meal.ingredients.map(ingredient => ingredient.name).join(' ')
      if ((mealName.includes(str) || mealIngredients.includes(str)) && !filteredMeals.includes(meal)) {
        filteredMeals.push(meal)
      }
    })
    return filteredMeals
  }
};

export default RecipeRepo;

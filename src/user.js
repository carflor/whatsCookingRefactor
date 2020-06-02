class User {
  constructor(user) {
    this.id = user.id;
    this.name = user.name;
    this.pantry = user.pantry
  }

  checkAbility2Cook(recipe, counter) {
    if (counter === 0) return true
    let ingredient = this.pantry.find(item => item.ingredient === recipe.ingredients[counter - 1].id)
    if (!ingredient) return false
    if (ingredient) {
      (ingredient.amount >= recipe.ingredients[counter - 1].quantity.amount) ?
        this.checkAbility2Cook(recipe, (counter - 1 )) : false
    }
    return true   
  }

  cookRecipe(recipe) {
    if(this.checkAbility2Cook(recipe)) {
      recipe.ingredients.map( ingredient => {
        let index = this.pantry.findIndex( ing => ing.ingredient === ingredient.id) 
        this.pantry[index].amount -= ingredient.quantity.amount
      })
    }
  }

  findRequiredIngredients(recipe) {
    if (!this.checkAbility2Cook(recipe)) {
      let missingIngs = recipe.ingredients.reduce((acc, ingredient) => {
        const index = this.pantry.findIndex( ing => ing.ingredient === ingredient.id)
        let item = this.pantry[index]
        if (index === -1) {
          acc.push(ingredient)
        } else if (item.ingredient === ingredient.id && item.amount < ingredient.quantity.amount) {
          ingredient.quantity.amount -= item.amount;
          acc.push(ingredient)
        }
        return acc;
      }, [])
      return missingIngs
    }
  }
}

export default User;























import RecipeRepo from '../src/RecipeRepo'

class User {
  constructor(user) {
    this.id = user.id;
    this.name = user.name;
    this.pantry = user.pantry
  }

  checkAbility2Cook(recipe) {
    let recipeDeets = [];
    recipe.ingredients.forEach(ingredient => {
      this.pantry.forEach(item => {
        if(item.ingredient === ingredient.id && item.amount >= ingredient.quantity.amount) {
          recipeDeets.push(ingredient)
        }
      })
    })
    return (recipeDeets.length === recipe.ingredients.length)
  }

  cookRecipe(recipe) {
    if(this.checkAbility2Cook(recipe)) {
      recipe.ingredients.forEach( ingredient => {
        let index = this.pantry.findIndex( ing => ing.ingredient === ingredient.id) 
        this.pantry[index].amount -= ingredient.quantity.amount
      })
    }
  }
    // if user is able to cook recipe, it should subtract the required recipe 
    // ingredients from user pantry 
    // other wise it should return the missing ingredients
  // }

  findRequiredIngredients(recipe) {
    // if user cannot cook recipe, this should find the required ingredients the user
    //  needs to add to their pantry in order to cook recipe
    // compare pantry to ingredients on id
    // return missing ingredients
    if(!this.checkAbility2Cook(recipe)) {
      recipe.ingredients.filter(ingredient => {
        //console.log(this.pantry.id, 'pantry');
        //console.log(ingredient)
        //return this.pantry.includes(ingredient.id)
      })
    }
  }
}

export default User;

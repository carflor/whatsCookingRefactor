class User {
  constructor(user) {
    this.id = user.id;
    this.name = user.name;
    this.pantry = user.pantry
  }

  checkAbility2Cook(recipe) {
    const availableIngs = recipe.ingredients.reduce((acc, ingredient) => {
      let userIng = this.pantry.find(ing => ing.ingredient === ingredient.id)
      if(userIng && userIng.amount >= ingredient.quantity.amount) {
        acc.push(ingredient);
      }
      return acc
    } ,[])
    return (availableIngs.length === recipe.ingredients.length)
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























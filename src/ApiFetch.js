class ApiFetch {
  constructor() {
    this.rootUrl = "https://fe-apps.herokuapp.com/api/v1/whats-cookin/1911"
  }

  getUsersData() {
    let url = `${this.rootUrl}/users/wcUsersData`
    return fetch(url).then(response => response.json())
  }

  getIngredientsData() {
    let url = `${this.rootUrl}/ingredients/ingredientsData`
    return fetch(url).then(response => response.json())
  }

  getRecipesData() {
    let url = `${this.rootUrl}/recipes/recipeData`
    return fetch(url).then(response => response.json())
  }

  postIngredientsData(ingredientObj) {
    let url = `${this.rootUrl}/users/wcUsersData`;
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(ingredientObj),
    })
      .then(response => console.log(response.json()))
      .catch(err => console.log(err.message));
  }
}

export default ApiFetch;
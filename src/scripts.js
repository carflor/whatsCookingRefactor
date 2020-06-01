import './css/base.scss'
import './css/styles.scss';
import User from './user';
import Recipe from './recipe';
import RecipeRepo from './recipeRepo';
import ApiFetch from './ApiFetch';
import domUpdates from './domUpdates'
import './images/apple-logo-outline.png'
import './images/apple-logo.png'
import './images/chicken-parm.jpg'
import './images/cookbook.png'
import './images/green-apples.jpg'
import './images/pancakes.jpg'
import './images/search.png'
import './images/seasoning.png'
import './images/cooking-icon-300x300.png'
import './images/cooking-icon-outline.png'

let api = new ApiFetch();
let user;
let pantryInfo = [];
let recipeRepo;
let recipes;
let allIngredients;

let allRecipesBtn = document.querySelector(".show-all-btn");
let filterBtn = document.querySelector(".filter-btn");
let fullRecipeInfo = document.querySelector(".recipe-instructions");
let main = document.querySelector("main");
let pantryBtn = document.querySelector(".my-pantry-btn");
let savedRecipesBtn = document.querySelector(".saved-recipes-btn");
let showPantryRecipes = document.querySelector(".show-pantry-recipes-btn");
let tagList = document.querySelector(".tag-list");
let menuDropdown = document.querySelector(".drop-menu");
let searchBar = document.querySelector(".search-bar")

//POST EVENT LISTENER AND QUERY SELECTOR
let postForm = document.querySelector(".add-ingredients-btn")
postForm.addEventListener("click", function() {
  domUpdates.displayIngredientForm()
  let submitBtn = document.querySelector(".submit-btn")
  submitBtn.addEventListener("click", function() {
    postIngredient(user)
  })
});


// ON CLICK EVENTS
allRecipesBtn.addEventListener("click", function() {
  domUpdates.showAllRecipes(recipes, main)
});
filterBtn.addEventListener("click", function() {
  domUpdates.findCheckedBoxes(recipes, main)
});
main.addEventListener("click", function() {
  domUpdates.manageCardStatus(event, fullRecipeInfo, recipeRepo, allIngredients)
});
pantryBtn.addEventListener("click", function() {
  domUpdates.toggleMenu(menuDropdown)
});
savedRecipesBtn.addEventListener("click", function() {
  domUpdates.showFavoriteRecipes(recipeRepo.userFavorites, main)
});
showPantryRecipes.addEventListener("click", findCheckedPantryBoxes);
searchBar.addEventListener('keyup', searchMeals);

// DATA FETCH
const fetchData = () => {
  let userData = api.getUsersData()
  let ingredientsData = api.getIngredientsData()
  const recipesData = api.getRecipesData();
  
  Promise.all([userData, ingredientsData, recipesData])
    .then(dataSet => dataSet = {
      usersData: dataSet[0].wcUsersData,
      ingredientsData: dataSet[1].ingredientsData,
      recipeData: dataSet[2].recipeData, 
    }).then(dataSet => {
      generateUser(dataSet.usersData, dataSet.ingredientsData);
      createCards(dataSet.recipeData);
      findTags(dataSet.recipeData);
    })
    .catch(error => console.log(error.message))
}

// GENERATE A USER ON LOAD
function generateUser(users, ingredients) {
  // user = new User(users[Math.floor(Math.random() * users.length)]);
  user = new User(users[1])
  allIngredients = ingredients;
  findPantryInfo(user);
  domUpdates.createUserDisplay(user);
}

// CREATE RECIPE CARDS
function createCards(recipeData) {
  recipeRepo = new RecipeRepo(recipeData);
  recipes = recipeRepo.recipes;
  instantiateCards(recipes);
}

function instantiateCards(allRecipes) {
  allRecipes.forEach(singleRecipe => {
    let recipe = new Recipe(singleRecipe, allIngredients) 
    let counter = recipe.ingredients.length
    domUpdates.addToDom(recipe, main, user.checkAbility2Cook(recipe, counter))
  });
}

// FILTER BY RECIPE TAGS
function findTags(recipeData) {
  let tags = [];
  recipeData.forEach(recipe => {
    recipe.tags.forEach(tag => {
      if (!tags.includes(tag)) {
        tags.push(tag);
      }
    });
  });
  tags.sort();
  domUpdates.listTags(tags, tagList);
}

// CREATE AND USE PANTRY
function findPantryInfo(user) {
  user.pantry.forEach(ingredient => {
    let ingredientInfo = allIngredients.find(ing => {
      return ing.id === ingredient.ingredient;
    });
    let originalIngredient = pantryInfo.find(ing => {
      if (ingredientInfo) {
        return ing.name === ingredientInfo.name;
      }
    });
    if (ingredientInfo && originalIngredient) {
      originalIngredient.count = ingredient.amount;
    } else if (ingredientInfo) {
      pantryInfo.push({name: ingredientInfo.name, count: ingredient.amount});
    }
  });
  domUpdates.displayPantryInfo(pantryInfo.sort((a, b) => a.name.localeCompare(b.name)));
}

function findCheckedPantryBoxes() {
  let pantryCheckboxes = document.querySelectorAll(".pantry-checkbox");
  let pantryCheckboxInfo = Array.from(pantryCheckboxes)
  let selectedIngredients = pantryCheckboxInfo.filter(box => {
    return box.checked;
  })
  domUpdates.showAllRecipes(recipes);
  if (selectedIngredients.length > 0) {
    findRecipesWithCheckedIngredients(selectedIngredients);
  }
}

function findRecipesWithCheckedIngredients(selected) {
  let recipeChecker = (arr, target) => target.every(v => arr.includes(v));
  let ingredientNames = selected.map(item => {
    return item.id;
  })
  recipes.forEach(recipe => {
    let allRecipeIngredients = [];
    recipe.ingredients.forEach(ingredient => {
      allRecipeIngredients.push(ingredient.name);
    });
    if (!recipeChecker(allRecipeIngredients, ingredientNames)) {
      let domRecipe = document.getElementById(`${recipe.id}`);
      domRecipe.style.display = "none";
    }
  })
}

function searchMeals(event) {
  const searchValue = event.target.value.toLowerCase();
  main.innerHTML = " ";
  let searchResults = recipeRepo.searchRecipes(searchValue)
  searchResults.forEach(recipe => {
    domUpdates.addToDom(recipe, main)
  })
}

function postIngredient(user) {
  let ingName = document.getElementById('ingredient').value 
  let ingredient = allIngredients.find(ing => ing.name === ingName)
  let ingQuantity = Number(document.getElementById('ingredient-quantity').value)
  let findUser = (userData) => userData.find(oldU => oldU.id === user.id)
  
  if (ingredient && typeof ingQuantity === 'number') {
    let ingredientObj = {
      "userID": user.id,
      "ingredientID": ingredient.id,
      "ingredientModification": ingQuantity,
    }

    api.postIngredientsData(ingredientObj)
      .then(() => api.getUsersData())
      .then(response => findUser(response.wcUsersData))
      .then(response => findPantryInfo(response))
      .catch(error => console.log(error))

    document.forms[0].reset();
  }
}


fetchData()

export default { generateUser }
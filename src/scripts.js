import './css/base.scss';
import './css/styles.scss';

import User from './user';
import Recipe from './recipe';
import ApiFetch from './ApiFetch'
import domUpdates from './domUpdates'

import './images/apple-logo-outline.png'
import './images/apple-logo.png'
import './images/chicken-parm.jpg'
import './images/cookbook.png'
import './images/green-apples.jpg'
import './images/pancakes.jpg'
import './images/search.png'
import './images/seasoning.png'

let api = new ApiFetch();

const fetchData = () => {
  let userData = api.getUsersData()
  let ingredientsData = api.getIngredientsData()
  const recipesData = api.getRecipesData();
  
  Promise.all([userData, ingredientsData, recipesData])
    .then(dataSet => dataSet = {
      usersData: dataSet[0].wcUsersData,
      ingredientsData: dataSet[1].ingredientsData,
      recipesData: dataSet[2].recipeData, 
    }).then(dataSet => {
      generateUser(dataSet.usersData, dataSet.ingredientsData);
      createCards(dataSet.recipesData);
      findTags(dataSet.recipesData);
    })
    .catch(error => console.log(error.message))
  }
  


let user;
let pantryInfo = [];
let recipes = [];


let allRecipesBtn = document.querySelector(".show-all-btn");
let filterBtn = document.querySelector(".filter-btn");
let fullRecipeInfo = document.querySelector(".recipe-instructions");
let main = document.querySelector("main");
let pantryBtn = document.querySelector(".my-pantry-btn");
let savedRecipesBtn = document.querySelector(".saved-recipes-btn");
let showPantryRecipes = document.querySelector(".show-pantry-recipes-btn");
let tagList = document.querySelector(".tag-list");
var menuDropdown = document.querySelector(".drop-menu");


// ON CLICK EVENTS
allRecipesBtn.addEventListener("click", function() {
  domUpdates.showAllRecipes(recipes)
});
filterBtn.addEventListener("click", function() {
  domUpdates.findCheckedBoxes(recipes)
});
main.addEventListener("click", function() {
  domUpdates.addToMyRecipes(event, fullRecipeInfo, recipes, user)
});
pantryBtn.addEventListener("click", function() {
  domUpdates.toggleMenu(menuDropdown)
});
savedRecipesBtn.addEventListener("click", showSavedRecipes);
showPantryRecipes.addEventListener("click", findCheckedPantryBoxes);

// GENERATE A USER ON LOAD
function generateUser(users, ingredients) {
  user = new User(users[Math.floor(Math.random() * users.length)]);
  findPantryInfo(ingredients);
  domUpdates.createUserDisplay(user);
}

// CREATE RECIPE CARDS
function createCards(recipeData) {
  recipeData.forEach(recipe => {
    let recipeInfo = new Recipe(recipe);
    let shortRecipeName = recipeInfo.name;
    recipes.push(recipeInfo);
    if (recipeInfo.name.length > 40) {
      shortRecipeName = recipeInfo.name.substring(0, 40) + "...";
    }
    domUpdates.addToDom(recipeInfo, shortRecipeName, main)
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


// FAVORITE RECIPE FUNCTIONALITY

function showSavedRecipes() {
  let unsavedRecipes = recipes.filter(recipe => {
    return !user.favoriteRecipes.includes(recipe.id);
  });
  unsavedRecipes.forEach(recipe => {
    let domRecipe = document.getElementById(`${recipe.id}`);
    domRecipe.style.display = "none";
  });
  domUpdates.showMyRecipesBanner();
}


// CREATE AND USE PANTRY
function findPantryInfo(ingredientData) {
  user.pantry.forEach(ingredient => {
    let ingredientInfo = ingredientData.find(ing => {
      return ing.id === ingredient.ingredient;
    });
    let originalIngredient = pantryInfo.find(ing => {
      if (ingredientInfo) {
        return ing.name === ingredientInfo.name;
      }
    });
    if (ingredientInfo && originalIngredient) {
      originalIngredient.count += ingredient.amount;
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
// ADDED FETCH AT BOTTOM 
fetchData()
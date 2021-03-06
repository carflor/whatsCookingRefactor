import Recipe from './recipe.js'

const domUpdates = {
  createUserDisplay(user) {
    let firstName = user.name.split(" ")[0];
    let welcomeMsg = `
      <section class="welcome-msg">
        <h1>Welcome ${firstName}!</h1>
      </section>`;
    document.querySelector(".banner-image").insertAdjacentHTML("afterbegin", welcomeMsg);
  },

  addToDom(recipeInfo, element, boolean) {
    let shortRecipeName = this.createShortRecipeName(recipeInfo);
    let cardHtml = `
    <section class="recipe-card" id=${recipeInfo.id} tabindex="0">
      <h3 maxlength="40">${shortRecipeName}</h3>
      <section class="card-photo-container">
        <img src=${recipeInfo.image} class="card-photo-preview" alt="${recipeInfo.name} recipe" title="${recipeInfo.name} recipe">
        <section class="text">
          <section>Click for Instructions</section>
        </section>
      </section>
      <h4>${recipeInfo.tags[0]}</h4>
      <img src=${this.checkFavoriteStatus(recipeInfo)} alt="unfilled apple icon" class="card-apple-icon">
      <img src=${this.choosePotDisplay(boolean)} alt="pot for ingredients" class="ingredient-pot-icon">
    </section>`
    element.insertAdjacentHTML("beforeend", cardHtml);
  },
  
  createShortRecipeName(recipe) {
    return (recipe.name.length > 40) ? 
      recipe.name.substring(0, 40) + "..." : recipe.name;
  },

  checkFavoriteStatus(recipe) {
    return (recipe.isFavorite) ? "../images/apple-logo.png" : "../images/apple-logo-outline.png";
  },

  choosePotDisplay(boolean) {   
    return (boolean) ? "./images/cooking-icon-300x300.png" : "./images/cooking-icon-outline.png";
  },

  listTags(allTags, element) {
    allTags.forEach(tag => {
      let tagHtml = `<li><input type="checkbox" class="checked-tag" id="${tag}">
        <label for="${tag}">${this.capitalize(tag)}</label></li>`;
      element.insertAdjacentHTML("beforeend", tagHtml);
    });
  },
  
  capitalize(words) {
    return words.split(" ").map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(" ");
  },

  showAllRecipes(allRecipes, element) {
    element.innerHTML = '';
    allRecipes.forEach(recipe => {
      this.addToDom(recipe, element)
    });
    this.showWelcomeBanner();
  },

  showWelcomeBanner() {
    let welcomeBanner = document.querySelector(".welcome-msg");
    if (welcomeBanner) {
      welcomeBanner.style.display = "flex";
      document.querySelector(".my-recipes-banner").style.display = "none";
    } else {
      document.querySelector(".my-recipes-banner").style.display = "none";
    }
  },

  showMyRecipesBanner() {
    document.querySelector(".welcome-msg").style.display = "none";
    document.querySelector(".my-recipes-banner").style.display = "block";
  },

  findCheckedBoxes(recipes, element) {
    let tagCheckboxes = document.querySelectorAll(".checked-tag");
    let checkboxInfo = Array.from(tagCheckboxes)
    let selectedTags = checkboxInfo.filter(box => {
      return box.checked;
    })
    this.findTaggedRecipes(selectedTags, recipes, element);
  },

  findTaggedRecipes(selected, recipes, element) {
    let filteredResults = [];
    selected.forEach(tag => {
      let allRecipes = recipes.filter(recipe => {
        return recipe.tags.includes(tag.id);
      });
      allRecipes.forEach(recipe => {
        if (!filteredResults.includes(recipe)) {
          filteredResults.push(recipe);
        }
      })
    });
    this.showAllRecipes(recipes, element);
    if (filteredResults.length > 0) {
      this.filterRecipes(recipes, filteredResults);
    }
  },

  filterRecipes(recipes, filtered) {
    let foundRecipes = recipes.filter(recipe => {
      return !filtered.includes(recipe);
    });
    this.hideUnselectedRecipes(foundRecipes)
  },
  
  hideUnselectedRecipes(foundRecipes) {
    foundRecipes.forEach(recipe => {
      let domRecipe = document.getElementById(`${recipe.id}`);
      domRecipe.style.display = "none";
    });
  },

  generateIngredients(recipe, ingredientKey) {
    recipe = new Recipe(recipe);
    return recipe.findIngredientNames(ingredientKey).map(ing => 
      `${this.capitalize(ing.name)} (${ing.quantity.amount} ${ing.quantity.unit})`
    ).join(', ')
  },

  openRecipeInfo(event, element, recipeRepo, ingredientKey) {
    let recipeId = parseInt(event.target.closest(".recipe-card").id);
    element.style.display = "inline";
    let recipe = recipeRepo.recipes.find(recipe => recipe.id === recipeId)
    this.generateRecipeTitle(recipe, this.generateIngredients(recipe, ingredientKey), element);
    this.generateInstructions(recipe, element);
    element.insertAdjacentHTML("beforebegin", "<section class='overlay'></section>");
  },
  
  generateRecipeTitle(recipe, ingredients, element) {
    let recipeTitle = `
    <button id="exit-recipe-btn">X</button>
    <h3 id="recipe-title" style= "background-image:url(${recipe.image})">${recipe.name}</h3>
    <h4>Ingredients</h4>
    <p>${ingredients}</p>`
    element.insertAdjacentHTML("beforeend", recipeTitle);
  },

  generateInstructions(recipe, element) {
    let instructionsList = "";
    let instructions = recipe.instructions.map(i => {
      return i.instruction;
    });
    instructions.forEach(i => {
      instructionsList += `<li>${i}</li>`
    });
    element.insertAdjacentHTML("beforeend", "<h4>Instructions</h4>");
    element.insertAdjacentHTML("beforeend", `<ol>${instructionsList}</ol>`);
  },

  manageCardStatus(event, element, recipeRepo, ingredientKey) {
    if (event.target.className === "card-apple-icon") {
      this.toggleAppleIcon(event, recipeRepo)
    } else if (event.target.id === "exit-recipe-btn") {
      this.exitRecipe(element); 
    } else {
      this.openRecipeInfo(event, element, recipeRepo, ingredientKey);  
    }
  },

  toggleAppleIcon(event, allRecipes) {
    let recipeId = parseInt(event.target.closest(".recipe-card").id);
    let matchedRecipe = allRecipes.recipes.find( recipe => recipe.id === recipeId);
    
    if (!matchedRecipe.isFavorite) {
      allRecipes.addRecipe(matchedRecipe, 'userFavorites');
      event.target.src = "../images/apple-logo.png";
    } else {
      event.target.src = "../images/apple-logo-outline.png";
      allRecipes.removeRecipe(matchedRecipe, 'userFavorites');
    }
  },

  exitRecipe(element) {
    while (element.firstChild &&
    element.removeChild(element.firstChild)) {
      element.style.display = "none";
      document.querySelector(".overlay").remove();
    }
  },

  toggleMenu(menu) {
    if (menu.classList.value.includes('hidden')) {
      menu.classList.remove("hidden");
    } else {
      menu.classList.add("hidden");
    }
  },

  displayPantryInfo(pantry) {
    let pantryList = document.querySelector(".pantry-list");
    pantryList.innerHTML = '';
    pantry.forEach(ingredient => {
      let ingredientHtml = `<li><input type="checkbox" class="pantry-checkbox" id="${ingredient.name}">
        <label for="${ingredient.name}">${ingredient.name}, ${ingredient.count}</label></li>`;
      pantryList.insertAdjacentHTML("beforeend",
        ingredientHtml);
    });
  },

  showFavoriteRecipes(favorites, element) {
    element.innerHTML = '';
    favorites.forEach(recipe => {
      this.addToDom(recipe, element) 
    })
    this.showMyRecipesBanner();
  }
};

export default domUpdates;

import user from './scripts'

const domUpdates = {
  createUserDisplay(user) {
    let firstName = user.name.split(" ")[0];
    let welcomeMsg = `
      <div class="welcome-msg">
        <h1>Welcome ${firstName}!</h1>
      </div>`;
    document.querySelector(".banner-image").insertAdjacentHTML("afterbegin",
      welcomeMsg);
  },

  addToDom(recipeInfo, element, boolean) {
    let shortRecipeName = this.createShortRecipeName(recipeInfo);
    let cardHtml = `
    <div class="recipe-card" id=${recipeInfo.id}>
    <h3 maxlength="40">${shortRecipeName}</h3>
    <div class="card-photo-container">
    <img src=${recipeInfo.image} class="card-photo-preview" alt="${recipeInfo.name} recipe" title="${recipeInfo.name} recipe">
    <div class="text">
    <div>Click for Instructions</div>
    </div>
    </div>
    <h4>${recipeInfo.tags[0]}</h4>
    <img src=${this.checkFavoriteStatus(recipeInfo)} alt="unfilled apple icon" class="card-apple-icon">
    <img src=${this.choosePotDisplay(boolean)} alt="pot for ingredients" class="ingredient-pot-icon">
    </div>`
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
    if (document.querySelector(".welcome-msg")) {
      document.querySelector(".welcome-msg").style.display = "flex";
      document.querySelector(".my-recipes-banner").style.display = "none";
    } else {
      document.querySelector(".my-recipes-banner").style.display = "none";
    }
  },

  showMyRecipesBanner() {
    document.querySelector(".welcome-msg").style.display = "none";
    document.querySelector(".my-recipes-banner").style.display = "block";
  },

  findCheckedBoxes(recipes) {
    let tagCheckboxes = document.querySelectorAll(".checked-tag");
    let checkboxInfo = Array.from(tagCheckboxes)
    let selectedTags = checkboxInfo.filter(box => {
      return box.checked;
    })
    this.findTaggedRecipes(selectedTags, recipes);
  },

  findTaggedRecipes(selected, recipes) {
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
    this.showAllRecipes(recipes);
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

  generateIngredients(recipe) {
    return recipe.ingredients.map(i => {
      return `${this.capitalize(recipe.name)} (${i.quantity.amount} ${i.quantity.unit})`
    }).join(", ");
  },

  openRecipeInfo(event, element, recipeRepo) {
    let recipeId = parseInt(event.target.closest(".recipe-card").id);
    element.style.display = "inline";
    let recipe = recipeRepo.recipes.find(recipe => recipe.id == recipeId)
    this.generateRecipeTitle(recipe, this.generateIngredients(recipe), element);
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

  manageCardStatus(event, element, recipeRepo) {
    if (event.target.className === "card-apple-icon") {
      this.toggleAppleIcon(event, recipeRepo)
    } else if (event.target.id === "exit-recipe-btn") {
      this.exitRecipe(element); 
    } else {
      this.openRecipeInfo(event, element, recipeRepo);  
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
    element.removeChild(element.firstChild));
    element.style.display = "none";
    document.querySelector(".overlay").remove();
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
  },

  displayIngredientForm() {
    const pantryForm = 
    `<section class="pantry-form">
      <form class="ing-form "method="post">
        <h4>Add Ingredients Here</h4>
        <section class="container">
        <label for="ingredient">Ingredient</label>
        <input id="ingredient" type="ingredient" name="ingredient" value=""></input>
        </section>
        <section class="container">
        <label for="quantity">Quantity</label>
        <input id="ingredient-quantity" type="number" name="ingredient-quantity" min="0" max="100"></input>
        </section>
        <section class="container">
        <button class="submit-btn" type="button" name="submit">Submit</button>
        <button class="back-button" type="button" name="button">Back</button>
        </section>
      </form>
    </section>`
    document.querySelector('.add-ingredients-btn').insertAdjacentHTML('afterend', pantryForm)
  },
};

export default domUpdates;

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

  addToDom(recipeInfo, shortRecipeName, element) {
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
      <img src="../images/apple-logo-outline.png" alt="unfilled apple icon" class="card-apple-icon">
    </div>`
    element.insertAdjacentHTML("beforeend", cardHtml);
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

  showAllRecipes(allRecipes) {
    allRecipes.forEach(recipe => {
      let domRecipe = document.getElementById(`${recipe.id}`);
      domRecipe.style.display = "block";
    });
    this.showWelcomeBanner(allRecipes);
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
    return recipe && recipe.ingredients.map(i => {
      return `${this.capitalize(recipe.name)} (${i.quantity.amount} ${i.quantity.unit})`
    }).join(", ");
  },

  openRecipeInfo(recipeId, element, recipes) {
    element.style.display = "inline";
    let recipe = recipes.find(recipe => recipe.id == recipeId)
    this.generateRecipeTitle(recipe, this.generateIngredients(recipe), element);
    this.addRecipeImage(recipe);
    this.generateInstructions(recipe, element);
    element.insertAdjacentHTML("beforebegin", "<section id='overlay'></div>");
  },


  generateRecipeTitle(recipe, ingredients, element) {
    let recipeTitle = `
      <button id="exit-recipe-btn">X</button>
      <h3 id="recipe-title">${recipe.name}</h3>
      <h4>Ingredients</h4>
      <p>${ingredients}</p>`
    element.insertAdjacentHTML("beforeend", recipeTitle);
  },

  addRecipeImage(recipe) {
    document.getElementById("recipe-title").style.backgroundImage = `url(${recipe.image})`;
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

  isDescendant(parent, child) {
    let node = child;
    while (node !== null) {
      if (node === parent) {
        return true;
      }
      node = node.parentNode;
    }
    return false;
  },

  addToMyRecipes(event, element, recipes, user) {

    if (event.target.className === "card-apple-icon") {
      this.toggleAppleIcon(event, user)
    } else if (event.target.id === "exit-recipe-btn") {
      this.exitRecipe(element); 
    } else if (this.isDescendant(event.target.closest(".recipe-card"), event.target)) {
      let recipeId = event.target.closest(".recipe-card").id
      this.openRecipeInfo(recipeId, element, recipes);  
    }
  },

  toggleAppleIcon(event, user) {
    let cardId = parseInt(event.target.closest(".recipe-card").id)
    if (!user.favoriteRecipes.cookBook.includes(cardId)) {
      event.target.src = "../images/apple-logo.png";
      user.favoriteRecipes.addRecipe(cardId);
    } else {
      event.target.src = "../images/apple-logo-outline.png";
      user.favoriteRecipes.removeRecipe(cardId);
    }
  },

  exitRecipe(element) {
    while (element.firstChild &&
      element.removeChild(element.firstChild));
    element.style.display = "none";
    document.getElementById("overlay").remove();
  },

  toggleMenu(menu) {
    if (menu.classList.value.includes('hidden')) {
      menu.classList.remove("hidden");
    } else {
      menu.classList.add("hidden");
    }
  },

  displayPantryInfo(pantry) {
    pantry.forEach(ingredient => {
      let ingredientHtml = `<li><input type="checkbox" class="pantry-checkbox" id="${ingredient.name}">
        <label for="${ingredient.name}">${ingredient.name}, ${ingredient.count}</label></li>`;
      document.querySelector(".pantry-list").insertAdjacentHTML("beforeend",
        ingredientHtml);
    });
  }
};

export default domUpdates
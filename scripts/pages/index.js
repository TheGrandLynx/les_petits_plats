let  currentRecipes;
//fonction pour récupérer les données de recettes contenues dans le fichier json
async function getRecipes() {
    
    const promesse = await fetch('/data/recipes.json');
    const wRecipes = await promesse.json();
    //on ajoute dans les données les champs qui seront recherchés en minuscule
    wRecipes.forEach(recipe => {
        recipe.nameMin = recipe.name.toLowerCase()
        recipe.ingredientsMin = recipe.ingredients.map(function(wIngredient) {
            return {
                "ingredient": wIngredient.ingredient.toLowerCase(),
                "quantity": wIngredient.quantity,
                "unit": wIngredient.unit
                };
            
          });
        recipe.ustensilsMin = recipe.ustensils.map(wUstensils => wUstensils.toLowerCase())
        recipe.descriptionMin = recipe.description.toLowerCase();
        recipe.applianceMin = recipe.appliance.toLowerCase();
    })
    return (wRecipes)
}

//afficher les éléments DOM en fonction des données du fichier json
async function displayRecipes(currentRecipes) {
    const sectionRecipes = document.querySelector(".sectionCardRecettes");
    let globalArrayIngredient = [];
    let globalArrayUstensils = [];
    let globalArrayAppliance = [];
    //pour chaque recette récupérée, on crée sa card et on récupère ingrédients, ustensiles et appareils
     currentRecipes.forEach((recipe) => {
        const recipeModel = recipeFactory(recipe);
        const recipeCardDOM = recipeModel.getRecipeCardDOM();
        sectionRecipes.appendChild(recipeCardDOM);
        globalArrayIngredient.push(recipeModel.getTagsIngredients());
        globalArrayUstensils.push(recipeModel.getTagsUstensils());
        globalArrayAppliance.push(recipeModel.getTagsAppliance());
    }); 
    populateTagList(globalArrayIngredient, 'Ingredients');
    populateTagList(globalArrayUstensils, 'Ustensiles');
    populateTagList(globalArrayAppliance, 'Appareils');
    populateTagDom(globalArrayIngredient);
}

//ajout du listener sur la barre de recherche
function addEventListeners(){
    const searchBar = document.querySelector('.searchRechercherRecette');
    searchBar.addEventListener("keyup", function(){
        updateRecettes();
        updateListTags();
    })
}

async function init(){
    currentRecipes = await getRecipes();
    displayRecipes(currentRecipes);
    addEventListeners();
}

init();
let  currentRecipes;
async function getRecipes() {
    
    const promesse = await fetch('/data/recipes.json');
    const wRecipes = await promesse.json();
    //const photographers = wPhotographers['photographers'];
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
    console.log(wRecipes)
    //console.log({wRecipes: [...wRecipes]})
    return (wRecipes)

    //const wRecipes = recipes.json();
    
    //return ({wRecipes: [...wRecipes]})
}

async function displayRecipes(currentRecipes) {
    //console.log(currentRecipes)
    const sectionRecipes = document.querySelector(".sectionCardRecettes");
    const wRecipesFactory = recipeFactory(currentRecipes);
    let globalArrayIngredient = [];
    let globalArrayUstensils = [];
    let globalArrayAppliance = [];
     currentRecipes.forEach((recipe) => {
        const recipeModel = recipeFactory(recipe);
        const recipeCardDOM = recipeModel.getRecipeCardDOM();
        sectionRecipes.appendChild(recipeCardDOM);
        globalArrayIngredient.push(recipeModel.getTagsIngredients());
        globalArrayUstensils.push(recipeModel.getTagsUstensils());
        globalArrayAppliance.push(recipeModel.getTagsAppliance());
    }); 
    populateIngredientList(globalArrayIngredient, 'Ingrédients');
    populateIngredientList(globalArrayUstensils, 'Ustensiles');
    populateIngredientList(globalArrayAppliance, 'Appareils');
    //console.log(globalArrayIngredient)
    populateTagDom(globalArrayIngredient);
}

function addEventListeners(){
    const searchBar = document.querySelector('.searchRechercherRecette');
    searchBar.addEventListener("keyup", function(){
        rechercherRecette();
        updateListTags();
    })
}
function test2(){
    rechercherRecette();
}
async function init(){
    currentRecipes = await getRecipes();
    displayRecipes(currentRecipes);
    addEventListeners();
}

init();
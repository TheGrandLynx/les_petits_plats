
async function getRecipes() {
    
    const promesse = await fetch('/data/recipes.json');
    const wRecipes = await promesse.json();
    //const photographers = wPhotographers['photographers'];
    console.log(wRecipes)
    //console.log({wRecipes: [...wRecipes]})
    return (wRecipes)

    //const wRecipes = recipes.json();
    
    //return ({wRecipes: [...wRecipes]})
}

async function displayRecipes(currentRecipes) {
    //console.log(currentRecipes)
    const sectionRecipes = document.querySelector(".sectionCardRecettes");
    const wRecipesFactory = recipeFactory(currentRecipes)
    
     currentRecipes.forEach((recipe) => {
        const recipeModel = recipeFactory(recipe);
        const recipeCardDOM = recipeModel.getRecipeCardDOM();
        sectionRecipes.appendChild(recipeCardDOM);
    }); 
}

async function init(){
    console.log(await getRecipes())
    const currentRecipes = await getRecipes();
    console.log(currentRecipes)
    displayRecipes(currentRecipes);
}

init();
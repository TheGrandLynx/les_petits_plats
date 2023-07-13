let arrayRecettesAffiches = [];

//filtrer les recettes à afficher en fonction du texte tapé dans la barre de recherche
function rechercherRecette(){
    const searchBar = document.querySelector('.searchRechercherRecette');
    let strTexteRecherche = searchBar.value;
    strTexteRecherche = strTexteRecherche.toLowerCase();
    let wArrayRecettesAffiches = [];
    if(strTexteRecherche.length > 2){
        for(t=0; t < arrayRecettesAffiches.length ; t++){
            strTitle = arrayRecettesAffiches[t].nameMin;
            strDescription = arrayRecettesAffiches[t].descriptionMin;
            strIngredients = arrayRecettesAffiches[t].ingredientsMin;
            if(strTitle.includes(strTexteRecherche) || strDescription.includes(strTexteRecherche) || isIncludedIn(strTexteRecherche, strIngredients, true)){
                
                wArrayRecettesAffiches.push(arrayRecettesAffiches[t]);
            }
        }
        arrayRecettesAffiches = wArrayRecettesAffiches;
        }
        noRecipe(strTexteRecherche);
}

//afficher les cards correspondants aux recettes à afficher
function updateArticles(){
    let articles = document.querySelectorAll('.cardRecette');
    const wArticles = [...articles];
    wArticles.map(article => {if(arrayRecettesAffiches.map(({ id }) => `card${id}`).includes(article.id)){
                                article.classList.remove('disparition')}
                                else{
                                    article.classList.add('disparition')
                                }
                            })
    
}

//filtrer les recettes à afficher en fonction des tags
function rechercherRecetteTag(){
    let wArrayRecettesAffiches;
    if(tagAffiches.length>0){
             wArrayRecettesAffiches = currentRecipes;
             if(tagAffiches.filter(tag => tag[1] ==  'Ingredients').length>0){
             tagAffiches.filter(tag => tag[1] ==  'Ingredients').map(tag => tag[2]).forEach(tag =>
                 wArrayRecettesAffiches = wArrayRecettesAffiches.filter(recette => recette.ingredientsMin.map(ing => ing.ingredient).flat(1).includes(tag)))
             }
             if(tagAffiches.filter(tag => tag[1] ==  'Ustensiles').length>0){
                 tagAffiches.filter(tag => tag[1] ==  'Ustensiles').map(tag => tag[2]).forEach(tag =>
                     wArrayRecettesAffiches = wArrayRecettesAffiches.filter(recette => recette.ustensilsMin.flat(1).includes(tag)))
                 }
                 if(tagAffiches.filter(tag => tag[1] ==  'Appareils').length>0){
                     tagAffiches.filter(tag => tag[1] ==  'Appareils').map(tag => tag[2]).forEach(tag =>
                         wArrayRecettesAffiches = wArrayRecettesAffiches.filter(recette => tag.includes(recette['appliance'].toLowerCase())))
                     }
     
     }else{
         wArrayRecettesAffiches = currentRecipes;
     }
     arrayRecettesAffiches = wArrayRecettesAffiches;
}

//rechercher si le texte tapé est présent dans les ingrédients d la recette
function isIncludedIn(wStringToSearch, wTab, isIngredient){
    for(j = 0; j < wTab.length; j++){
        if(isIngredient){
            if(wTab[j].ingredient.includes(wStringToSearch)){
                return true;
            }
        }
        else{
            if(wTab[j].includes(wStringToSearch)){
                return true;
            }
        }
        }   
    }

    /* function isIncludedIn(wStringToSearch, wTab, isIngredient){
                wTab.map(ing => ing.ingredient).forEach(ingredient => {
                    if(ingredient.includes(wStringToSearch)){
                    console.log(ingredient)
                    return true;
                }})
        } */

function tagIncluded(wTag, wTab){
    for(t = 0; t < wTab.length; t++){
        if(wTag.map(tag => tag[2]).includes(wTab[t].ingredient)){
            return true;
        }
    }
}

//afficher le message si aucune recette ne correspond à la recherche
function noRecipe(strTexteRecherche){
    const pNoRecipe = document.querySelector('.pRecetteAucune');
    if(arrayRecettesAffiches.length>0){
        pNoRecipe.classList.add('disparition');
    }else{
        pNoRecipe.innerHTML = `Aucune recette ne contient '${strTexteRecherche}'`;
        pNoRecipe.classList.remove('disparition');
    }
}

function updateRecettes(){
    rechercherRecetteTag();
    rechercherRecette();
    updateArticles();
}
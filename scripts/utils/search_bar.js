let arrayRecettesAffiches;

function rechercherRecette(){
    const searchBar = document.querySelector('.searchRechercherRecette');
    
    let wArrayRecettesAffiches;
    let strTexteRecherche = searchBar.value;
    //if(strTexteRecherche.length <= 2){return;}
    strTexteRecherche = strTexteRecherche.toLowerCase();
    let articles = document.querySelectorAll('.cardRecette');
    //console.log(articles)
    const wArticles = [...articles];
    //console.log(wArticles)
    /* arrayArticlesAffiches = wArticles.filter(article => article.getElementsByTagName('article')[0].getElementsByTagName('h2')[0].textContent.toLowerCase().includes(strTexteRecherche)
                                                        || article.getElementsByTagName('article')[0].getElementsByClassName('pRecette')[0].textContent.toLowerCase().includes(strTexteRecherche)
                                                        || isIncludedIn(strTexteRecherche, article.getElementsByTagName('article')[0].getElementsByTagName('h4')))
    arrayArticlesNonAffiches = wArticles.filter(article => !article.getElementsByTagName('article')[0].getElementsByTagName('h2')[0].textContent.toLowerCase().includes(strTexteRecherche)
                                                        && !article.getElementsByTagName('article')[0].getElementsByClassName('pRecette')[0].textContent.toLowerCase().includes(strTexteRecherche)
                                                        && !isIncludedIn(strTexteRecherche, article.getElementsByTagName('article')[0].getElementsByTagName('h4')))
    
    
    arrayArticlesAffiches.map(article => article.classList.remove('disparition'));
    arrayArticlesNonAffiches.map(article => article.classList.add('disparition')); */
    //console.log(currentRecipes)
    if(tagAffiches.length>0){
       /*  console.log(tagAffiches.filter(tag => tag[1] == 'Ingrédients')[0][2])
        wArrayRecettesAffiches = currentRecipes.filter(recette => tagIncluded(tagAffiches.filter(tag => tag[1] == 'Ingrédients'), recette['ingredients']) 
            
            ) */
            wArrayRecettesAffiches = currentRecipes;
            if(tagAffiches.filter(tag => tag[1] ==  'Ingrédients').length>0){
                console.log('ingredient')
            tagAffiches.filter(tag => tag[1] ==  'Ingrédients').map(tag => tag[2]).forEach(tag =>
                wArrayRecettesAffiches = wArrayRecettesAffiches.filter(recette => isIncludedIn(tag, recette['ingredients'], true)))
            }
            if(tagAffiches.filter(tag => tag[1] ==  'Ustensiles').length>0){
                console.log('ustensile')
                tagAffiches.filter(tag => tag[1] ==  'Ustensiles').map(tag => tag[2]).forEach(tag =>
                    wArrayRecettesAffiches = wArrayRecettesAffiches.filter(recette => isIncludedIn(tag, recette['ustensils'])))
                }
                if(tagAffiches.filter(tag => tag[1] ==  'Appareils').length>0){
                    console.log('appareils')
                    console.log(tagAffiches.filter(tag => tag[1] ==  'Appareils').map(tag => tag[2]))
                    tagAffiches.filter(tag => tag[1] ==  'Appareils').map(tag => tag[2]).forEach(tag =>
                        wArrayRecettesAffiches = wArrayRecettesAffiches.filter(recette => tag.includes(recette['appliance'])))
                    }
    
    }else{
        wArrayRecettesAffiches = currentRecipes;
    }
    if(strTexteRecherche.length > 2){
    arrayRecettesAffiches = wArrayRecettesAffiches.filter(recette => recette["nameMin"].includes(strTexteRecherche)
                                                             || recette["descriptionMin"].includes(strTexteRecherche)
                                                             || isIncludedIn(strTexteRecherche, recette["ingredientsMin"], true))
    }else{
        arrayRecettesAffiches = wArrayRecettesAffiches;
    }
                                                             //arrayRecettesNonAffiches = currentRecipes.filter(recette => !recette["name"].toLowerCase().includes(strTexteRecherche)
     //                                                        && !recette["description"].toLowerCase().includes(strTexteRecherche)
      //                                                       && !isIncludedIn(strTexteRecherche, recette["ingredients"]))
    
    console.log(arrayRecettesAffiches)
    //console.log(currentRecipes[0].ingredients[0].ingredient)
    //arrayRecettesAffiches = currentRecipes.filter(recette => recette.ingredients.ingredient.toLowerCase().includes(strTexteRecherche))
    //arrayRecettesAffiches = currentRecipes.filter(recette => isIncludedIn(strTexteRecherche, recette["ingredients"]))
    //arrayRecettesAffiches = currentRecipes.filter(recette => recette["ingredients"].flat(Infinity).includes(strTexteRecherche))
    //arrayRecettesAffiches = currentRecipes.filter(recette => test(recette["ingredients"]))
    //console.log(arrayRecettesAffiches)
    //console.log(arrayRecettesAffiches.map(({ id }) => id))
    //wArticles.map(article => article.id.includes(arrayRecettesAffiches.map(({ id }) => id)))
    
    
    wArticles.map(article => {if(arrayRecettesAffiches.map(({ id }) => `card${id}`).includes(article.id)){
                                article.classList.remove('disparition')}
                                else{
                                    article.classList.add('disparition')
                                }
                            })
    
}

function test(wTab){
    console.log(wTab)
    if(wTab.length > 4 ){
        return true;
    }
}

function isIncludedIn(wStringToSearch, wTab, isIngredient){
   /*  wTab.forEach(wIngredient => {
        //console.log(wIngredient["ingredient"])
        if(wIngredient["ingredient"].toLowerCase().includes(wStringToSearch)){
            console.log(wTab)
            console.log(wIngredient["ingredient"])
            console.log(true)
            return true;
        }
    }); */
    for(j = 0; j < wTab.length; j++){
        console.log(isIngredient)
        if(isIngredient){
            if(wTab[j].ingredient.includes(wStringToSearch)){
                return true;
            }
        }
        else{
            console.log(wTab[j])
            if(wTab[j].includes(wStringToSearch)){
                return true;
            }
        }
        }   
    }


function tagIncluded(wTag, wTab){
    for(t = 0; t < wTab.length; t++){
        console.log(wTag.map(tag=> tag[2]))
        console.log(wTab[t][0])
        //console.log(wTag.map(tag => tag[0][2]))
        if(wTag.map(tag => tag[2]).includes(wTab[t].ingredient)){
            return true;
        }
    }
}
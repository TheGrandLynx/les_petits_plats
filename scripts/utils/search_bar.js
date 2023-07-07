let arrayRecettesAffiches = [];

function rechercherRecette(){
    const searchBar = document.querySelector('.searchRechercherRecette');
    let strTexteRecherche = searchBar.value;
    if(strTexteRecherche.length < 2 ){return;}
    strTexteRecherche = strTexteRecherche.toLowerCase();
    let articles = document.querySelectorAll('.cardRecette');
    let wArrayRecettesAffiches = [];
    arrayRecettesAffiches.length = 0;
    console.log(currentRecipes)

    

    for(t=0; t < currentRecipes.length ; t++){
        strTitle = currentRecipes[t].nameMin;
        strDescription = currentRecipes[t].descriptionMin;
        strIngredients = currentRecipes[t].ingredientsMin;
        if(strTitle.includes(strTexteRecherche) || strDescription.includes(strTexteRecherche) || isIncludedIn(strTexteRecherche, strIngredients)){
            wArrayRecettesAffiches.push(currentRecipes[t])
        }

    }

    if(tagAffiches.length>0){
        /*  console.log(tagAffiches.filter(tag => tag[1] == 'Ingrédients')[0][2])
         wArrayRecettesAffiches = currentRecipes.filter(recette => tagIncluded(tagAffiches.filter(tag => tag[1] == 'Ingrédients'), recette['ingredients']) 
             
             ) */
             //wArrayRecettesAffiches = currentRecipes;
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

    arrayRecettesAffiches = wArrayRecettesAffiches
    console.log(arrayRecettesAffiches)
    loop: for(i = 0; i < articles.length; i++){
        console.log(articles[i])
        for(z=0; z<arrayRecettesAffiches.length; z++){
            if(articles[i].id == `card${arrayRecettesAffiches[z].id}`){
                console.log(`card${arrayRecettesAffiches[z].id}`)
                articles[i].classList.remove('disparition');
                continue loop;
            }else{

                articles[i].classList.add('disparition');
            }
        }
    }
}

function isIncludedIn(wStringToSearch, wTab){
    for(j = 0; j < wTab.length; j++){
            if(wTab[j].ingredient.includes(wStringToSearch)){
                return true;
            }
        }
    
}
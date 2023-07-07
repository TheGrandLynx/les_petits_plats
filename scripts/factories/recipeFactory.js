function recipeFactory(data) {
    const { id, image, name, servings, ingredients, time, description, appliance, ustensils } = data;
    const picture = `assets/images/${image}`;
    /* let ingredientsMin;
    let ustensilsMin;
    let descriptionMin;
    let applianceMin;
    if(image != undefined){
    console.log(picture)
        let nameMin = name.toLowerCase();
        console.log(ingredients)
        ingredientsMin = ingredients.map(function(wIngredient) {
            return {
                "ingredient": wIngredient.ingredient.toLowerCase(),
                "quantity": wIngredient.quantity,
                "unit": wIngredient.unit
                };
            
          });
        ustensilsMin = ustensils.map(wUstensils => wUstensils.toLowerCase())
        descriptionMin = description.toLowerCase();
        applianceMin = appliance.toLowerCase();
    } */
    function getRecipeCardDOM() {
        const link = document.createElement('a');
        link.href = "#" ;
        link.setAttribute("id", `card${id}`);
        link.setAttribute("aria-label", `recette ${name}`);
        link.classList.add('cardRecette');
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.setAttribute("alt", `${name}`)
        const divImg = document.createElement('div');
        const spanTemps = document.createElement('span');
        spanTemps.innerText = `${time}min`;
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const h3Recette = document.createElement('h3');
        h3Recette.textContent = 'RECETTE';
        const pRecette = document.createElement('p');
        pRecette.classList.add('pRecette');
        pRecette.innerHTML = `${description}`
        const h3Ingredients = document.createElement('h3');
        h3Ingredients.textContent = 'INGRÉDIENTS';
        const divIngredients = document.createElement('div');
        divIngredients.classList.add('divIngredients');
        for(let i = 0; i < ingredients.length; i++){
            const divIngredient = document.createElement('div');
            const h4NomIngredient = document.createElement('h4');
            h4NomIngredient.textContent = `${ingredients[i].ingredient}`;
            const pIngredient = document.createElement('p');
            pIngredient.innerHTML = `${ingredients[i].quantity == undefined ? '' : ingredients[i].quantity} ${ingredients[i].unit  == undefined ? '' :  ingredients[i].unit}`;
            divIngredient.appendChild(h4NomIngredient);
            divIngredient.appendChild(pIngredient);
            divIngredients.appendChild(divIngredient);
        }
        const divCardPosition = document.createElement('div');
        divCardPosition.classList.add('divCardPosition');
        divImg.appendChild(spanTemps);
        divImg.appendChild(img);
        article.appendChild(divImg);
        divCardPosition.appendChild(h2);
        divCardPosition.appendChild(h3Recette);
        divCardPosition.appendChild(pRecette);
        divCardPosition.appendChild(h3Ingredients);
        divCardPosition.appendChild(divIngredients);
        article.appendChild(divCardPosition);
        link.appendChild(article);
        return (link);
    }

    function getTagsIngredients(){
        let arrayIngredient = [];
        ingredients.forEach(wIngredient => { 
            arrayIngredient.push(wIngredient.ingredient)
        });
        return(arrayIngredient);
    }
    function getTagsUstensils(){
        let arrayUstensils = [];
        ustensils.forEach(wUstensils => { 
            arrayUstensils.push(wUstensils)
        });
        return(arrayUstensils);
    }
    function getTagsAppliance(){
        let arrayAppliance = [];
            arrayAppliance.push(appliance)
        return(arrayAppliance);
    }

    return { id, image, name, servings, ingredients, time, description, appliance, ustensils, getRecipeCardDOM, getTagsIngredients, getTagsUstensils, getTagsAppliance}
}
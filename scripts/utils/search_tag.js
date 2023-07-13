let currentIngredients = [];
let currentAppareils;
let currentUstensils;
let tagAffiches = [];
let listTags = [];
const listType =  ['Ingredients', 'Appareils', 'Ustensiles']

//ajouter les différents listeners necessaires
function addClickListener(wContainer, wSearch, wType){
    wContainer.addEventListener('click', function(){
        wContainer.parentNode.classList.toggle('divContainerOptionActive');
        wContainer.children[1].classList.toggle('rotateImage');
    });
    wContainer.parentNode.addEventListener('focusout', function(event){
        if(!event.currentTarget.contains(event.relatedTarget)){
            wContainer.parentNode.classList.remove('divContainerOptionActive');
        }
    })
    wSearch.addEventListener("keyup", function(){
        rechercherTag(wSearch, wType);
    })
}

//retourne un tableau dans la liste des tags avec le nom du tag et le type de tag
function getTagsList(globalArrayTag, wType){
    let tagList = [];
    globalArrayTag.forEach(arrayTag => {
        arrayTag.forEach(tag => tagList.push([tag.toLowerCase(), wType]));
    });
    
    let wArray = arrayUnique(tagList);
    wArray.sort(function (a, b) {
        return a[0].localeCompare(b[0]);
    });
    return (wArray)
}


//Remplir la liste des tags disponibles pour ingrédients, appareils et ustensils
function populateTagList(globalArrayTag, wType){
    let wCurrentIngredients;
    wCurrentIngredients = getTagsList(globalArrayTag, wType);
    wCurrentIngredients.forEach(tag => currentIngredients.push(tag));
    wCurrentIngredients = currentIngredients.filter(tag => tag[1] == wType);
    const wListOptions = document.querySelectorAll('.listOptions');
    let listOptions;
    switch (wType) {
        case 'Ingredients':
        listOptions = wListOptions[0];
        break;
        case 'Appareils':
        listOptions = wListOptions[1];
        break;
        case 'Ustensiles':
        listOptions = wListOptions[2];
        break;
    }


    wCurrentIngredients.forEach(ingredient => {
        let li = document.createElement("li");
        li.setAttribute('id', `${wType}${ingredient[0].replace(/\s+/g, '')}`)
        li.innerText = ingredient[0];
        li.setAttribute("tabindex", `0`);
        li.addEventListener('click', function(e){
            addTag(ingredient[0], wType);
        })
        listOptions.appendChild(li);
    })
}

//retourne un tableau  avec les doublons supprimés
function arrayUnique(arr){
    var temp = ''
    var unique = arr.sort().filter(r => {
        if (r.join("") !== temp) {
          temp = r.join("")
          return true
        }
    })
    return (unique);
}

//rechercher et afficher les tags correspondants à la recherche
function rechercherTag(wSearchOption, wType){
    let wArrayLI = wSearchOption.parentNode.parentNode.getElementsByTagName('li');
    let arrayLI =  [...wArrayLI];
    let strTexteRecherche = wSearchOption.value;
    strTexteRecherche = strTexteRecherche.toLowerCase();
    wIngredients = currentIngredients.filter(ingredient => ingredient[0].toLowerCase().includes(strTexteRecherche))
    
    let wArrayRecettesAffiches;
    if(arrayRecettesAffiches.length>0 && wType != undefined){
        switch (wType){
        case 'Ingredients':
        wArrayRecettesAffiches = arrayRecettesAffiches.map(recette => recette.ingredientsMin.map(ingredient => ingredient.ingredient));
        break;
        case 'Appareils':
        wArrayRecettesAffiches = arrayRecettesAffiches.map(recette => recette.applianceMin);
            
        break;
        case 'Ustensiles':
        wArrayRecettesAffiches = arrayRecettesAffiches.map(recette => recette.ustensilsMin);
        break;
    }
        wArrayRecettesAffiches = wArrayRecettesAffiches.flat(1);
        wIngredients = wIngredients.filter(tag => wArrayRecettesAffiches.includes(tag[0]))
    }
    
     arrayLI.map(tag => {if(wIngredients.map((ingredient => `${wType}${ingredient[0].toLowerCase().replace(/\s+/g, '')}`)).includes(tag.id)){
        
        tag.classList.remove('disparition')}
        else{
            tag.classList.add('disparition')
        }
    })
}

//crée le dom du tag en fonction du type
function getTagDom(wIngredient, wType){
    const pTag = document.createElement('p');        
    pTag.innerHTML = `${wIngredient}`
    const imgTag = document.createElement('img')
    imgTag.setAttribute("src", '/assets/icon/cancel.svg')
    imgTag.setAttribute("alt", ``)
    imgTag.addEventListener('click', function(e){
        removeTag(wType+this.previousElementSibling.innerText);
    })
    const divTag = document.createElement('div');
    divTag.appendChild(pTag);
    divTag.appendChild(imgTag);
    divTag.classList.add('divTag');
    const divTagContainer = document.createElement('div');
    divTagContainer.classList.add('disparition');
    divTagContainer.classList.add('divTagContainer');
    divTagContainer.setAttribute('id', `tag${wType}${wIngredient.toLowerCase().replace(/\s+/g, '')}`)

    divTagContainer.appendChild(divTag);
    listTags.push(divTagContainer)
    return divTagContainer;
}

//crée la liste des dom tags et les ajoute dans la section tag
function populateTagDom(globalArrayIngredient, wType){
    
    //currentIngredients = getTagsList(globalArrayIngredient);
    const sectionTags = document.querySelector('.sectionTags');
    currentIngredients.forEach(ingredient =>
        sectionTags.appendChild(getTagDom(ingredient[0], ingredient[1]))
        )
}

//ajouter un tag à la liste des tags affichés et mettre à jour les élément des tags disponibles
function addTag(wTag, wType){
    tagAffiches.push([`tag${wType}${wTag}`, `${wType}`, wTag]);
    displayTag();
    updateRecettes();
    updateListTags()
    
}

//enlever un tag à la liste des tags affichés et mettre à jour les élément des tags disponibles
function removeTag(wTag){
    const wIndex = tagAffiches.indexOf(`tag${wTag}`);
    tagAffiches.splice(wIndex, 1);
    displayTag();
    updateRecettes();
    updateListTags();
}

//mettre à jour les tags disponibles en fonction des tags sélectionnés
function updateListTags(){
    const arraySearchOptions = document.querySelectorAll('.searchOption')
    
    for(i=0; i<arraySearchOptions.length; i++){
        rechercherTag(arraySearchOptions[i], listType[i]);

    }
}


//afficher un tag
function displayTag(){
    let wArrayTag = document.querySelectorAll('.divTagContainer');
    let arrayTag = [...wArrayTag];
    listTags.map(tag => {if(tagAffiches.map((ingredient => `${ingredient[0].replace(/\s+/g, '')}`)).includes(tag.id)){
        
        tag.classList.remove('disparition')}
        else{
        
            tag.classList.add('disparition')
        }
    })
}

function init(){
    const divContainer = document.querySelectorAll(".titreOption");
    const searchOption = document.querySelectorAll(".searchOption");
    
    
    for(i=0; i<divContainer.length; i++){
        addClickListener(divContainer[i], searchOption[i], listType[i]);
    }
    
}

init();


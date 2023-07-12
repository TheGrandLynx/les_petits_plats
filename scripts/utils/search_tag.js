let currentIngredients = [];
let currentAppareils;
let currentUstensils;
let tagAffiches = [];
let listTags = [];
function addClickListener(wContainer, wSearch){
    wContainer.addEventListener('click', function(){
        wContainer.parentNode.classList.toggle('divContainerOptionActive');
        wContainer.children[1].classList.toggle('rotateImage');
    });
    console.log(wContainer.parentNode)
    wContainer.parentNode.addEventListener('focusout', function(event){
        console.log(event.currentTarget)
        if(!event.currentTarget.contains(event.relatedTarget)){
            wContainer.parentNode.classList.remove('divContainerOptionActive');
        }
    })
    wSearch.addEventListener("keyup", function(){
        rechercherTag(wSearch);
    })
}

function getIngredientsList(globalArrayIngredient, wType){
    let ingredientList = [];
    globalArrayIngredient.forEach(arrayIngredient => {
        arrayIngredient.forEach(ingredient => ingredientList.push([ingredient, wType]));
    });
    
    console.log(ingredientList)
    let wArray = arrayUnique(ingredientList);
    console.log(ingredientList)
    wArray.sort(function (a, b) {
        return a[0].localeCompare(b[0]);
    });
    return (wArray)
}

function populateIngredientList(globalArrayIngredient, wType){
    let wCurrentIngredients;
    wCurrentIngredients = getIngredientsList(globalArrayIngredient, wType);
    wCurrentIngredients.forEach(tag => currentIngredients.push(tag));
    //currentIngredients.push(getIngredientsList(globalArrayIngredient, wType));
    console.log(currentIngredients)
    wCurrentIngredients = currentIngredients.filter(tag => tag[1] == wType);
    console.log(wCurrentIngredients)
    const wListOptions = document.querySelectorAll('.listOptions');
    let listOptions;
    switch (wType) {
        case 'Ingrédients':
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
        li.setAttribute('id', ingredient[0].toLowerCase().replace(/\s+/g, ''))
        li.innerText = ingredient[0];
        li.setAttribute("tabindex", `0`);
        li.addEventListener('click', function(e){
            addTag(ingredient[0], wType);
            console.log(tagAffiches)
        })
        listOptions.appendChild(li);
    })
}

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

function rechercherTag(wSearchOption, wType){
    console.log(wSearchOption)
    let wArrayLI = wSearchOption.parentNode.parentNode.getElementsByTagName('li');
    let arrayLI =  [...wArrayLI];
    console.log(arrayLI)
    let strTexteRecherche = wSearchOption.value;
    strTexteRecherche = strTexteRecherche.toLowerCase();
    wIngredients = currentIngredients.filter(ingredient => ingredient[0].toLowerCase().includes(strTexteRecherche))
    console.log(wIngredients)
    
    let wArrayRecettesAffiches;
    if(arrayRecettesAffiches.length>0){
        switch (wType){
        case 'Ingrédients':
        wArrayRecettesAffiches = arrayRecettesAffiches.map(recette => recette.ingredients.map(ingredient => ingredient.ingredient));
        break;
        case 'Appareils':
        wArrayRecettesAffiches = arrayRecettesAffiches.map(recette => recette.appliance);
            
        break;
        case 'Ustensiles':
        wArrayRecettesAffiches = arrayRecettesAffiches.map(recette => recette.ustensils);
        break;
    }
        
        wArrayRecettesAffiches = wArrayRecettesAffiches.flat(1);
        console.log(wArrayRecettesAffiches)
        wIngredients = wIngredients.filter(tag => wArrayRecettesAffiches.includes(tag[0]))
    }
    
    console.log(wIngredients)
    console.log(wIngredients.map((ingredient => ingredient[0].replace(/\s+/g, ''))))
    arrayLI.map(tag => {if(wIngredients.map((ingredient => ingredient[0].toLowerCase().replace(/\s+/g, ''))).includes(tag.id)){
        console.log('app')
        tag.classList.remove('disparition')}
        else{
            console.log('disp')
            tag.classList.add('disparition')
        }
    })
}

function getTagDom(wIngredient){
    const pTag = document.createElement('p');        
    pTag.innerHTML = `${wIngredient}`
    const imgTag = document.createElement('img')
    imgTag.setAttribute("src", '/assets/icon/cancel.svg')
    imgTag.setAttribute("alt", ``)
    imgTag.addEventListener('click', function(e){
        //console.log(this.previousElementSibling.innerText)
        removeTag(this.previousElementSibling.innerText);
        //console.log(tagAffiches)
    })
    const divTag = document.createElement('div');
    divTag.appendChild(pTag);
    divTag.appendChild(imgTag);
    divTag.classList.add('divTag');
    const divTagContainer = document.createElement('div');
    divTagContainer.classList.add('disparition');
    divTagContainer.classList.add('divTagContainer');
    divTagContainer.setAttribute('id', `tag${wIngredient.toLowerCase().replace(/\s+/g, '')}`)

    divTagContainer.appendChild(divTag);
    listTags.push(divTagContainer)
    return divTagContainer;
}

function populateTagDom(globalArrayIngredient, wType){
    
    //currentIngredients = getIngredientsList(globalArrayIngredient);
    const sectionTags = document.querySelector('.sectionTags');
    console.log(currentIngredients)
    currentIngredients.forEach(ingredient =>
        sectionTags.appendChild(getTagDom(ingredient[0]))
        )
        console.log("listTags")
        console.log(listTags)
}

function addTag(wTag, wType){
    tagAffiches.push([`tag${wTag}`, `${wType}`, wTag]);
    displayTag();
    updateRecettes();
    updateListTags()
    
}

function removeTag(wTag){
    const wIndex = tagAffiches.indexOf(`tag${wTag}`);
    console.log('index'+wIndex)
    //console.log(tagAffiches)
    //console.log(tagAffiches[wIndex])
    tagAffiches.splice(wIndex, 1);
    displayTag();
    updateRecettes();
    updateListTags();
}

function updateListTags(){
    const arraySearchOptions = document.querySelectorAll('.searchOption')
    const listType =  ['Ingrédients', 'Appareils', 'Ustensiles']
    for(i=0; i<arraySearchOptions.length; i++){
        rechercherTag(arraySearchOptions[i], listType[i]);

    }
}

function displayTag(){
    let wArrayTag = document.querySelectorAll('divTagContainer');
    let arrayTag = [...wArrayTag];
    console.log(arrayTag)
    console.log(tagAffiches)
    listTags.map(tag => {if(tagAffiches.map((ingredient => ingredient[0].toLowerCase().replace(/\s+/g, ''))).includes(tag.id)){
        tag.classList.remove('disparition')}
        else{
            tag.classList.add('disparition')
        }
    })
}

function init(){
    const divContainer = document.querySelectorAll(".titreOption");
    const searchOption = document.querySelectorAll(".searchOption");
    
    console.log(divContainer.length)
    for(i=0; i<divContainer.length; i++){
        console.log(i)
        addClickListener(divContainer[i], searchOption[i]);
    }
    
}

init();


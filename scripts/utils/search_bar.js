function rechercherRecette(){
    const searchBar = document.querySelector('.searchRechercherRecette');
    let strTexteRecherche = searchBar.value;
    if(strTexteRecherche.length < 2 ){return;}
    strTexteRecherche = strTexteRecherche.toLowerCase();
    let articles = document.querySelectorAll('.cardRecette');
    for(i = 0; i < articles.length; i++){
        let strTitle = articles[i].getElementsByTagName('article')[0].getElementsByTagName('h2')[0].textContent;
        strTitle = strTitle.toLowerCase();
        let strDescription = articles[i].getElementsByTagName('article')[0].getElementsByClassName('pRecette')[0].textContent;
        strDescription = strDescription.toLowerCase();
        let strIngredients = articles[i].getElementsByTagName('article')[0].getElementsByTagName('h4');
        if(strTitle.includes(strTexteRecherche) || strDescription.includes(strTexteRecherche) || isIncludedIn(strTexteRecherche, strIngredients)){
            articles[i].classList.remove('disparition');
        }else{
            
            articles[i].classList.add('disparition');
        }
    }
}

function isIncludedIn(wStringToSearch, wTab){
    for(j = 0; j < wTab.length; j++){
            if(wTab[j].textContent.toLowerCase().includes(wStringToSearch)){
                return true;
            }
        }
    
}
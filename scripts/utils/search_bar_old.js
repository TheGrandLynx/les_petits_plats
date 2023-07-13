function rechercherRecetteold(){
    const searchBar = document.querySelector('.searchRechercherRecette');
    let strTexteRecherche = searchBar.value;
    if(strTexteRecherche.length < 2){return;}
    strTexteRecherche = strTexteRecherche.toLowerCase();
    let articles = document.querySelectorAll('.cardRecette');
    //console.log(articles)
    const wArticles = [...articles];
    console.log(wArticles)
    arrayArticlesAffiches = wArticles.filter(article => article.getElementsByTagName('article')[0].getElementsByTagName('h2')[0].textContent.toLowerCase().includes(strTexteRecherche)
                                                        || article.getElementsByTagName('article')[0].getElementsByClassName('pRecette')[0].textContent.toLowerCase().includes(strTexteRecherche)
                                                        || isIncludedIn(strTexteRecherche, article.getElementsByTagName('article')[0].getElementsByTagName('h4')))
    arrayArticlesNonAffiches = wArticles.filter(article => !article.getElementsByTagName('article')[0].getElementsByTagName('h2')[0].textContent.toLowerCase().includes(strTexteRecherche)
                                                        && !article.getElementsByTagName('article')[0].getElementsByClassName('pRecette')[0].textContent.toLowerCase().includes(strTexteRecherche)
                                                        && !isIncludedIn(strTexteRecherche, article.getElementsByTagName('article')[0].getElementsByTagName('h4')))
    arrayArticlesAffiches.map(article => article.classList.remove('disparition'));
    arrayArticlesNonAffiches.map(article => article.classList.add('disparition'));
    
}

function isIncludedIn(wStringToSearch, wTab){
    for(j = 0; j < wTab.length; j++){
            if(wTab[j].textContent.toLowerCase().includes(wStringToSearch)){
                return true;
            }
        }
    
}
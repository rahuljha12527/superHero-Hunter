const url = "https://www.superheroapi.com/api.php/1644433292405040";
const searchBox=document.querySelector("#search");

const searchResultContainer=document.getElementById('search-results-container');

//key change

loadEventListner();
function loadEventListner(){
    searchBox.addEventListener('keyup',handleSearch);
}    

async function handleEnter(){

    let data=await fetchAsync(`${url}/search/${name}`);
    
    if(data.response==='success'){
        console.log(data);
        let path=`${window.location.pathname} + /../superhero.html#=${data.results[0].id}`;
        window.open(path);
    }
}

async function handleSearch(e){
    let name=e.target.value;
    console.log("name",name);

    if(e.keyCode===13 && name.length>0){
        handleEnter();
    }

    if(name.length===0){
        await clearResults();
    }
    else{
      
        let data=await fetchAsync(`${url}/search/${name}`);
        if(data && data.response===success){
            
            searchResultContainer.innerHTML='';
            let favs=getfavs();
            
            for(let i=0;i<data.results.length;i++){
                let item=document.createElement('div');
                item.className='search-item';
                item.setAttribute('id',`${data.results[i].id}`);

                let label=document.createElement('div');
                label.innerHTML=data.results[i].name;
                label.addEventListener("click",viewHeroPage);
                item.appendChild(label);
    

                 let option=document.createElement('div');
                  if(favs.includes(data.results[i].id)){
                      option.innerHTML="Remove From favourite";
                      option.addEventListener('click',removeFromFavoutite);
                  }
                  else{
                      option.innerHTML="Add to favourite";
                      option.addEventListener('click',addToFavourites);
                  }

                  item.appendChild(option);
                  searchResultContainer.appendChild(item);
            }
           

        }else{
            await clearResults();
        }
    }
}

async function addToFavourites(e){
    let id=e.target.parentElement.id;
    let favs=getfavs();
    if(!favs.includes(id)){
        favs.push(id);
    }
    localStorage.setItem('favHeros',JSON.stringify(favs));
    e.target.innerHTML='Remove from favourites';
    e.target.removeEventListener('click',addToFavourites);
    e.target.addEventListener('click',removeFromFavoutite);
}


async function removeFromFavoutite(){
    let id=e.target.parentElement.id;
    let favs=getfavs();

    let updatedFavs=favs.filter(function(val){
        return val!=id;
    })

    localStorage.setItem('favHeros',JSON.stringify(updatedFavs));
    e.target.innerHTML='Add To Favourite';
    e.target.removeEventListener('click',removeFromFavoutite);
    e.target.addEventListener('click',addToFavourites);
}

async function viewHeroPage(){
    let path=`${window.location.pathname} + /../superhero.html#id=${e.target.parentElement.id}`;
    window.open(path);
}
async function fetchAsync(url){
    try{
        let response=await fetch(url);
        let data=await response.json();

        return data;
    }catch(err){
        await clearResults();
    }
}

async function getfavs(){
    let favs;
    if(localStorage.getItem('favHeros')===null){
        favs=[];
    }
    else{
        favs=JSON.parse(localStorage.getItem('favHeros'));

    }

    return favs;
}
async function clearResults(){
    let i=searchResultContainer.childNodes.length;
    while(i--){
        searchResultContainer.removeChild(searchResultContainer.lastChild);
    }
}



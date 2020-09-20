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
        if(data && data.response==success){
            
        }
    }
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

async function clearResults(){
    let i=searchResultContainer.childNodes.length;
    while(i--){
        searchResultContainer.removeChild(searchResultContainer.lastChild);
    }
}



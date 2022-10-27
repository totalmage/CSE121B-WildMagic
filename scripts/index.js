let spellList = []
const api = 'https://www.dnd5eapi.co'

// Practically the main method
async function getSpells(){
    reset();
    showLoading();
    newURL = api + generate_URL();
    const response = await fetch(newURL);
    let data;
    if (response.ok) {
        data = await response.json();
    }
    getSpellInfos(data.results);
    
}

// Creates a URL to fetch from depending on what the user selected
function generate_URL(){
    let filter = document.getElementById('level').value;
    let suffix = '/api/spells'
    
    if(filter == '1-3'){
        suffix = '/api/spells?level=1&level=2&level=3'
    }
    
    else if(filter == '4-6'){
        suffix = '/api/spells?level=4&level=5&level=6'
        
    }

    else if(filter == '7-9'){
        suffix = '/api/spells?level=7&level=8&level=9'
    }
    return suffix;
}
    
//The API returns urls to get more info on the spells so I get the details with this method
async function getSpellInfos(array_spells){
    let urls = array_spells.map(spell => api+spell.url);
    let response;
    let spell;
    for(let i = 0; i < urls.length; i++){
        response = await fetch(urls[i]);
        if (response.ok) {
            spell = await response.json();
            spellList.push(spell);
        }
    }
    let spell_select = randSpell(spellList);
    showSpell(spell_select);
}

// Displays the spell with details on the webpage
function showSpell(spell){
    console.log('done!');
    reset();
    const mainDiv = document.getElementById('spell');

    const spellDiv = document.createElement("div");
    spellDiv.setAttribute("id", "spell-content");

    const name = document.createElement("h2");
    name.textContent = spell.name;

    const level = document.createElement("p");
    level.setAttribute("id", 'spell-level');
    level.textContent = "Level: " +spell.level;

    const desc = document.createElement("p");
    desc.setAttribute("id", "desc");
    desc.textContent = spell.desc;

    mainDiv.appendChild(spellDiv);
    spellDiv.appendChild(name);
    spellDiv.appendChild(level);
    spellDiv.appendChild(desc);
}

// Empties the place where the spell is displayed
function reset(){
    spellHolder = document.getElementById("spell");
    
    let first = spellHolder.firstElementChild;
    while (first) {
        first.remove();
        first = spellHolder.firstElementChild;
    }
}

// Chooses a random element from the array of spells
function randSpell(spells){
    let spell = spells[Math.floor(Math.random()*spells.length)];
    return spell;
}

// A purely cosmetic indicator that fetching is taking place
function showLoading(){
    console.log('Loading');
    const loading = document.createElement("div");
    loading.setAttribute('id', 'load-div');

    const load_text = document.createElement('p');
    load_text.textContent = 'Loading. Please wait...';
    loading.appendChild(load_text);

    const d20 = document.createElement("img");
    d20.setAttribute('src', './images/d20.webp');
    d20.setAttribute('id', 'load-img');

    loading.appendChild(d20);

    const mainDiv = document.getElementById('spell');

    mainDiv.appendChild(loading);    
}

//Activate the activity upon clicking the button
document.getElementById('submit').addEventListener('click', getSpells);
const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 30
const limit = 10
let offset = 0;

var url_string = window.location.href;
var url = new URL(url_string);
const id = url.searchParams.get("pok"); 

function convertPokemonToLi(pokemon) {
    return `
        
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <a href="index.html?pok=${pokemon.number}">
            <span class="name">${pokemon.name}</span>

            
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                    <img src="${pokemon.photo}"
                        alt="${pokemon.name}">
            </div>
            </a>
        </li>
    `
}

function convertPokemonHtml(pokemon) {
    return `
            <li class="pokemon default">
            <span class="number">#${pokemon.number}</span>
            <a href="index.html?pok=${pokemon.number}">
            <span class="name">${pokemon.name}</span>

            
            <div class="detail">
                    <img src="${pokemon.photo}"
                        alt="${pokemon.name}">
            </div>
            </a>
        </li>
    `
}


function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

function loadPokemon(id) {
    pokeApi.getPokemons(offset, 150).then((pokemons = []) => {
        //const newHtml = pokemons.map(convertPokemonHtml).join('')
        const newHtml2 = convertPokemonHtml(pokemons[id-1])
        pokemonList.innerHTML += newHtml2
    })
}



  id ? loadPokemon(id) : loadPokemonItens(offset, limit)



loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})
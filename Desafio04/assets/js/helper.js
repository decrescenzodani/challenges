export const getPokemonOptions = (pokeApi, selectPokemon) => {
    $.ajax({
        url: pokeApi,
        type: "GET",
        success: function (response) {
            console.log(response)
            response.results.forEach(element => {
                selectPokemon.append(`
                    <option class="text-capitalize" value="${element.url}">${element.name}</option>
                `)
            });
    
        }
    })
}

export const verifyIfPokemonExist = (currentPokemonList, response) => {
    const pokemonExist = currentPokemonList.find(function (element) {
        console.log(element.name)
        return element.name == response.name
    })
    return pokemonExist
}

export const updatePokemonList = (currentPokemonList, currentPokemon) => {
    const newListPokemon = currentPokemonList.filter(function(item){
        return item.name != currentPokemon
    })
    return newListPokemon
}
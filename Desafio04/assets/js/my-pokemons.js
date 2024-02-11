import { updatePokemonList } from "./helper.js";

const currentPokemonList = JSON.parse(localStorage.getItem("pokemonList"));
console.log(currentPokemonList)
/* o json.parse transforma tudo que estiver em formato string pro seu formato original. Porque o que retorna do
localstorage.getItem é uma string gigante contendo tudo que foi salvo ali. Ou seja
se tu salvou 1.000 itens, de forma individual, todos estes 1.000 itens serao encapsulado dentro de uma unica string. */

const cards = $("div#cards")


currentPokemonList.map(element => {
    const card = `<div class="p-3 grid-card bg-white rounded-4 border border-dark border-1 shadow-card">
    <div class="ratio ratio-1x1 mb-2 w-75 mx-auto">
        <img class="w-100 rounded-4" src="${element.sprites}" alt="">
    </div>
    <div class="card-body">
        <div class="card-content-active-text mb-4 d-flex justify-content-between align-items-center">
            <h4 class="fs-2 fw-bold text-capitalize">${element.name}</h4>
            <img class="pokeball" src="./assets/images/pokeball-close.png" alt="">
        </div>
            <div class="mb-2 row">
                <p class="mb-1 fw-bold col-12">Abilities</p>
                ${element.abilities.map(function (item) {
        return `<span class="col-6 text-uppercase texts-results"> ${item}</span>`
    }).join("")}
            </div>
            <hr>
            <div class="mb-2 row">
                <p class="mb-1 fw-bold col-12">Stats</p>
                ${element.stats.map(function (item) {
        return `<p class="col-6 mb-0"> <span id="stats" class="fw-semibold text-uppercase">${item.stats_name}</span>: ${item.stats_value}</p>`
    }).join("")}
            </div>
            <hr>
            <div class="mb-2 row">
                <p class="mb-1 fw-bold col-12">Types</p>
                ${element.types.map(function (item) {
        return `<span class="col-6 text-uppercase texts-results"> ${item}</span>`
    }).join("")/*O ".join" é referente ao separador que vem junto com os eles. Nesta caso era uma virgula
            quando eu coloquei ("") eu disse para apagar essa virgula.*/ }
            </div>
    </div>
    
</div>`
    cards.append(card)
})

const pokeballElement = $("img.pokeball")

pokeballElement.on("click", function (e) {
    const target = $(e.currentTarget)
    console.log(target.prev().html())

    const currentPokemon = target.prev().html()
    const newListPokemon = updatePokemonList(currentPokemonList, currentPokemon)

    console.log(newListPokemon)
    localStorage.setItem("pokemonList", JSON.stringify([...newListPokemon]))
    location.reload()
})
import { getPokemonOptions, verifyIfPokemonExist } from "./helper.js";

const cards = $("div#cards")
const pokeApi = "https://pokeapi.co/api/v2/pokemon?limit=151&offset=0"
const selectPokemon = $("select#select-pokemon")

const currentPokemonList = JSON.parse(localStorage.getItem("pokemonList"));
console.log(currentPokemonList)

const listPokemon = currentPokemonList != null ? currentPokemonList : []

getPokemonOptions(pokeApi, selectPokemon)

selectPokemon.on("change", function (e) {
    $.ajax({
        url: e.currentTarget.value,
        type: "GET",
        success: function (response) {
            console.log(response)

            let pokeball = ""
            const pokemonExist = verifyIfPokemonExist(currentPokemonList, response)
            if (pokemonExist) {
                pokeball = "./assets/images/pokeball-close.png"
            } else {
                pokeball = "./assets/images/pokeball-open.png"
            }
            cards.html(`
                <div class="p-3 col-12 col-lg-4 bg-white rounded-4 border border-dark border-1 shadow-card">
                    <div class="ratio ratio-1x1 mb-2 w-75 mx-auto">
                        <img class="w-100 rounded-4" src="${response.sprites.other.dream_world.front_default}" alt="">
                    </div>
                    <div class="card-body">
                        <div class="card-content-active-text mb-4 d-flex justify-content-between align-items-center">
                            <h4 class="fs-2 fw-bold text-capitalize">${response.name}</h4>
                            <img class="pokeball" src="${pokeball}" alt="">
                        </div>
                            <div class="mb-2 row">
                                <p class="mb-1 fw-bold col-12">Abilities</p>
                                ${response.abilities.map(function (element) {
                return `<span class="col-6 text-uppercase texts-results"> ${element.ability.name}</span>`
            }).join("")}
                            </div>
                            <hr>
                            <div class="mb-2 row">
                                <p class="mb-1 fw-bold col-12">Stats</p>
                                ${response.stats.map(function (element) {
                return `<p class="col-6 mb-0"> <span id="stats" class="fw-semibold text-uppercase">${element.stat.name}</span>: ${element.base_stat}</p>`
            }).join("")}
                            </div>
                            <hr>
                            <div class="mb-2 row">
                                <p class="mb-1 fw-bold col-12">Types</p>
                                ${response.types.map(function (element) {
                return `<span class="col-6 text-uppercase texts-results"> ${element.type.name}</span>`
            }).join("")/*O ".join" é referente ao separador que vem junto com os eles. Nesta caso era uma virgula
                            quando eu coloquei ("") eu disse para apagar essa virgula.*/ }
                            </div>
                    </div>
                    
                </div>
            `)
            const pokeballElement = $("img.pokeball")

            pokeballElement.on("click", function (e) {
                const target = $(e.currentTarget)
                
                /* seu eu utilizar somente o ".attr" ele vai pegar o valor do elemento que eu passar entre ().
                Se eu passar dois valores, como eu fiz acima, ele vai settar o valor do elemento mencionado, com o que eu coloquei
                como segundo paramentro. */

                const currentNamePokemon = target.prev().html()
                const pokemonExist = currentPokemonList.find(function (item) {
                    return item.name === currentNamePokemon
                })
                /* O ".prev()" vai pegar o primeiro irmao anterior ao elemento ao qual foi relacionado.
                Exemplo: na const currentNamePokemon, eu adicionei o metodo .prev() a variavel TARGET, criada anteriormente.
                Ou seja, neste caso em questao, eu queria pegar o primeiro irmao anterior do elemento contido dentro da varialvel
                target. Adicionei o .html() pois eu queria o texto dentro do elemento que eu selecionei com o .prev().*/

                if(pokemonExist){
                    const newListPokemon = currentPokemonList.filter(function(item){
                        return item.name != currentNamePokemon /* o ".filter" ele filtra o array em base ao paramentro que eu passar,
                        e cria um novo array EXCLUINDO tudo que for false no meu if. Ou seja, ele executa um filtro inverso,
                        tipo: se no array ele encontrar um valor igual ao que esta sendo comparado, ele vai pular esse valor. Se
                        ele encontrar um valor DIFERENTE ao que esta sendo comparado, ele vai fazer um push desse valor para o novo array
                        que ele esta criando a cada volta que ele der no loop.
                        Dessa forma, neste caso, eu estou criando um novo array (uma nova lista) para ser settado dentro do 
                        localstorage. Por isso eu reescrevi, abaixo, localStorage.setItem("pokemonList", JSON.stringify([...newListPokemon]))
                        pois essa lista ja foi modificada e eu preciso pegar ela novamente, atualizada.*/
                    })
                    console.log(newListPokemon)
                    localStorage.setItem("pokemonList", JSON.stringify([...newListPokemon]))
                    target.attr("src", "./assets/images/pokeball-open.png")
                    return 
                }

                target.attr("src", "./assets/images/pokeball-close.png")

                const pokemon = {
                    sprites: response.sprites.other.dream_world.front_default,
                    name: response.name,
                    abilities: response.abilities.map(element => element.ability.name),
                    stats: response.stats.map(element => {
                        return {
                            stats_name: element.stat.name,
                            stats_value: element.base_stat
                        }
                    }),
                    types: response.types.map(element => element.type.name)
                }
                listPokemon.push(pokemon)
                localStorage.setItem("pokemonList", JSON.stringify([...listPokemon]))/* "..." significa operador spread, que espalha o conteudo que
                foi adicionado dentro do array "[]". Ou seja, se eu tiver mais de um elemento no array, ele
                vai adicionando em cada casa do array, sem sobrescrever nenhum elemente ja presente no array.*/

                /* O json.stringify pega todo o conteudo presente naquela variavel à qual foi aplicado, e transforma em uma
                string unica. Porque o localstorage so aceita salvar dados de tipo unico, e nao um objeto, um array, por exemplo. */
            })
        }
    })
})
const tarjetas = $(".tarjetas");
const popup = $(".popup")[0];
const button = $(".button");
const errmsg = $("#errmsg")[0];

console.log(button)

const pokemon_limit = 20;

async function fetchManyPokemons(limit) {
    const offset = 0;

    const data = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${pokemon_limit}&offset=${offset}`);
    const json_data = await data.json();
    json_data.results.forEach(async (pokemon) => await fetchData(pokemon.name));
}

fetchManyPokemons(pokemon_limit);

async function fetchData(pokemon_name, append = true) {
    try {
        const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon_name}`);
        const json_data = await data.json();

        const nombre = json_data.name
        const url_img = json_data.sprites?.other?.dream_world?.front_default ?? "https://t3.ftcdn.net/jpg/03/35/13/14/360_F_335131435_DrHIQjlOKlu3GCXtpFkIG1v0cGgM9vJC.jpg"
        const tipo = json_data.types[0].type.name
        const habilidades = ["", ""]
        habilidades[0] = json_data.abilities[0]?.ability?.name ?? "No ability";
        habilidades[1] = json_data.abilities[1]?.ability?.name ?? "No ability";
        const progreso = json_data.stats[0].base_stat
        createCard(tarjetas, nombre, url_img, tipo, habilidades, progreso, append)
    } catch (err) {
        popup.className = "popup";
        errmsg.innerText = err;
        setTimeout(() => {
            popup.className = "hidden";
        }, 3500);

    }
}

function createCard(contenedor, nombre, url_img, tipo, habilidades, progreso, append = true) {
    append ?
        contenedor.append(`
            <div class="tarjeta">
                <h3 class="nombre">${nombre}</h3>
                <div class="imgcon">
                    <img class="img"
                        src="${url_img}"
                        alt="">
                </div>
                <h4 class="tipo">${tipo}</h4>
                <div class="habilidad">
                    <h5>${habilidades[0]}</h5>
                    <h5>${habilidades[1]}</h5>
                </div>
                <progress class="bar" id="file" max="100" value="${progreso}"></progress>
            </div> 
        `) :
        contenedor.prepend(`
            <div class="tarjeta">
                <h3 class="nombre">${nombre}</h3>
                <div class="imgcon">
                    <img class="img"
                        src="${url_img}"
                        alt="">
                </div>
                <h4 class="tipo">${tipo}</h4>
                <div class="habilidad">
                    <h5>${habilidades[0]}</h5>
                    <h5>${habilidades[1]}</h5>
                </div>
                <progress class="bar" id="file" max="100" value="${progreso}"></progress>
            </div> 
        `);
}


const input = $("#search");
const buscar = $("#buscar");

input.on("keydown", async (event) => {
    if (event.keyCode == 13) {
        console.log(input[0].value)
        await fetchData(input[0].value, false)
    } else {
        console.log("No buscar")
    }

});

button.on("click", () => {
    popup.className = "hidden";
});
const tarjetas = $(".tarjetas");

async function fetchData() {
    const data = await fetch('https://pokeapi.co/api/v2/pokemon/pikachu');
    const json_data = await data.json();
    const nombre = json_data.name
    const url_img = json_data.sprites.other.dream_world.front_default
    const tipo = json_data.types[0].type.name
    const habilidades = ["", ""]
    habilidades[0] = json_data.abilities[0].ability.name
    habilidades[1] = json_data.abilities[1].ability.name
    const progreso = json_data.stats[0].base_stat
    createCard(tarjetas, nombre, url_img, tipo, habilidades, progreso)
}

fetchData();

function createCard(contenedor, nombre, url_img, tipo, habilidades, progreso) {
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
    `);
}



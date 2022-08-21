import { apiKey } from "./env.js";
/*Selectores */
const conteiner = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

// Evento sobre el window. El load es como el DOMContentLoad pero en window
// el otro es sobre documente
window.addEventListener('load', ()=>{
    formulario.addEventListener('submit', buscarClima);
})

function buscarClima(e) {
    // prevengo el accion por defecto
    e.preventDefault();

    // console.log('Buscando el clima...');

    // Validar
    const ciudad = document.querySelector('#ciudad').value;
    const pais  = document.querySelector('#pais').value;

    if (ciudad === '' || pais === '') {

        mostrarError('Ambos campos son obligatorios');
        return
    } else {
        // console.log(ciudad);
        // console.log(pais);
    }


    // Consultamos la api https://home.openweathermap.org
    consultarApi(ciudad, pais);
}

function mostrarError(mensaje) {
    // console.log(mensaje);
    const alerta = document.querySelector('.bg-red-100');
    // Si en el documento no tengo una alerta con la clase bg-red-100
    if (!alerta) {
        // Crear alerta
        const alerta = document.createElement('div');

        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounde', 'max-w-md', 'mx-auto', 'mt-6', 'text-center');

        alerta.innerHTML = `
            <strong class="font-bold">Error!</strong>
            <span class="block">${mensaje}</span>
        `;

        conteiner.appendChild(alerta);

        // se elimina la alerta después de 5 segundos
        setTimeout(() => {
            alerta.remove();
        }, 5000);
        
    }

}
//Fin mostrarError

function consultarApi(ciudad, pais) {
    // Tomamos el key de la api
    const appId = apiKey;
    // Estos datos los tomo de la api (https://openweathermap.org/current)y lo modifico con $ciudad, $pais y $appId
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

    // Llamada al spinner de cargas
    spinner();
    // console.log(url);
    fetch(url)
        .then(respuesta =>{
            return respuesta.json();
        })
        .then(datos => {
            // Limpiamos el html que exista
            limpiarHtml();

            if (datos.cod === "404") {
                mostrarError('Ciudad no encontrada');
                return;
            } 
            // console.log(datos);

            /**Imprimo la respuesta en html */
            mostrarClima(datos);
        })
        .catch(error => {
            console.log(error);
        })
}
// Fin consultarApi

function mostrarClima(datos) {
    /**Hago destructuring de datos y sobre la variable main hago
     * otro destructuring
     */
    const {name, main:{temp, temp_max, temp_min} } = datos;
    // Para cambiar de kelvin a centígrados hay que restar 273.15
    // console.log(temp-273.15);
    const centigrados = kelvinACentigrados(temp);
    const max = kelvinACentigrados(temp_max);
    const min = kelvinACentigrados(temp_min);

    const ciudad = document.createElement('p');
    ciudad.textContent = `Clima en: ${name}`;
    ciudad.classList.add('font-bold', 'text-2xl');

    const actual = document.createElement('p');
    //Las entidades sólo se pueden imprimir con innerhtml &#8451;
    actual.innerHTML = `${centigrados} &#8451;`;
    actual.classList.add('font-bold', 'text-6xl');

    const tempMaxima = document.createElement('p');
    tempMaxima.innerHTML = `Max: ${max} &#8451;`;
    tempMaxima.classList.add('text-xl');

    const tempMinima = document.createElement('p');
    tempMinima.innerHTML = `Min: ${min} &#8451;`;
    tempMinima.classList.add('text-xl');

    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-white');
    resultadoDiv.appendChild(ciudad);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(tempMaxima);
    resultadoDiv.appendChild(tempMinima);

    resultado.appendChild(resultadoDiv);

}

const kelvinACentigrados = grados => parseInt(grados-273.15);


function limpiarHtml(){
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
};

function spinner() {
    limpiarHtml();
    
    const divSpinner = document.createElement('div');
    divSpinner.classList.add('sk-fading-circle');
    divSpinner.innerHTML = `
        <div class="sk-circle1 sk-circle"></div>
        <div class="sk-circle2 sk-circle"></div>
        <div class="sk-circle3 sk-circle"></div>
        <div class="sk-circle4 sk-circle"></div>
        <div class="sk-circle5 sk-circle"></div>
        <div class="sk-circle6 sk-circle"></div>
        <div class="sk-circle7 sk-circle"></div>
        <div class="sk-circle8 sk-circle"></div>
        <div class="sk-circle9 sk-circle"></div>
        <div class="sk-circle10 sk-circle"></div>
        <div class="sk-circle11 sk-circle"></div>
        <div class="sk-circle12 sk-circle"></div>
    `;

    resultado.appendChild(divSpinner);
}
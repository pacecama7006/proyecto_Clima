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
        console.log(ciudad);
        console.log(pais);
    }


    // Consultamos la api https://home.openweathermap.org
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
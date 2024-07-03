// URL de la API
const apiURL = 'https://mindicador.cl/api';

// Función para obtener valores del dólar y la UF
async function obtenerValores() {
    try {
        // Obtener datos de la API
        let response = await fetch(apiURL);
        let data = await response.json();

        // Extraer valores del dólar y la UF
        let valorDolar = data.dolar.valor;
        let valorUF = data.uf.valor;

        // Mostrar valor del dólar en la página
        document.getElementById('dolar').textContent = valorDolar;

        // Mostrar valor de la UF en la página
        document.getElementById('uf').textContent = valorUF;

    } catch (error) {
        console.error('Error al obtener los valores:', error);
    }
}

// Funciones para actualizar los valores individualmente
async function actualizarDolar() {
    try {
        let response = await fetch(apiURL);
        let data = await response.json();
        document.getElementById('dolar').textContent = data.dolar.valor;
    } catch (error) {
        console.error('Error al actualizar el valor del dólar:', error);
    }
}

async function actualizarUF() {
    try {
        let response = await fetch(apiURL);
        let data = await response.json();
        document.getElementById('uf').textContent = data.uf.valor;
    } catch (error) {
        console.error('Error al actualizar el valor de la UF:', error);
    }
}

// Llamar a la función para obtener y mostrar los valores al cargar la página
window.onload = obtenerValores;

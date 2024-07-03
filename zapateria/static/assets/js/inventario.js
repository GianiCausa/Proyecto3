let zapatillas = [
    { marca: 'Nike', modelo: 'Air Max', talla: 42, precio: 120 },
    { marca: 'Adidas', modelo: 'Ultraboost', talla: 43, precio: 140 },
    { marca: 'Puma', modelo: 'Suede', talla: 41, precio: 80 }
];

let carrito = [];
const zapatillasPorPagina = 5;
let paginaActual = 1;

function mostrarZapatillas(filtrados = zapatillas) {
    const lista = document.getElementById('zapatillas-lista');
    lista.innerHTML = '';
    const inicio = (paginaActual - 1) * zapatillasPorPagina;
    const zapatillasPagina = filtrados.slice(inicio, inicio + zapatillasPorPagina);

    zapatillasPagina.forEach((zapatilla, index) => {
        const zapatillaDiv = document.createElement('div');
        zapatillaDiv.className = 'zapatilla card mb-3';

        zapatillaDiv.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${zapatilla.marca} ${zapatilla.modelo}</h5>
                <p class="card-text">Talla: ${zapatilla.talla}</p>
                <p class="card-text">Precio: $${zapatilla.precio}</p>
                <button class="btn btn-info" onclick="verDetalles(${inicio + index})">Detalles</button>
                <button class="btn btn-success" onclick="agregarAlCarrito(${inicio + index})">Agregar al carrito</button>
                <button class="btn btn-danger" onclick="eliminarZapatilla(${inicio + index})">Eliminar</button>
            </div>
        `;

        lista.appendChild(zapatillaDiv);
    });

    mostrarPaginacion(filtrados.length);
}

function mostrarPaginacion(totalZapatillas) {
    const paginacion = document.getElementById('paginacion');
    paginacion.innerHTML = '';
    const totalPaginas = Math.ceil(totalZapatillas / zapatillasPorPagina);

    for (let i = 1; i <= totalPaginas; i++) {
        const li = document.createElement('li');
        li.className = `page-item ${i === paginaActual ? 'active' : ''}`;
        li.innerHTML = `<button class="page-link" onclick="cambiarPagina(${i})">${i}</button>`;
        paginacion.appendChild(li);
    }
}

function cambiarPagina(nuevaPagina) {
    paginaActual = nuevaPagina;
    mostrarZapatillas();
}

document.getElementById('form-agregar-zapatilla').addEventListener('submit', function(event) {
    event.preventDefault();
    const nuevaMarca = document.getElementById('marca').value;
    const nuevoModelo = document.getElementById('modelo').value;
    const nuevaTalla = parseInt(document.getElementById('talla').value);
    const nuevoPrecio = parseFloat(document.getElementById('precio').value);

    zapatillas.push({ marca: nuevaMarca, modelo: nuevoModelo, talla: nuevaTalla, precio: nuevoPrecio });
    mostrarZapatillas();
    document.getElementById('form-agregar-zapatilla').reset();
});

function eliminarZapatilla(index) {
    zapatillas.splice(index, 1);
    mostrarZapatillas();
}

document.getElementById('buscar').addEventListener('input', function() {
    const termino = this.value.toLowerCase();
    const zapatillasFiltradas = zapatillas.filter(zapatilla => zapatilla.marca.toLowerCase().includes(termino));
    mostrarZapatillas(zapatillasFiltradas);
});

function verDetalles(index) {
    const zapatilla = zapatillas[index];
    const detallesCuerpo = document.getElementById('detallesCuerpo');
    detallesCuerpo.innerHTML = `
        <p><strong>Marca:</strong> ${zapatilla.marca}</p>
        <p><strong>Modelo:</strong> ${zapatilla.modelo}</p>
        <p><strong>Talla:</strong> ${zapatilla.talla}</p>
        <p><strong>Precio:</strong> $${zapatilla.precio}</p>
    `;
    const detallesModal = new bootstrap.Modal(document.getElementById('detallesModal'));
    detallesModal.show();
}

function agregarAlCarrito(index) {
    carrito.push(zapatillas[index]);
    alert('Zapatilla agregada al carrito');
}

document.addEventListener('DOMContentLoaded', () => {
    mostrarZapatillas();
});

// Funciones para almacenar y traer los datos del localStorage
function guardarAlmacenamientoLocal(llave, valor_a_guardar) {
    localStorage.setItem(llave, JSON.stringify(valor_a_guardar));
}

function obtenerAlmacenamientoLocal(llave) {
    const datos = JSON.parse(localStorage.getItem(llave));
    return datos;
}

let productos = obtenerAlmacenamientoLocal('productos') || [];

// Variables que traemos del HTML
const informacionCompra = document.getElementById('informacionCompra');
const contenedorCompra = document.getElementById('contenedorCompra');
const productosCompra = document.getElementById('productosCompra');
const contenedor = document.getElementById('contenedor');
const carrito = document.getElementById('carrito');
const numero = document.getElementById("numero");
const header = document.querySelector("#header");
const total = document.getElementById('total');
const body = document.querySelector("body");
const x = document.getElementById('x');

// Variable global para la lista de productos seleccionados
let lista = [];

// Scroll de la página
window.addEventListener("scroll", function () {
    if (contenedor.getBoundingClientRect().top < 10) {
        header.classList.add("scroll");
    } else {
        header.classList.remove("scroll");
    }
});

// Cargar productos al cargar la página
window.addEventListener('load', () => {
    visualizarProductos();
    contenedorCompra.classList.add("none");
});

// Función para visualizar los productos en la página principal
function visualizarProductos() {
    contenedor.innerHTML = "";
    for (let i = 0; i < productos.length; i++) {
        if (productos[i].existencia > 0) {
            contenedor.innerHTML += `
                <div>
                    <img src="${productos[i].urlImagen}">
                    <div class="informacion">
                        <p>${productos[i].nombre}</p>
                        <p class="precio">$${productos[i].valor}</p>
                        <button class="btn-comprar" data-indice="${i}">Comprar</button>
                    </div>
                </div>`;
        } else {
            contenedor.innerHTML += `
                <div>
                    <img src="${productos[i].urlImagen}">
                    <div class="informacion">
                        <p>${productos[i].nombre}</p>
                        <p class="precio">$${productos[i].valor}</p>
                        <p class="soldOut">Sold Out</p>
                    </div>
                </div>`;
        }
    }
    // Agregar event listener a los botones de comprar
    const botonesComprar = document.querySelectorAll('.btn-comprar');
    botonesComprar.forEach(boton => {
        boton.addEventListener('click', () => {
            const indice = boton.getAttribute('data-indice');
            comprar(parseInt(indice));
        });
    });
}

// Función para agregar un producto al carrito
function comprar(indice) {
    lista.push({ nombre: productos[indice].nombre, precio: productos[indice].valor });

    let van = true;
    let i = 0;
    while (van == true) {
        if (productos[i].nombre == productos[indice].nombre) {
            productos[i].existencia -= 1;
            if (productos[i].existencia == 0) {
                visualizarProductos();
            }
            van = false;
        }
        guardarAlmacenamientoLocal("productos", productos);
        i += 1;
    }
    numero.innerHTML = lista.length;
    numero.classList.add("diseñoNumero");
    mostrarElementosLista();
}

// Mostrar elementos en la lista del carrito
function mostrarElementosLista() {
    productosCompra.innerHTML = "";
    let valortotal = 0;
    for (let i = 0; i < lista.length; i++) {
        productosCompra.innerHTML += `
            <div>
                <div class="img">
                    <button onclick="eliminar(${i})" class="botonTrash">
                        <img src="../assets/IMG/trash.png">
                    </button>
                    <p>${lista[i].nombre}</p>
                </div>
                <p>$${lista[i].precio}</p>
            </div>`;
        valortotal += parseInt(lista[i].precio);
    }
    total.innerHTML = `
        <p>Valor Total</p>
        <p><span>$${valortotal}</span></p>`;
}

// Función para eliminar un producto del carrito
function eliminar(indice) {
    let van = true;
    let i = 0;
    while (van == true) {
        if (productos[i].nombre == lista[indice].nombre) {
            productos[i].existencia += 1;
            lista.splice(indice, 1);
            van = false;
        }
        i += 1;
    }
    guardarAlmacenamientoLocal("productos", productos);

    numero.innerHTML = lista.length;
    if (lista.length == 0) {
        numero.classList.remove("diseñoNumero");
    }
    visualizarProductos();
    mostrarElementosLista();
}

// Cerrar el carrito al hacer click en "x"
x.addEventListener("click", function () {
    body.style.overflow = "auto";
    contenedorCompra.classList.add('none');
    contenedorCompra.classList.remove('contenedorCompra');
    informacionCompra.classList.remove('informacionCompra');
});

// Abrir el carrito al hacer click en el icono del carrito
carrito.addEventListener("click", function () {
    body.style.overflow = "hidden";
    contenedorCompra.classList.remove('none');
    contenedorCompra.classList.add('contenedorCompra');
    informacionCompra.classList.add('informacionCompra');
    mostrarElementosLista();
});

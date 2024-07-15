const obtenerPersonajes = async () => {
    try {
        const url = "https://api-zapatillas-khz7.onrender.com";
        console.log(`Fetching data from: ${url}`);
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Data received:', data);

        const { zapatillas } = data;
        if (!zapatillas) {
            throw new Error('No se encontraron zapatillas en la respuesta de la API');
        }

        return zapatillas;
    } catch (error) {
        console.log(`El error es: ${error}`);
    }
};

const enviarDatos = (id, nombre, marca, imagen, talla, stock, genero, precio) => {
    console.log(imagen);

    const rutaArchivoHTML = "../productos.html";

    fetch(rutaArchivoHTML)
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            const imagePage = doc.getElementById("imagePage");
            imagePage.src = imagen;
            imagePage.classList.add("card-img-top");

            const nombrePage = doc.getElementById("nombre");
            nombrePage.textContent = nombre;

            const marcaPage = doc.getElementById("marca");
            marcaPage.textContent = marca;

            const tallaPage = doc.getElementById("talla");
            tallaPage.textContent = talla;

            const generoPage = doc.getElementById("genero");
            generoPage.textContent = genero;
            
            const stockPage = doc.getElementById("stock");
            stockPage.textContent = stock;

            const precioPage = doc.getElementById("precio");
            precioPage.textContent = precio;

            const nuevoHTML = new XMLSerializer().serializeToString(doc);

            document.body.innerHTML = nuevoHTML;
        });
};

const crearTarjetas = async (filtroMarca = 'todos', filtroTalla = 'todos', filtroGenero = 'todos') => {
    try {
        const zapatillas = await obtenerPersonajes();
        if (!zapatillas || zapatillas.length === 0) {
            console.error("No se encontraron zapatillas.");
            return;
        }
        
        let personajesRow = document.getElementById("personajesRow");
        if (!personajesRow) {
            console.error("El contenedor con id 'personajesRow' no existe.");
            return;
        }

        personajesRow.innerHTML = ''; // Limpiar las tarjetas existentes

        zapatillas
            .filter(zapatilla => (filtroMarca === 'todos' || zapatilla.marca === filtroMarca) &&
                                 (filtroTalla === 'todos' || zapatilla.talla === filtroTalla) &&
                                 (filtroGenero === 'todos' || zapatilla.genero === filtroGenero))
            .forEach((zapatilla) => {
                const { id, nombre, imagen, marca, talla, stock, genero, precio } = zapatilla;

                const divRow = document.createElement("div");
                divRow.classList.add("col-xl-3", "col-lg-3", "col-md-3", "col-sm-12", "col-xs-12", "mt-2", "mb-2");

                const card = document.createElement("div");
                card.classList.add("card");

                const image = document.createElement("img");
                image.src = imagen;
                image.classList.add("card-img-top");

                const divBody = document.createElement("div");
                divBody.classList.add("card-body");

                const title = document.createElement("h5");
                title.classList.add("card-title");
                title.textContent = nombre;

                const subTitle = document.createElement("p");
                subTitle.classList.add("card-text");
                subTitle.textContent = marca;

                const subTitle2 = document.createElement("p");
                subTitle2.classList.add("card-text");
                subTitle2.textContent = `Talla: ${talla}`;

                const subTitle3 = document.createElement("p");
                subTitle3.classList.add("card-text");
                subTitle3.textContent = `Stock: ${stock}`;

                const subTitle4 = document.createElement("p");
                subTitle4.classList.add("card-text");
                subTitle4.textContent = `Género: ${genero}`;

                const subTitle5 = document.createElement("p");
                subTitle5.classList.add("card-text");
                subTitle5.textContent = `Precio: ${precio}`;

                divRow.appendChild(card);
                card.appendChild(image);
                card.appendChild(divBody);
                divBody.appendChild(title);
                divBody.appendChild(subTitle);
                divBody.appendChild(subTitle2);
                divBody.appendChild(subTitle3);
                divBody.appendChild(subTitle4);
                divBody.appendChild(subTitle5);
                personajesRow.appendChild(divRow);
            });

        llenarFiltros(zapatillas);
    } catch (error) {
        console.log(`El error es: ${error}`);
    }
};

const llenarFiltros = (zapatillas) => {
    const filtroMarca = document.getElementById('filtroMarca');
    const filtroTalla = document.getElementById('filtroTalla');
    const filtroGenero = document.getElementById('filtroGenero');

    const marcas = [...new Set(zapatillas.map(zapatilla => zapatilla.marca))];
    const tallas = [...new Set(zapatillas.map(zapatilla => zapatilla.talla))];
    const generos = [...new Set(zapatillas.map(zapatilla => zapatilla.genero))];

    filtroMarca.innerHTML = '<option value="todos">Todas las marcas</option>';
    filtroTalla.innerHTML = '<option value="todos">Todas las tallas</option>';
    filtroGenero.innerHTML = '<option value="todos">Todos los géneros</option>';

    marcas.forEach(marca => {
        const option = document.createElement('option');
        option.value = marca;
        option.textContent = marca;
        filtroMarca.appendChild(option);
    });

    tallas.forEach(talla => {
        const option = document.createElement('option');
        option.value = talla;
        option.textContent = talla;
        filtroTalla.appendChild(option);
    });

    generos.forEach(genero => {
        const option = document.createElement('option');
        option.value = genero;
        option.textContent = genero;
        filtroGenero.appendChild(option);
    });
};

const aplicarFiltros = () => {
    const filtroMarca = document.getElementById('filtroMarca').value;
    const filtroTalla = document.getElementById('filtroTalla').value;
    const filtroGenero = document.getElementById('filtroGenero').value;

    crearTarjetas(filtroMarca, filtroTalla, filtroGenero);
};

document.addEventListener("DOMContentLoaded", () => {
    crearTarjetas();
});

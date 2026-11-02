let carrito = [];

function cargarCarrito() {
    const usuario = localStorage.getItem("usuarioMinecraft");

    if (!usuario) {
        carrito = [];
        return;
    }

    carrito =
        JSON.parse(
            localStorage.getItem("carritoMinecraft_" + usuario)
        ) || [];
}

function guardarCarrito() {
    const usuario = localStorage.getItem("usuarioMinecraft");

    if (!usuario) {
        return;
    }

    localStorage.setItem(
        "carritoMinecraft_" + usuario,
        JSON.stringify(carrito)
    );
}
function comprar(producto) {

    const usuario = localStorage.getItem("usuarioMinecraft");

    if (!usuario) {

        mostrarCartel(
            "🔒",
            "Inicia sesión para comprar",
            "Debes iniciar sesión antes de añadir productos al carrito.",
            true
        );

        return;
    }


    carrito.push(producto);

    guardarCarrito();


    mostrarCartel(
        "🛒",
        "¡Añadido al carrito!",
        producto,
        false
    );


    actualizarContador();
}

function mostrarCarrito() {

    const usuario = localStorage.getItem("usuarioMinecraft");

    if (!usuario) {

        mostrarCartel(
            "🔒",
            "Inicia sesión para ver tu carrito",
            "Debes iniciar sesión para acceder al carrito.",
            true
        );

        return;
    }

    const ventana = document.createElement("div");

    ventana.classList.add("ventana-carrito");


    if (carrito.length === 0) {

        ventana.innerHTML = `
            <div class="carrito-contenido">

                <button class="cerrar-carrito" onclick="cerrarCarrito()">
                    ✕
                </button>

                <div class="carrito-icono">
                    🛒
                </div>

                <h2>Tu carrito está vacío</h2>

                <p>Agregá algún producto para verlo acá.</p>

            </div>
        `;

    } else {


        let productosHTML = "";

        carrito.forEach((producto, index) => {

            productosHTML += `
                <div class="producto-carrito">

                    <span>${producto}</span>

                    <button onclick="eliminarProducto(${index})">
                        ✕
                    </button>

                </div>
            `;

        });


        ventana.innerHTML = `
            <div class="carrito-contenido">

                <button class="cerrar-carrito" onclick="cerrarCarrito()">
                    ✕
                </button>

                <div class="carrito-icono">
                    🛒
                </div>

                <h2>Tu carrito</h2>

                <p class="cantidad-carrito">
                    ${carrito.length} producto(s)
                </p>

                <div class="lista-carrito">
                    ${productosHTML}
                </div>

                <button class="btn-finalizar" onclick="finalizarCompra()">
                    Finalizar compra
                </button>

            </div>
        `;
    }


    document.body.appendChild(ventana);

    setTimeout(() => {
        ventana.classList.add("mostrar-carrito");
    }, 10);
}

function cerrarCarrito() {

    const ventana = document.querySelector(".ventana-carrito");

    if (ventana) {

        ventana.classList.remove("mostrar-carrito");

        setTimeout(() => {
            ventana.remove();
        }, 300);
    }
}

function eliminarProducto(indice) {

    carrito.splice(indice, 1);

    guardarCarrito();

    cerrarCarrito();

    actualizarContador();

    setTimeout(() => {
        mostrarCarrito();
    }, 350);
}

function finalizarCompra() {

    alert("¡Gracias por tu compra!");

    carrito = [];

    localStorage.removeItem("carritoMinecraft");

    cerrarCarrito();

    actualizarContador();
}

function actualizarContador() {

    const contador = document.getElementById("contador-carrito");

    if (!contador) {
        return;
    }

    contador.textContent = carrito.length;
}

document.addEventListener("DOMContentLoaded", function() {

    actualizarContador();

});


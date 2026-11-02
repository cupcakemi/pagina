// ==========================================
// COMPRAR / MEJORAR EDICIONES
// ==========================================

const main = document.querySelector("main");
const contenidoOriginal = main.innerHTML;


// Orden de las ediciones
const nivelesEdicion = {
    "MINECRAFT: JAVA Y BEDROCK ESTÁNDAR": 1,
    "MINECRAFT: JAVA Y BEDROCK DELUXE COLLECTION": 2,
    "MINECRAFT: JAVA Y BEDROCK ULTIMATE COLLECTION": 3
};


// Obtiene el nivel de una edición
function obtenerNivel(edicion) {

    const nombre = edicion
        .trim()
        .toUpperCase();

    return nivelesEdicion[nombre] || 0;
}


// ==========================================
// CREAR BOTONES
// ==========================================

function crearBotones() {

    const ediciones = document.querySelectorAll(".edicion-card");

    const usuario =
        localStorage.getItem("usuarioMinecraft");

    const edicionesCompradas =
        JSON.parse(
            localStorage.getItem("edicionesMinecraft")
        ) || {};

    const edicionActual =
        usuario
            ? edicionesCompradas[usuario]
            : null;


    ediciones.forEach(function(edicion) {

        const info =
            edicion.querySelector(".info");

        // Eliminar botones/mensajes anteriores
        const botonAnterior =
            info.querySelector(".btn-comprar");

        const botonMejorarAnterior =
            info.querySelector(".btn-mejorar");

        const mensajeAnterior =
            info.querySelector(".edicion-comprada");

        if (botonAnterior) {
            botonAnterior.remove();
        }

        if (botonMejorarAnterior) {
            botonMejorarAnterior.remove();
        }

        if (mensajeAnterior) {
            mensajeAnterior.remove();
        }


        // ==========================================
        // SI NO ESTÁ LOGUEADO
        // ==========================================

        if (!usuario) {

            const boton =
                document.createElement("button");

            boton.textContent = "Comprar";

            boton.classList.add("btn-comprar");

            info.appendChild(boton);

            return;
        }


        // ==========================================
        // SI NO TIENE NINGUNA EDICIÓN
        // ==========================================

        if (!edicionActual) {

            const boton =
                document.createElement("button");

            boton.textContent = "Comprar";

            boton.classList.add("btn-comprar");

            info.appendChild(boton);

            return;
        }


        const nivelActual =
            obtenerNivel(edicionActual);


        const nombreEdicion =
            edicion.querySelector("h2")
                .textContent
                .trim();


        const nivelEdicion =
            obtenerNivel(nombreEdicion);


        // ==========================================
        // MOSTRAR EDICIÓN ACTUAL
        // ==========================================

        if (nivelEdicion === nivelActual) {

            const mensaje =
                document.createElement("p");

            mensaje.classList.add(
                "edicion-comprada"
            );

            mensaje.textContent =
                "✓ Tu edición actual";

            info.appendChild(mensaje);

            return;
        }


        // ==========================================
        // EDICIONES SUPERIORES
        // ==========================================

        if (nivelEdicion > nivelActual) {

            const boton =
                document.createElement("button");

            boton.textContent =
                "Mejorar edición";

            boton.classList.add(
                "btn-mejorar"
            );

            info.appendChild(boton);

            return;
        }


        // ==========================================
        // EDICIONES INFERIORES
        // ==========================================

        if (nivelEdicion < nivelActual) {

            const mensaje =
                document.createElement("p");

            mensaje.classList.add(
                "edicion-comprada"
            );

            mensaje.textContent =
                "Edición inferior";

            info.appendChild(mensaje);
        }

    });
}


// ==========================================
// CARTEL DE LOGIN
// ==========================================

function mostrarCartelLogin() {

    const cartel =
        document.createElement("div");

    cartel.classList.add(
        "cartel-login"
    );

    cartel.innerHTML = `
        <div class="icono-login">
            🔒
        </div>

        <div class="contenido-login">

            <strong>
                Inicia sesión para comprar
            </strong>

            <p>
                Debes iniciar sesión antes
                de realizar una compra.
            </p>

            <button
                class="btn-iniciar"
                id="btn-iniciar">

                Iniciar sesión

            </button>

        </div>
    `;

    document.body.appendChild(cartel);


    setTimeout(function() {

        cartel.classList.add("mostrar");

    }, 10);


    const botonLogin =
        document.getElementById(
            "btn-iniciar"
        );


    botonLogin.addEventListener(
        "click",
        function() {

            window.location.href =
                "iniciar.html";

        }
    );


    setTimeout(function() {

        cartel.classList.remove(
            "mostrar"
        );

        setTimeout(function() {

            cartel.remove();

        }, 500);

    }, 5000);
}


// ==========================================
// COMPRAR EDICIÓN
// ==========================================

function mostrarCompra(edicion) {

    const usuario =
        localStorage.getItem(
            "usuarioMinecraft"
        );


    // Si no inició sesión
    if (!usuario) {

        mostrarCartelLogin();

        return;
    }


    const edicionesCompradas =
        JSON.parse(
            localStorage.getItem(
                "edicionesMinecraft"
            )
        ) || {};


    // Ya tiene una edición
    if (edicionesCompradas[usuario]) {

        alert(
            "Ya tienes seleccionada: " +
            edicionesCompradas[usuario]
        );

        return;
    }


    // Guardar edición
    edicionesCompradas[usuario] =
        edicion;

    localStorage.setItem(
        "edicionesMinecraft",
        JSON.stringify(
            edicionesCompradas
        )
    );


    mostrarPantallaCompra(
        edicion,
        "¡Compra exitosa!"
    );
}


// ==========================================
// MEJORAR EDICIÓN
// ==========================================

function mejorarEdicion(nuevaEdicion) {

    const usuario =
        localStorage.getItem(
            "usuarioMinecraft"
        );


    if (!usuario) {

        mostrarCartelLogin();

        return;
    }


    const edicionesCompradas =
        JSON.parse(
            localStorage.getItem(
                "edicionesMinecraft"
            )
        ) || {};


    const edicionActual =
        edicionesCompradas[usuario];


    if (!edicionActual) {

        mostrarCompra(
            nuevaEdicion
        );

        return;
    }


    const nivelActual =
        obtenerNivel(
            edicionActual
        );

    const nivelNuevo =
        obtenerNivel(
            nuevaEdicion
        );


    // No permitir bajar de edición
    if (nivelNuevo <= nivelActual) {

        alert(
            "No puedes cambiar a una edición inferior."
        );

        return;
    }


    // Si ya tiene Ultimate
    if (nivelActual === 3) {

        alert(
            "Ya tienes la edición más completa."
        );

        return;
    }

mostrarModalMejora(edicionActual, nuevaEdicion);

    // Guardar nueva edición
    edicionesCompradas[usuario] =
        nuevaEdicion;


    localStorage.setItem(
        "edicionesMinecraft",
        JSON.stringify(
            edicionesCompradas
        )
    );


    mostrarPantallaCompra(
        nuevaEdicion,
        "¡Edición mejorada!"
    );
}


// ==========================================
// PANTALLA DE COMPRA / MEJORA
// ==========================================

function mostrarPantallaCompra(edicion, titulo) {

    const usuario =
        localStorage.getItem("usuarioMinecraft");

    const esMejora =
        titulo === "¡Edición mejorada!";

    const ediciones =
        JSON.parse(
            localStorage.getItem("edicionesMinecraft")
        ) || {};

    const edicionAnterior =
        esMejora
            ? obtenerEdicionAnterior(edicion, ediciones[usuario])
            : null;


    main.innerHTML = `

        <section class="pantalla-resultado">

            <div class="resultado-contenido">

                <div class="resultado-icono">
                    ${esMejora ? "⬆" : "✓"}
                </div>

                <h1>
                    ${esMejora
                        ? "¡EDICIÓN MEJORADA!"
                        : "¡COMPRA EXITOSA!"}
                </h1>

                <p class="resultado-usuario">
                    ¡Bienvenido, ${usuario}!
                </p>


                ${
                    esMejora
                    ? `
                        <p class="resultado-texto">
                            Has mejorado tu edición:
                        </p>

                        <div class="mejora-ediciones">

                            <div class="edicion-anterior">
                                <span>EDICIÓN ACTUAL</span>
                                <strong>
                                    ${edicionAnterior}
                                </strong>
                            </div>

                            <div class="flecha-mejora">
                                →
                            </div>

                            <div class="edicion-nueva">
                                <span>NUEVA EDICIÓN</span>
                                <strong>
                                    ${edicion}
                                </strong>
                            </div>

                        </div>
                    `
                    : `
                        <p class="resultado-texto">
                            Has adquirido:
                        </p>

                        <div class="edicion-adquirida">
                            ${edicion}
                        </div>
                    `
                }


                <button
                    class="btn-volver"
                    id="volver">

                    Volver a ediciones

                </button>

            </div>

        </section>

    `;
}


function obtenerEdicionAnterior(nuevaEdicion, edicionActual) {

    if (edicionActual) {
        return edicionActual;
    }

    return "Edición anterior";
}


// ==========================================
// CLICS
// ==========================================

main.addEventListener(
    "click",
    function(event) {


        // COMPRAR
        if (
            event.target.classList
                .contains("btn-comprar")
        ) {

            const tarjeta =
                event.target.closest(
                    ".edicion-card"
                );


            const nombre =
                tarjeta.querySelector("h2")
                    .textContent;


            mostrarCompra(nombre);

        }


        // MEJORAR
        if (
            event.target.classList
                .contains("btn-mejorar")
        ) {

            const tarjeta =
                event.target.closest(
                    ".edicion-card"
                );


            const nombre =
                tarjeta.querySelector("h2")
                    .textContent;


            mejorarEdicion(nombre);

        }


        // VOLVER
        if (
            event.target.id === "volver"
        ) {

            main.innerHTML =
                contenidoOriginal;

            crearBotones();

        }

    }
);


// Crear botones al cargar
crearBotones();
function mostrarModalMejora(edicionActual, nuevaEdicion) {

    // Evitar que aparezcan dos modales
    const modalAnterior =
        document.querySelector(".modal-mejora");

    if (modalAnterior) {
        modalAnterior.remove();
    }


    const modal =
        document.createElement("div");

    modal.classList.add("modal-mejora");


    modal.innerHTML = `

        <div class="modal-mejora-contenido">

            <button
                class="cerrar-modal-mejora"
                id="cerrar-modal-mejora">
                ✕
            </button>


            <div class="modal-mejora-icono">
                ⬆
            </div>


            <h2>
                ¿Mejorar edición?
            </h2>


            <p class="modal-mejora-descripcion">
                Estás a punto de mejorar tu edición.
            </p>


            <div class="comparacion-mejora">

                <div class="edicion-modal anterior">

                    <span>
                        EDICIÓN ACTUAL
                    </span>

                    <strong>
                        ${edicionActual}
                    </strong>

                </div>


                <div class="flecha-modal">
                    →
                </div>


                <div class="edicion-modal nueva">

                    <span>
                        NUEVA EDICIÓN
                    </span>

                    <strong>
                        ${nuevaEdicion}
                    </strong>

                </div>

            </div>


            <p class="modal-aviso">
                Esta acción cambiará tu edición actual.
            </p>


            <div class="botones-modal">

                <button
                    class="btn-cancelar-mejora"
                    id="cancelar-mejora">

                    Cancelar

                </button>


                <button
                    class="btn-confirmar-mejora"
                    id="confirmar-mejora">

                    Mejorar edición

                </button>

            </div>

        </div>

    `;


    document.body.appendChild(modal);


    // Animación de entrada
    setTimeout(() => {
        modal.classList.add("mostrar-modal-mejora");
    }, 10);


    // Cerrar
    function cerrarModal() {

        modal.classList.remove(
            "mostrar-modal-mejora"
        );

        setTimeout(() => {
            modal.remove();
        }, 250);
    }


    document
        .getElementById("cerrar-modal-mejora")
        .addEventListener(
            "click",
            cerrarModal
        );


    document
        .getElementById("cancelar-mejora")
        .addEventListener(
            "click",
            cerrarModal
        );


    // Confirmar mejora
    document
        .getElementById("confirmar-mejora")
        .addEventListener(
            "click",
            function() {

                const usuario =
                    localStorage.getItem(
                        "usuarioMinecraft"
                    );


                const edicionesCompradas =
                    JSON.parse(
                        localStorage.getItem(
                            "edicionesMinecraft"
                        )
                    ) || {};


                edicionesCompradas[usuario] =
                    nuevaEdicion;


                localStorage.setItem(
                    "edicionesMinecraft",
                    JSON.stringify(
                        edicionesCompradas
                    )
                );


                cerrarModal();


                // Mostrar pantalla de éxito
                setTimeout(() => {

                    mostrarPantallaCompra(
                        nuevaEdicion,
                        "¡Edición mejorada!"
                    );

                }, 250);

            }
        );


    // Cerrar haciendo click fuera
    modal.addEventListener(
        "click",
        function(event) {

            if (
                event.target === modal
            ) {
                cerrarModal();
            }

        }
    );
}
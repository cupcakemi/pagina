//mensajes de agregados al carrito
function mostrarCartel(icono, titulo, mensaje, mostrarBoton) {

    const cartel = document.createElement("div");

    cartel.classList.add("cartel-carrito");

    cartel.innerHTML = `
        <div class="icono-carrito">
            ${icono}
        </div>

        <div class="contenido-cartel">

            <strong>${titulo}</strong>

            <p>${mensaje}</p>

            ${
                mostrarBoton
                ? `<button class="btn-iniciar" onclick="window.location.href='iniciar.html'">
                        Iniciar sesión
                   </button>`
                : ""
            }

        </div>
    `;

    document.body.appendChild(cartel);


    setTimeout(() => {

        cartel.classList.add("mostrar");

    }, 10);


    const tiempo = mostrarBoton ? 5000 : 3000;


    setTimeout(() => {

        cartel.classList.remove("mostrar");

        setTimeout(() => {

            cartel.remove();

        }, 500);

    }, tiempo);
}
//formulario de asistencia tecnica
document.addEventListener("DOMContentLoaded", function() {

    const formulario =
        document.getElementById("form-soporte");

    if (!formulario) {
        return;
    }

    formulario.addEventListener("submit", function(event) {

        event.preventDefault();
        const usuario =
            localStorage.getItem("usuarioMinecraft");


        if (!usuario) {

            mostrarCartel(
                "🔒",
                "Inicia sesión para enviar tu pregunta",
                "Debes iniciar sesión antes de enviar una consulta de soporte.",
                true
            );

            return;
        }

        const nombre =
            document.getElementById("nombre-soporte").value.trim();

        const problema =
            document.getElementById("problema-soporte").value.trim();

        const descripcion =
            document.getElementById("descripcion-soporte").value.trim();

        if (
            nombre === "" ||
            problema === "" ||
            descripcion === ""
        ) {

            alert("Completa todos los campos.");

            return;
        }

        const preguntas =
            JSON.parse(
                localStorage.getItem("preguntasSoporte")
            ) || [];

        const nuevaPregunta = {

            usuario: usuario,

            nombre: nombre,

            problema: problema,

            descripcion: descripcion,

            fecha: new Date().toLocaleString()

        };

        preguntas.push(nuevaPregunta);


        localStorage.setItem(
            "preguntasSoporte",
            JSON.stringify(preguntas)
        );
        mostrarCartel(
            "📨",
            "¡Pregunta enviada!",
            "Tu consulta fue guardada correctamente.",
            false
        );
        formulario.reset();

    });

});
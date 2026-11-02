//boton de inicio de sesion
document.addEventListener("DOMContentLoaded", () => {

    const loginForm = document.querySelector(".login-form");

    if (loginForm) {

        loginForm.addEventListener("submit", function (e) {

            e.preventDefault();

            const usuario = document.getElementById("usuario").value.trim(); 
            const password = document.getElementById("password").value.trim();

            if (usuario === "" || password === "") {
                alert("Completa todos los campos."); 
                return;
            }

            localStorage.setItem("usuarioMinecraft", usuario); 

            window.location.href = "../index.html";
        });

    }

    const loginBtn = document.querySelector(".btn-login");

    if (loginBtn) {

        const usuario = localStorage.getItem("usuarioMinecraft");

        if (usuario) {

            loginBtn.textContent = usuario;
            loginBtn.href = "#";
            loginBtn.title = "Cerrar sesión";

            loginBtn.addEventListener("click", function (e) { 

                e.preventDefault();

                if (confirm("¿Cerrar sesión?")) {

                    localStorage.removeItem("usuarioMinecraft"); 

                    location.reload();

                }

            });

        }

    }

});
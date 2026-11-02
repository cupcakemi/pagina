//boton para ir hacia arriba de la pagina
const boton = document.getElementById("btnArriba");

window.addEventListener("scroll", () =>{

    if(window.scrollY > 300){
        boton.style.display="block"; 
    }else{
        boton.style.display="none";
    }

});

boton.addEventListener("click", ()=>{ 

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

});


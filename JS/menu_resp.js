    // Seleccionamos los elementos
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    // Evento Click en la hamburguesa
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("toggle"); // Convierte las lineas en X
        navMenu.classList.toggle("active");   // Muestra el menú desde la derecha
    });

    // Opcional: Cerrar el menú si se hace click en un enlace
    document.querySelectorAll(".nav-item a").forEach(link => {
        link.addEventListener("click", () => {
            hamburger.classList.remove("toggle");
            navMenu.classList.remove("active");
        });
    });
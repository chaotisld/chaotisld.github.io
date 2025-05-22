 const tips = [
  "Apaga las luces cuando no las necesites.",
  "Usa una botella reutilizable en vez de botellas de plástico.",
  "Compra productos a granel para reducir envases.",
  "Reduce el tiempo de ducha a menos de 5 minutos.",
  "Opta por transporte público o bicicleta cuando puedas.",
  "Planta una especie nativa en tu jardín o comunidad.",
  "Evita imprimir a menos que sea necesario.",
  "Prefiere alimentos de origen vegetal al menos 2 veces por semana.",
  "Desenchufa cargadores cuando no los uses.",
  "Compra ropa de segunda mano o haz trueques.",
  "Recicla correctamente y separa tus residuos.",
  "Usa bolsas de tela en lugar de bolsas plásticas.",
  "Aprovecha la luz natural durante el día.",
  "Repara en vez de reemplazar aparatos rotos.",
  "Evita productos con empaques excesivos.",
  "Apoya a negocios locales y sostenibles.",
  "Cultiva hierbas o vegetales en casa.",
  "Evita el uso de plásticos de un solo uso.",
  "Comparte el auto con compañeros de trabajo o estudio.",
  "Desactiva el 'stand-by' de electrodomésticos.",
  "Reutiliza frascos, cajas y envases.",
  "Compra solo lo necesario y evita el desperdicio.",
  "Haz compost con residuos orgánicos.",
  "Lava la ropa con agua fría cuando sea posible.",
  "Instala bombillas LED de bajo consumo.",
  "Apoya proyectos de reforestación o conservación.",
  "Evita dejar el grifo abierto mientras te cepillas los dientes.",
  "Infórmate y educa a otros sobre sostenibilidad.",
  "Lleva tus propios cubiertos reutilizables cuando comas fuera.",
  "Prioriza productos biodegradables o ecológicos."
];



function mostrarNuevoTipConEfecto() {
  const tipElemento = document.getElementById('tipTexto');
  
  tipElemento.classList.add('fade-out');

  setTimeout(() => {
    const indice = Math.floor(Math.random() * tips.length);
    tipElemento.textContent = tips[indice];

    tipElemento.classList.remove('fade-out');
  }, 800); 
}

//POLITICA DE PRIVACIDAD
    document.addEventListener('DOMContentLoaded', function() {
      const fechaSpan = document.getElementById('fecha-actualizacion');
      const fechaBase = new Date('2025-05-20'); 
      const ultimaModificacion = new Date(document.lastModified); 

      
      if (ultimaModificacion > fechaBase) {
        const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
        fechaSpan.textContent = ultimaModificacion.toLocaleDateString('es-ES', opciones);
      }
    });

    //MOSTRAR NUEVO TIP
window.addEventListener('DOMContentLoaded', () => {
  mostrarNuevoTipConEfecto();
  setInterval(mostrarNuevoTipConEfecto, 10000);
});

  const toggleBtn = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu-container');

  toggleBtn.addEventListener('click', () => {
    menu.classList.toggle('active');
  });

//CONOCE MAS

    const botones = document.querySelectorAll(".acordeon-btn");
    botones.forEach(btn => {
      btn.addEventListener("click", function () {
        this.classList.toggle("activo");
        const panel = this.nextElementSibling;
        panel.style.display = panel.style.display === "block" ? "none" : "block";
      });
    });

    //CONTACTO
      document.getElementById("contactoForm").addEventListener("submit", function(event) {
    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();

    if (!nombre || !email || !mensaje) {
      event.preventDefault();
      alert("Por favor, completa todos los campos.");
      
    }
  });


    document.getElementById("contactoForm").addEventListener("submit", function (e) {
    // Mostrar feedback opcional mientras se envía
    document.getElementById("formFeedback").style.display = "block";
    document.getElementById("formFeedback").textContent = "Enviando mensaje...";

    // No detener el envío si usas FormSubmit.co
    // Pero si quieres controlarlo todo por JS (sin FormSubmit), haz esto:


    // Redirigir manualmente después de 2 segundos (simulando éxito)
    setTimeout(function () {
      window.location.href = "gracias.html";
    }, 2000); // puedes ajustar el tiempo
  });
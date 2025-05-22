document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const progress = document.querySelector('.progress');
  const recomendaciones = document.getElementById('recomendacionesList');

  // Establece una cookie de sesión básica
  document.cookie = "usuarioImpacto=visitante; max-age=604800"; // 7 días

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Obtener valores del formulario
    const datos = {
      kmAuto: parseInt(document.getElementById('uso_auto').value),
      carne: parseInt(document.getElementById('consumo_carne').value),
      recicla: document.getElementById('reciclaje').value,
      energia: parseInt(document.getElementById('energia').value),
      ropa: parseInt(document.getElementById('ropa').value),
      productosLocales: parseInt(document.getElementById('productos_locales').value),
      vuelos: parseInt(document.getElementById('vuelos').value),
      basura: parseInt(document.getElementById('basura').value),
      bolsas: parseInt(document.getElementById('bolsas').value),
      plantas: parseInt(document.getElementById('plantas').value),
    };

    // Guardar datos en localStorage
    localStorage.setItem('impactoUsuario', JSON.stringify(datos));

    // Calcular impacto
    let impacto = 0;
    impacto += datos.kmAuto * 0.1;
    impacto += datos.carne * 2;
    impacto += datos.energia * 0.05;
    impacto += datos.ropa;
    impacto += datos.productosLocales;
    impacto += datos.vuelos * 5;
    impacto += datos.basura * 1.5;
    impacto += datos.bolsas;
    impacto += datos.plantas;

    if (datos.recicla === 'si') impacto -= 5;
    if (datos.bolsas === 0) impacto -= 2;
    if (datos.plantas === 0) impacto -= 2;

    impacto = Math.max(0, Math.min(impacto, 100));

    progress.style.width = `${impacto}%`;
    progress.style.backgroundColor = impacto < 50 ? "#27ae60" : "#e74c3c";

    // Generar recomendaciones estándar
    recomendaciones.innerHTML = '';
    recomendaciones.innerHTML += generarConsejosIA(datos, impacto);
  });
});


// 🧠 Simulación de "IA" para consejos personalizados
function generarConsejosIA(data, impacto) {
  let consejos = "";

  if (data.carne >= 5) consejos += "<li>Considera reducir tu consumo de carne a 2 veces por semana o menos.</li>";
  if (data.ropa >= 4) consejos += "<li>La moda rápida genera muchos residuos. Compra solo lo necesario.</li>";
  if (data.productosLocales >= 4) consejos += "<li>Apoya la economía local consumiendo productos de tu zona.</li>";
  if (data.vuelos > 3) consejos += "<li>Reduce viajes aéreos si es posible y opta por tren o bus.</li>";
  if (data.basura >= 5) consejos += "<li>Adopta las 3R: reducir, reutilizar y reciclar.</li>";
  if (data.bolsas >= 3) consejos += "<li>Las bolsas reutilizables ayudan a disminuir los residuos plásticos.</li>";
  if (data.plantas >= 4) consejos += "<li>Plantar árboles o tener vegetación en casa mejora el aire.</li>";

  // Consejo general según el puntaje
  if (impacto < 30) {
    consejos += "<li>¡Excelente! Tu impacto es bajo, sigue con buenos hábitos.</li>";
  } else if (impacto < 60) {
    consejos += "<li>Vas bien, pero hay oportunidades para ser más sostenible.</li>";
  } else {
    consejos += "<li>Tu impacto es alto. Considera adoptar más prácticas ecológicas.</li>";
  }

  return consejos;
}

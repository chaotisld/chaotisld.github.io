function renderGridMode(grupos, container) {
    container.style.display = "block"; 
    let html = "";

    grupos.forEach(grupo => {
        // Verificamos si este grupo usa el nuevo estilo de enlaces en texto
        if (grupo.estilo === "enlaces") {
            html += `<h3 class="anexo-title">${grupo.tituloGrupo}</h3>`;
            html += `<div class="text-links-grid">`;
            grupo.archivos.forEach(archivo => {
                html += `
                <div class="text-link-item">
                    <a href="${archivo.linkDescarga}" download>${archivo.nombre}</a>
                </div>`;
            });
            html += `</div>`;
        } 
        // Si no, renderizamos las tarjetas normales con imagen
        else {
            html += `
                <div class="group-header-container">
                    <h3 class="grid-group-title">${grupo.tituloGrupo}</h3>
                </div>
                <div class="cards-grid">`;
            grupo.archivos.forEach(archivo => {
                const imagenSrc = archivo.img || "IMG/placeholder_map.jpg"; 
                html += `
                <div class="vertical-card">
                    <div class="card-image-box">
                        <img src="${imagenSrc}" alt="Mapa ${archivo.nombre}" loading="lazy">
                    </div>
                    <h3>${archivo.nombre}</h3>
                    <a href="${archivo.linkDescarga}" class="btn-grid-download" download>Descargar</a>
                </div>`;
            });
            html += `</div>`;
        }
    });
    
    container.innerHTML = html;
}